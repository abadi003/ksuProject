import { Component, OnInit } from '@angular/core';
import { Data } from '../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  item
  subUser = this.data.user$.subscribe((data) => {
    this.user = data;
  });

  //subscribe to cart
  sub = this.data.cart$.subscribe((data) => {
    this.cartItem = data;
    if (data) {
      this.length = data.length;
      if (data.length<2){
        this.item = "item"
      }else{
        this.item = "items"
      }
      this.totalPrice = 0;
      data.forEach(price => {
        this.totalPrice += price.whole_item.price
      });
    }
  });
  user;
  cartItem;

  //length of items in cart
  length;

  //total price for in the cart
  totalPrice:number

  //flag indicates whether screen width is smaller than 576px
  small = false;
  constructor(private data: Data) {}

  //check if screen width less than 576px
  ngOnInit() {
    if (window.screen.width < 576) {
      this.small = true;
    }
  }

  //delete an item from cart
  delete(url) {
    this.data.setCart('delete_from_cart', {
      delete: url,
      userId: this.user.userId,
    });
  }
}
