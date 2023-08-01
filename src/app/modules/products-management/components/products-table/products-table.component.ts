import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductsApisService } from 'src/app/core/services/apis/products-apis.service';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],
})
export class ProductsTableComponent implements OnInit, OnDestroy{
  subscriptions:Subscription[] = []
  dataSource! : Product[];
  columnsToDisplay:string[]=['id','title','price','category','rating']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Product | null;
  constructor(
    private productsApisService:ProductsApisService,
    private router:Router,
    private toastrService:ToastrService
  ) {
  }
  ngOnInit(): void {
    this.getAllProducts()
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs=>subs.unsubscribe())
  }
  getAllProducts(){
    let subs = this.productsApisService.getAllProducts().subscribe(res=>{
      this.dataSource = res
    })
    this.subscriptions.push(subs)
  }
  deleteProduct($event:MouseEvent, id:number,index:number){
    $event?.stopPropagation();
    let subs = this.productsApisService.deleteProduct(id).subscribe(res=>{
      this.dataSource = this.dataSource.filter(res=>res.id != id )
      this.toastrService.success('Deleted Successfully')
    })
    this.subscriptions.push(subs)
  }
}
