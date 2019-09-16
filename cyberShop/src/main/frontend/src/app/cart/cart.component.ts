import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
itemsInCart: Product[] = [];
total = 0;

infoText = "No products in cart";
apiUrl = "";

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.getItemsInCart();
    this.calculateTotal();
  }

  onRemoveItemFromCart(index: number) {
    this.cartService.removeItemFromCart(index);
    this.getItemsInCart();
    this.calculateTotal();
  }

  getItemsInCart() {
    this.itemsInCart = this.cartService.getItemsInCart();
  }

  onPurchase() {
    // Call cartService purchase 
    this.cartService.purchase(this.itemsInCart).subscribe(
      (res: any) => {
        this.router.navigate(['/purchase'])
      }
    );
  }

  calculateTotal() {
    if (this.itemsInCart.length > 0){
      this.total = this.itemsInCart.reduce((total, currVal) => total + (currVal.price * currVal.quantity+ 
        (currVal.duty   * (currVal.price * currVal.quantity)+
        + ( currVal.tax  * (currVal.price * currVal.quantity))
        ) ), 0)
    }
  }



  onDecreaseQty(item: Product) {
    if (item.quantity > 0) {
      item.quantity--;
      this.calculateTotal();
    }
  }

 onIncreaseQty(item: Product){
     item.quantity++;
     this.calculateTotal();
   }
 }

