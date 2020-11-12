import { Component } from '@angular/core';
import { Data } from './services/data.service';
import * as mod from 'bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class ItemComponent {
  message ="هذه القطعة موجودة في السلة"
  failure:boolean = false
  subUser = this.data.user$.subscribe((data) => {
    if (data && data['userId'] != '') {
      this.user = data;
    } else if (this.user) {
      this.user = null;
      this.cartNames = [];
      return;
    }
  });
  subCart = this.data.cart$.subscribe((cart) => {
    if (this.user) {
      if (cart) {
        if (cart[0] && cart[0]["errors"]){
          this.failure = true
          setTimeout(() => {
            this.failure = false
          }, 7000);
          this.data.setCart('cart', { userId: this.user.userId });
          return
        }
        this.cartNames = [];
        try {
          cart.forEach((data) => this.cartNames.push(data.whole_item.name));
        } catch {
          this.user = null;
          this.cartNames = [];
        }
      }
    }
  });

  //subscribe to listen for changes that happen on wholeItem
  sub = this.data.wholeItem$.subscribe((data) => (this.wholeItem = data));

  //array to know if an item name is in cart to turn its button to blue
  cartNames;
  wholeItem;
  user;
  constructor(private data: Data , private cook :CookieService) {
    this.data.getWholeItem();
  }

  //add item to cart
  addToCart(url) {
    this.data.setCart('add_to_cart', {
      url: url,
      userId: this.user.userId,
    });
  }

  edit(url){
    let nowDate = new Date()
    let newDate = new Date(nowDate.getFullYear() , nowDate.getMonth() , nowDate.getDate() , nowDate.getHours() , nowDate.getMinutes() + 5)
    this.cook.set("edited" , url , newDate)
    if (!this.cook.get("edited")){
      this.message = "Sorry timeout"
      this.failure = true
      setTimeout(() => {
        this.failure = false
        this.message ="هذه القطعة موجودة في السلة"
      }, 7000);
      $('#addModal').modal('hide');
    }
    $('#pills-edit-tab').tab('show')
  }

  delete(url){
    let nowDate = new Date()
    let newDate = new Date(nowDate.getFullYear() , nowDate.getMonth() , nowDate.getDate() , nowDate.getHours() , nowDate.getMinutes() + 5)
    this.cook.set("delete" , url , newDate)
  }
}
