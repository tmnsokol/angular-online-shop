import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts() : Observable<IProduct[]>{
    return this.http.get<IProduct[]>(environment.endPointUrl + "/products")
  }

  getProduct(id: string) : Observable<IProduct>{
    return this.http.get<IProduct>(environment.endPointUrl + `/products/${id}`)
  }

  addProduct(product: IProduct){
    return this.http.post<IProduct>(environment.endPointUrl + "/products", product);
  }

  updateProduct(product: IProduct){
    return this.http.put<IProduct>(environment.endPointUrl + `/products/${product.id}`, product);
  }

  deleteProduct(id: number){
    return this.http.delete<IProduct>(environment.endPointUrl + `/products/${id}`);
  }


  deleteProductFromBasket(id: number){
    return this.http.delete<IProduct>(environment.endPointUrl + `/basket/${id}`);
  }

  addProductToBasket(product: IProduct){
    return this.http.post<IProduct>(environment.endPointUrl + "/basket", product);
  }

  getProductsFromBasket() : Observable<IProduct[]>{
    return this.http.get<IProduct[]>(environment.endPointUrl + "/basket")
  }

  updateProductBasket(product: IProduct){
    return this.http.put<IProduct>(environment.endPointUrl + `/basket/${product.id}`, product);
  }

}
