import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
private products: Product[];

  constructor(private cartService: CartService,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

}
