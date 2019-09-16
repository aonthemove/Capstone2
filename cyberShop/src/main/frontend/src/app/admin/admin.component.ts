import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  allProduct: Product[] = [];
  addProductForm = this.fb.group({
    name: [''],
    category: [''], 
    image: [''],
    shipping: [''],
    price: []
  });
  productIdBeingEdited: number;
  getSub: Subscription;
  deleteSub: Subscription;
  postSub: Subscription;
  putSub: Subscription;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getProduct();
  }
  ngOnDestroy() {
    if (this.getSub) {
      this.getSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }

    if (this.postSub) {
      this.postSub.unsubscribe();
    }

    if (this.putSub) {
      this.putSub.unsubscribe();
    }
  }
  getProduct() {
    this.getSub = this.productService.getProduct().subscribe(
      (res: any) => {
        this.allProduct = res;
      }
    );
  }
  onDeleteProducrItem(product: Product) {
    this.deleteSub = this.productService.deleteProductItem(product.id).subscribe(
      (res: any) => {
        this.getProduct();
      }
    )
  }
  onSubmitForm() {
    const name = this.addProductForm.value.name;
    const category = this.addProductForm.value.category;
    const price = this.addProductForm.value.price;
    const shipping = this.addProductForm.value.shipping;
    const image = this.addProductForm.value.image;
    const newProduct = new Product(name, category, price, shipping, image);

    // Adding new product
    if (this.productIdBeingEdited == undefined) {
      this.postSub = this.productService.addProductItem(newProduct).subscribe(
        (res: any) => {
          this.getProduct();
          this.addProductForm.reset();
        }
      )
    } else {
      newProduct.id = this.productIdBeingEdited;
      this.putSub = this.productService.updateProductItem(this.productIdBeingEdited, newProduct).subscribe(
        (res: any) => {
          this.onCancelEditProductItem();
          this.getProduct();
        }
      )
    }
  }
  onStartEditProductItem(product: Product) {
    this.productIdBeingEdited = product.id;
    this.addProductForm.patchValue(product);
  }

  onCancelEditProductItem() {
    this.productIdBeingEdited = undefined;
    this.addProductForm.reset();
  }
}

