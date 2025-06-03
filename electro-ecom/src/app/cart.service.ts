import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: any[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: any): void {
    this.getCartItems();
    const existing = this.cartItems.find((p) => p.id === product.id);
    if (existing) {
      existing.selectedQty += 1;
    } else {
      this.cartItems.push({
        ...product,
        selectedQty: product.selectedQty || 1,
      });
    }
    console.log('Cart items:', this.cartItems);
    this.updateCartCount();
  }

  removeFromCart(id: number): void {
    console.log('Removing item with id:', this.cartItems, id);
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.updateCartCount();
  }

  updateQuantity(productId: number, quantity: number): void {
    this.getCartItems().forEach((item) => {
      if (item.id === productId) {
        item.quantity = quantity;
      }
    });
    this.updateCartCount();
  }

  getCartCount(): number {
    return this.cartItems.length;
  }
  updateCartCount() {
    const count = this.getCartCount();
    this.cartCountSubject.next(count);
  }
}
