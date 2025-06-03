import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { ViewComponent } from './profile/view/view.component';
import { EditComponent } from './profile/edit/edit.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    HomeComponent,
    HistoryComponent,
    ViewComponent,
    EditComponent,
    CartComponent,
  ],
})
export class UserModule {}
