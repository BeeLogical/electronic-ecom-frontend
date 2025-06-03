import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout-dialog',
  imports: [MatDialogModule],
  templateUrl: './checkout-dialog.component.html',
  styleUrl: './checkout-dialog.component.css',
})
export class CheckoutDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { total: string }) {}
}
