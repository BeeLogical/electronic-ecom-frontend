import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../app-api.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    NgChartsModule,
    MatCardModule,
    MatGridListModule,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productLabels: string[] = [];
  productData: number[] = [];
  regionLabels: string[] = [];
  regionData: number[] = [];
  regionProductLabels: string[] = [];
  regionProductData: number[] = [];
  userLabels: string[] = ['active', 'inactive'];
  userData: number[] = [];
  userChart: any;
  regionProductChart: any;
  regionChart: any;
  productChart: any;

  constructor(private api: AppApiService, private router: Router) {}
  ngOnInit() {
    this.api.getAllUsersStatusWise().subscribe({
      next: (res) => {
        const users = Array.isArray(res) ? res : [];
        const activeCount = users.filter(
          (user: any) => user.status === 'active'
        ).length;
        const inactiveCount = users.length - activeCount;
        this.userLabels = ['Active', 'Inactive'];
        this.userData = [activeCount, inactiveCount];

        this.userChart = {
          labels: this.userLabels,
          datasets: [
            {
              data: this.userData,
              label: 'Users',
              backgroundColor: ['#4CAF50', '#F44336'],
            },
          ],
        };
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.api.getAllGroupByProduct().subscribe({
      next: (res) => {
        const products = Array.isArray(res) ? res : [];
        this.productLabels = products.map((item: any) => item.productName);
        this.productData = products.map((item: any) => item.totalPrice);
        this.productChart = {
          labels: this.productLabels,
          datasets: [{ data: this.productData, label: 'Sales' }],
        };
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.api.getAllGroupByRegion().subscribe({
      next: (res) => {
        const regions = Array.isArray(res) ? res : [];
        this.regionLabels = regions.map((item: any) => item.regionName);
        this.regionData = regions.map((item: any) => item.totalPrice);
        this.regionChart = {
          labels: this.regionLabels,
          datasets: [{ data: this.regionData, label: 'Sales' }],
        };
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.api.getAllGroupByRegionProduct().subscribe({
      next: (res) => {
        const regionProducts = Array.isArray(res) ? res : [];
        this.regionProductLabels = regionProducts.map(
          (item: any) => item.regionName + ' - ' + item.productName
        );
        this.regionProductData = regionProducts.map(
          (item: any) => item.totalPrice
        );
        this.regionProductChart = {
          labels: this.regionProductLabels,
          datasets: [{ data: this.regionProductData, label: 'Sales' }],
        };
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
