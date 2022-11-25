import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { IProduct } from 'src/app/Models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: IProduct;
  productDescriptions: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    // this.productDescriptions = this.productsService.getProducts().pipe(
    //   switchMap(res=>{
    //     let firstId = res[0].id;
    //     return this.productsService.getProduct(String(firstId));
    //   })
    // )
    // .subscribe(data=>{
    //   this.product = data
    // });

    this.productDescriptions = this.activatedRoute.data.subscribe(data => {
      this.product = data['product']
    })
  }

  ngOnDestroy() {
    if(this.productDescriptions)
      this.productDescriptions.unsubscribe();
  }
}
