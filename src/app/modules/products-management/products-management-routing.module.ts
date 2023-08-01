import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrEditProductComponent } from './components/add-or-edit-product/add-or-edit-product.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';

const routes: Routes = [
  {
    path:'',
    component:ProductsTableComponent,
    title:'products'
  },
  {
    path:'add',
    component:AddOrEditProductComponent,
    title:'add product'
  },
  {
    path:'edit/:id',
    component:AddOrEditProductComponent,
    title:'edit product'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManagementRoutingModule { }
