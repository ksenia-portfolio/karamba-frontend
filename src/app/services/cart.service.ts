import {Injectable} from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() {
  }

  addToCart(theCartItem: CartItem){
    let alreadyExistsInCart = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0){

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem !== undefined);
    }
    if (alreadyExistsInCart){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  removeFromCart(theCartItem: CartItem){
    let alreadyExistsInCart = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0){

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem !== undefined);
    }
    if (alreadyExistsInCart && existingCartItem.quantity > 0){
      existingCartItem.quantity--;
    }else{
      this.totalRemove(existingCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (const currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

 totalRemove(theCartItem: CartItem){
   const itemIndex =  this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
   if (itemIndex > -1){
     this.cartItems.splice(itemIndex, 1);
   }
 }
}
