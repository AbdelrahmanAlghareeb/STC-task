import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product! : Product
  @Output() categorySelected : EventEmitter<string> = new EventEmitter()

  onCategoryClick(){
    this.categorySelected.emit(this.product.category)
  }
}
