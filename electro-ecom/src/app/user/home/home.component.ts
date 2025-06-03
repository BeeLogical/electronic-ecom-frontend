import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppApiService } from '../../app-api.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart.service';
interface ProductData {
  selectedQty: any;
  id: number;
  name: string;
  description: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  regionName: string;
  quantity: number;
  regionId: number;
}
interface RegionData {
  id: number;
  name: string;
}
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: ProductData[] = [];
  regions: RegionData[] = [];
  searchTerm: any;
  selectedRegionId: string | null = null;
  cartProducts: any[] = [];
  cartCount: number | undefined;
  constructor(
    private router: Router,
    private api: AppApiService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.api.getRegions().subscribe({
      next: (data: any) => {
        this.regions = data;

        if (this.regions && this.regions.length > 0) {
          this.selectedRegionId = this.regions[0].id.toString();
          this.api.getProductsByRegion(String(this.regions[0].id)).subscribe({
            next: (data: any) => {
              this.products = data.map((product: any) => ({
                ...product,
                selectedQty: 0,
              }));
              console.log('Products loaded:', this.products);
            },
            error: (err: any) => {
              console.error('Failed to load products:', err);
            },
          });
        }
      },
      error: (err: any) => {
        console.error('Failed to load regions:', err);
      },
    });
  }

  filterProducts() {
    if (this.searchTerm) {
      console.log('Filtering products by search term:', this.searchTerm);
      this.api
        .getProductsBySearchTerm(this.searchTerm, this.selectedRegionId)
        .subscribe({
          next: (data: any) => {
            this.products = data.map((product: any) => ({
              ...product,
              selectedQty: 0,
            }));
            console.log('Filtered products:', this.products);
          },
          error: (err: any) => {
            console.error('Failed to filter products:', err);
          },
        });
    } else if (this.selectedRegionId) {
      this.api.getProductsByRegion(this.selectedRegionId).subscribe({
        next: (data: any) => {
          this.products = data.map((product: any) => ({
            ...product,
            selectedQty: 0,
          }));
          console.log('Products reloaded:', this.products);
        },
        error: (err: any) => {
          console.error('Failed to reload products:', err);
        },
      });
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.updateCartCount();
  }

  updateCartCount() {
    this.cartCount = this.cartService.getCartCount();
  }
}
