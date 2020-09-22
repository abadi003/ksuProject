import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Data } from './services/data.service';
import { Observable, from } from 'rxjs';
import { ForEach } from './services/forEach';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit, OnDestroy {
  subUser = this.data.user$.subscribe((data) =>{
    
    if (data && data["userId"] != ""){
      this.data.setCart('cart', { userId: data["userId"] })
    this.user = data
    this.data.cart$.subscribe((cart) => {
      if (cart) {
        console.log(typeof(cart))
        this.data.getnumberOfItems({ userId: data["userId"] });
        this.cartNames = [];
        try{
          cart.forEach((data) => this.cartNames.push(data.whole_item.name));
        }
        catch{
          this.user= null
          this.cartNames = []
        }
      }
    });
    }else if (this.user){
        this.user= null
        this.cartNames = []
        return
    }
  });
  sub = this.data.wholeItem$.subscribe((data) => (this.wholeItem = data));
  cartNames;
  wholeItem;
  user;
  cartItem;
  mySubscription: any;
  constructor(
    private data: Data,
    private forEach: ForEach,
    private router: Router,
    private appComponent: AppComponent,
    private cook: CookieService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    this.data.getWholeItem();
  }

  isBought(itemName) {
    for (let i = 0; i < this.cartNames.length; ++i) {
      if (itemName == this.cartNames[i]) {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {}
  ngOnDestroy() {}
  refresh(url) {
    this.data.setCart('add_to_cart', {
      url: url,
      userId: this.user.userId,
    });
  }
}
