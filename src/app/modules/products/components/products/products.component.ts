import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { Subscription, timeout } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductsApisService } from 'src/app/core/services/apis/products-apis.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscriptions:Subscription[] = []
  limit:number = 20
  skip:number = 0 // unfortunately not used as the fakestoreapi doesn't support paging
  total!:number
  products!:Product[]
  categories!:string[]
  selectedCategory!:string
  constructor(
    private productsApisService:ProductsApisService
  ) {
  }
  ngOnInit(): void {
    this.getAllCategories()
    this.getAllProducts()
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs=>subs.unsubscribe())
  }
  getAllCategories() : void{
    let subs = this.productsApisService.getAllCategories().subscribe(res=>{
      this.categories = res
    })
    this.subscriptions.push(subs)
  }
  getAllProducts(): void{
    let subs = this.productsApisService.getAllProducts(
      this.limit,
      'asc'
    ).subscribe(res=>{
      this.products = res
    })
    this.subscriptions.push(subs)
  }

  getAllProductsByCategory($event:string) : void{
    this.selectedCategory = $event
    if(!this.selectedCategory) return this.getAllProducts()
    let subs = this.productsApisService.getProductsByCategory(
      this.limit,
      this.selectedCategory
    ).subscribe(res=>{
      this.products = res
    })
    this.subscriptions.push(subs)
  }


}
