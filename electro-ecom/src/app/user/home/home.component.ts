import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../app-api.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router, private api: AppApiService) {}
  products = [
    {
      id: 1,
      name: 'Wireless Mouse',
      price: 499,
      image: 'https://via.placeholder.com/250x150?text=Wireless+Mouse',
    },
    {
      id: 2,
      name: 'Bluetooth Headphones',
      price: 1299,
      image: 'https://via.placeholder.com/250x150?text=Headphones',
    },
    {
      id: 3,
      name: 'USB-C Charger',
      price: 699,
      image: 'https://via.placeholder.com/250x150?text=USB-C+Charger',
    },
  ];
  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
}
