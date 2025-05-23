import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateComponent as ProductCreateComponent } from './product/create/create.component';
import { ListComponent as ProductListComponent } from './product/list/list.component';
import { EditComponent as ProductEditComponent } from './product/edit/edit.component';
import { CreateComponent as RegionCreateComponent } from './region/create/create.component';
import { ListComponent as RegionListComponent } from './region/list/list.component';
import { EditComponent as RegionEditComponent } from './region/edit/edit.component';
import { ListComponent as UserListComponent } from './user/list/list.component';
import { ListComponent as SalesTransactionListComponent } from './sales-transaction/list/list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductEditComponent,
    RegionCreateComponent,
    RegionListComponent,
    RegionEditComponent,
    UserListComponent,
    SalesTransactionListComponent,
  ],
})
export class AdminModule {}
