import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  allProduct: Product[] = [];
  searchTerm = "";
  getSub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProduct();
  }

  ngOnDestroy(){
    if(this.getSub){
      this.getSub.unsubscribe();
    }
  }

  getProduct(){
    this.getSub = this.productService.getProduct().subscribe(
      (res: any) => {
        this.allProduct = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}
