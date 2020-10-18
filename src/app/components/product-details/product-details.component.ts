import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  private handleProductDetails() {
    // get id string and convert it to a number
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
    data => {
      this.product = data;
    });
  }

  addToCart(theProduct: Product) {
  const theCartItem = new CartItem(theProduct);
  this.cartService.addToCart(theCartItem);
  }
  removeFromCart(theProduct: Product) {
    const theCartItem = new CartItem(theProduct);
    this.cartService.removeFromCart(theCartItem);
  }
}
