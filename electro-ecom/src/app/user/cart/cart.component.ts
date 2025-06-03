import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppApiService } from '../../app-api.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CartService } from '../../cart.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../../checkout-dialog/checkout-dialog.component';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, HeaderComponent, SidebarComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private api: AppApiService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartService.getCartItems();
  }
  updateQuantity(item: any) {
    this.cartService.updateQuantity(item.productId, item.selectedQty);
  }
  get cartTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.selectedQty,
      0
    );
  }
  checkout(total: string) {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      data: { total: total },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          this.api.getUsersByToken({ token: accessToken }).subscribe(
            (response: any) => {
              const user = response;
              const formData = new FormData();

              this.cartItems.forEach((item, index) => {
                formData.append(`transactionDto[${index}].Id`, '0'.toString());
                formData.append(
                  `transactionDto[${index}].ProductId`,
                  item.id.toString()
                );
                formData.append(
                  `transactionDto[${index}].Quantity`,
                  item.selectedQty.toString()
                );
                formData.append(
                  `transactionDto[${index}].TotalPrice`,
                  (item.price * item.selectedQty).toString()
                );
                formData.append(
                  `transactionDto[${index}].UserId`,
                  user.id.toString()
                );
                formData.append(
                  `transactionDto[${index}].SaleStatus`,
                  'completed'
                );
              });
              this.api.cartCheckout(formData).subscribe({
                next: () => {
                  alert('Checkout successful!');
                  this.cartService.getCartItems().length = 0;
                  this.cartItems = [];
                },
                error: (err) => {
                  console.error('Error', err);
                },
              });
            },
            (error) => {
              this.api.handle401Error(error);
            }
          );
        } else {
          this.api.handle401Error({
            status: 401,
            error: { message: 'Unauthorized' },
          });
        }
      }
    });
  }
}
