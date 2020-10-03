import { Component, OnInit } from '@angular/core';
import { Data } from '../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  subUser = this.data.user$.subscribe((data) => {
    this.user = data;
  });

  //subscribe to cart
  sub = this.data.cart$.subscribe((data) => {
    this.cartItem = data;
    if (data) {
      this.data.getnumberOfItems({ userId: this.user.userId });
      this.length = data.length;
      this.totalPrice = 0;
      for (let i = 0; i < data.length; ++i) {
        this.totalPrice += data[i].whole_item.price;
      }
    }
  });
  user;
  cartItem;

  //length of items in cart
  length;

  //total price for in the cart
  totalPrice = 0;

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
