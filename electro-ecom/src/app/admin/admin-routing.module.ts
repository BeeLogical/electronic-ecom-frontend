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
import { ViewComponent } from './profile/view/view.component';
import { EditComponent } from './profile/edit/edit.component';
import { EditComponent as UserEditComponent } from './user/edit/edit.component';
import { ListComponent as RoleListComponent } from './role/list/list.component';
import { EditComponent as RoleEditComponent } from './role/edit/edit.component';
import { CreateComponent as RoleCreateComponent } from './role/create/create.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-edit/:id', component: ProductEditComponent },
  { path: 'sale-transaction-list', component: SalesTransactionListComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'region-edit/:id', component: RegionEditComponent },
  { path: 'region-list', component: RegionListComponent },
  { path: 'region-create', component: RegionCreateComponent },
  { path: 'view', component: ViewComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'role-create', component: RoleCreateComponent },
  { path: 'role-edit/:id', component: RoleEditComponent },
  { path: 'role-list', component: RoleListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
