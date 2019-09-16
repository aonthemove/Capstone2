import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/product';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
@Input() product: Product;
buttonText = "Add To Cart";
qtyToPurchase = 1;

  constructor(private cartService: CartService) { }

  ngOnInit() { }

  onAddToCart(product: Product){
    if (this.qtyToPurchase > 0 ) {
      this.cartService.addToCart(product, this.qtyToPurchase);
      this.buttonText = "Added";
  
      setTimeout(() => {
        this.buttonText = "Add to Cart";
      }, 1500);
    }
  }
}
