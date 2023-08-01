import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsManagementRoutingModule } from './products-management-routing.module';
import { AddOrEditProductComponent } from './components/add-or-edit-product/add-or-edit-product.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingModule } from 'angular-star-rating';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AddOrEditProductComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    ProductsManagementRoutingModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    StarRatingModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule
  ]
})
export class ProductsManagementModule { }
