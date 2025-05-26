import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../app-api.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router, private api: AppApiService) {}
  products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 129.99,
      description: 'Noise cancelling over-ear headphones.',
      imageUrl: '/assets/images/product1.jpg',
      stock: 12,
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      description: 'Fitness tracker with heart rate monitor.',
      imageUrl: '/assets/images/product2.jpg',
      stock: 8,
    },
  ];
  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
}
