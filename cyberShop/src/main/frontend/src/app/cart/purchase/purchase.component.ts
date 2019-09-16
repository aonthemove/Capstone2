import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../product';
import { CartService } from '../../cart.service';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  itemsInCart: Product[] = [];
  apiUrl = "";
  total;
  infoText = "No products have been purchased.. check your cart";


  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.getItemsInCart();
    this.calculateTotal();    
  }
  getItemsInCart() {
    this.itemsInCart = this.cartService.getItemsInCart();
  }
  calculateTotal() {
    if (this.itemsInCart.length > 0){
    this.total = this.itemsInCart.reduce((total, currVal) => total + (currVal.price * currVal.quantity+ 
      (currVal.duty   * (currVal.price * currVal.quantity)+
      + ( currVal.tax  * (currVal.price * currVal.quantity))
      ) ), 0)
  }
}
 
}
