import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppApiService } from '../../app-api.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CartService } from '../../cart.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
    private api: AppApiService,
    private router: Router
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
      Swal.fire({
        title: 'Error!',
        text: 'Your cart is empty.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with checkout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Checkout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
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
                formData.append(
                  `transactionDto[${index}].RegionId`,
                  item.regionId.toString()
                );
              });
              this.api.cartCheckout(formData).subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Checkout Successful!',
                    text: 'Your order has been placed.',
                    confirmButtonText: 'OK',
                  });
                  this.cartService.clearCart();
                  this.cartItems = [];
                  this.router.navigateByUrl('/user/home');
                },
                error: (err) => {
                  console.error('Error', err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Checkout Failed',
                    text: 'Something went wrong. Please try again later.',
                  });
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
