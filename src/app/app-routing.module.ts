import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  DashbordComponent,
  ProductsComponent,
  ProductsCreateComponent,
  ProductsEditComponent,
  OrdersComponent,
  OrdersCreateEditComponent
} from './modulos'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashbord/product' },
  {
    path: 'dashbord', component: DashbordComponent,
    children: [
      { path: 'product', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'product', component: ProductsComponent },
      { path: 'product/create', component: ProductsCreateComponent },
      { path: 'product/edit/:id', component: ProductsEditComponent },
      { path: 'order', component: OrdersComponent },
      { path: 'order/create', component: OrdersCreateEditComponent },
      { path: 'order/edit/:id', component: OrdersCreateEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
