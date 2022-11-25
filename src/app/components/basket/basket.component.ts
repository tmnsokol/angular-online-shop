import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductsService) { }


  basket: IProduct[];
  basketSubscription: Subscription;



  ngOnInit(): void {
    this.basketSubscription = this.productService.getProductsFromBasket().subscribe(data=>{
        this.basket = data;
    });
  }

  ngOnDestroy(): void {
    if(this.basketSubscription)
      this.basketSubscription.unsubscribe();
  }

  plusProductToBasket(product: IProduct){
    product.quanity+=1;
    this.productService.updateProductBasket(product).subscribe();
  }

  minusProductFromBasket(product: IProduct){
    if(product.quanity > 0){
      product.quanity-=1;
    }

    this.productService.updateProductBasket(product).subscribe();
  }

  deleteProductFromBasket(id: number){
    this.productService.deleteProductFromBasket(id).subscribe(()=>{
      this.basket = this.basket.filter((item)=> item.id != id);
    });
  }
}
