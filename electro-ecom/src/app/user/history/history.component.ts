import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../app-api.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-history',
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  constructor(private router: Router, private api: AppApiService) {}

  orders = [
    {
      id: 1,
      date: '2023-10-01',
      total: 99.99,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 129.99 },
        { name: 'Smart Watch', quantity: 1, price: 199.99 },
      ],
    },
    {
      id: 2,
      date: '2023-10-05',
      total: 49.99,
      items: [{ name: 'Bluetooth Speaker', quantity: 1, price: 49.99 }],
    },
  ];
}
