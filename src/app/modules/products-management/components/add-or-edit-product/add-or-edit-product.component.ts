import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductsApisService } from 'src/app/core/services/apis/products-apis.service';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.scss']
})
export class AddOrEditProductComponent implements OnInit, OnDestroy {
  subscriptions:Subscription[] = []
  product : Product = new Product();
  constructor(
    private productsApisService:ProductsApisService,
    private router:Router,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.checkIdOnParams()
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs=>subs.unsubscribe())
  }
  getProductById(id:number){
    let subs = this.productsApisService.getProductById(id).subscribe(res=>{
      this.product = res
    })
    this.subscriptions.push(subs)
  }
  onSubmit(productForm:NgForm){
    if(productForm.invalid) {
      productForm.form.markAllAsTouched();
      return this.toastrService.error('Please complete all the * required fields')
    }
    this.save()
  }
  checkIdOnParams(){
    let subs = this.activatedRoute.paramMap.subscribe(res=>{
      let id = Number(res.get('id'))
      if(id) this.getProductById(id)
    })
    this.subscriptions.push(subs)
  }
  save(){
    let callType = this.product.id ? this.productsApisService.updateProduct(this.product) :  this.productsApisService.addProduct(this.product)
    let subs = callType.subscribe(res=>{
      this.toastrService.success('Saved Successfully')
      this.router.navigate(['/dashboard'])
    })
    this.subscriptions.push(subs)
  }
}
