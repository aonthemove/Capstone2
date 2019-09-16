import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsInCart: Product[] = [];
  apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  addToCart(product: Product, qty: number){
    let itemAlreadyInCart = false;
    this.itemsInCart = this.itemsInCart.map(i => {
      if (i.id == product.id) {
        i.quantity += qty;
        itemAlreadyInCart = true;
      }
      return i;
    });

    if (!itemAlreadyInCart){
      const newProduct = new Product(product.name, product.category, product.shipping, product.price, qty, product.quantity);
      newProduct.id = product.id;
      this.itemsInCart.push(newProduct);
    }
  }

  getItemsInCart(): Product[] {
    return this.itemsInCart;
  }
  
  removeItemFromCart(index: number){
    this.itemsInCart.splice(index, 1);
  }
  
  emptyCart() {
    this.itemsInCart = [];
  }
  getReceipt(){
    return this.itemsInCart;
  }

  purchase(productItems: Product[]): Observable<null> {
    const url = `${this.apiUrl}/purchase`;
    return this.http.post<null>(url, productItems);
  }
}
