import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from 'src/app/Models/products';
import { ProductsService } from 'src/app/services/products.service';
import { DialogBoxComponent } from '../ui/dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productsService: ProductsService, public dialog: MatDialog) { }

  basket: IProduct[];
  basketSubscription: Subscription;

  products: IProduct[];
  productsSubscription: Subscription;
  canEdit: boolean = true;
  canView: boolean = false;

  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => this.products = data)
    this.basketSubscription = this.productsService.getProductsFromBasket().subscribe(data => {
      this.basket = data})
  }

  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }

    if(this.basketSubscription){
      this.basketSubscription.unsubscribe();
    }
  }

  addToBasket(product: IProduct){
    product.quanity = 1;
    if(this.basket.length > 0){
      let findProduct = this.basket.find(item => item.id === product.id);
      if(findProduct){
        this.updateToBasket(findProduct);
      }
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProduct){
    this.productsService.addProductToBasket(product).subscribe(data =>
      {
        this.basket.push(data);
      });
  }

  updateToBasket(product: IProduct){
    product.quanity+=1;
    this.productsService.updateProductBasket(product).subscribe(data =>
      {

      });
  }

  addOrUpdateProduct(product?: IProduct): void {
    let dlgConfig = new MatDialogConfig();
        dlgConfig.width = '700px';
        dlgConfig.disableClose = true;
        dlgConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dlgConfig);

    dialogRef.afterClosed().subscribe(
      (data)=>{
        if(data){
          if(data.id){
            this.updateProduct(data).subscribe((data) => {
                this.products = this.products.map(product => {
                  if(product.id === data.id){
                    return data;
                  }

                  return product;
                })
              });
          }

          this.addProduct(data).subscribe((data) => this.products.push(data));
        }
      }
    );
  }

  addProduct(product: IProduct) : Observable<IProduct> {
    return this.productsService.addProduct(product);
  }

  updateProduct(product: IProduct) : Observable<IProduct>{
    return this.productsService.updateProduct(product);
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(()=>{
      this.products = this.products.filter((item)=> item.id != id);
    });
  }
}
