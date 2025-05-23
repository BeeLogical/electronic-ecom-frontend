import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent as ProductCreateComponent } from './product/create/create.component';
import { ListComponent as ProductListComponent } from './product/list/list.component';
import { EditComponent as ProductEditComponent } from './product/edit/edit.component';
import { CreateComponent as RegionCreateComponent } from './region/create/create.component';
import { ListComponent as RegionListComponent } from './region/list/list.component';
import { EditComponent as RegionEditComponent } from './region/edit/edit.component';
import { ListComponent as UserListComponent } from './user/list/list.component';
import { ListComponent as SalesTransactionListComponent } from './sales-transaction/list/list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-edit', component: ProductEditComponent },
  { path: 'sale-transaction-list', component: SalesTransactionListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'region-edit', component: RegionEditComponent },
  { path: 'region-list', component: RegionListComponent },
  { path: 'region-create', component: RegionCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
