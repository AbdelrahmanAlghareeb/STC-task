import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable()
export class ProductsApisService {
  baseUrl =  "https://fakestoreapi.com";
  constructor(private http: HttpClient) { }

  addProduct(product:Product){
    return this.http.post<Product>(`${this.baseUrl}/products`, product)
  }
  updateProduct(product:Product){
    return this.http.put<Product>(`${this.baseUrl}/products/${product.id}`, product)
  }
  deleteProduct(id:number){
    return this.http.delete<Product>(`${this.baseUrl}/products/${id}`)
  }

  getAllProducts(limit:number=10, sort:'asc' | 'desc' = 'asc'){
    const params = new HttpParams()
    .set('limit', limit)
    return this.http.get<Product[]>(`${this.baseUrl}/products`,{params})
  }
  getProductById(id:number){
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
  }

  getProductsByCategory(limit:number=10, category:string){
    const params = new HttpParams()
    .set('limit', limit)
    return this.http.get<Product[]>(`${this.baseUrl}/products/category/${category}`,{params})
  }

  getAllCategories(){
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`)
  }

}


