import {
  Component,
  AfterViewInit,
  OnInit,
  AfterContentInit,
  AfterViewChecked,
  AfterContentChecked,
} from '@angular/core';
import { Data } from '../services/data.service';
import { Observable } from 'rxjs';
import { ForEach } from '../services/forEach';
import { Router, NavigationEnd } from '@angular/router';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements AfterViewInit, OnInit {
  sub = this.data.cart$.subscribe((data) => {
    this.cartItem = data;
    if (data){
      this.length = data.length
      this.totalPrice =0;
      for(let i = 0 ; i < data.length ; ++i){
        this.totalPrice+=data[i].whole_item.price
      }
    }
  });
  cartItem;
  mySubscription: any;
  length
  totalPrice = 0
  small = false;
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
    if (this.cook.check('info')) {
      this.data.getUser({
        token: this.cook.get('token'),
        key: this.cook.get('info'),
      });
      setTimeout(() => {
        this.data.getnumberOfItems({ userId: appComponent.user.userId });
        this.data.setCart('cart', { userId: appComponent.user.userId });
      }, 100);
    }
    
  }

  ngOnInit() {
    if (window.screen.width < 576){
      this.small = true;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadScript('assets/Public/cartScript.js');
    }, 60);
  }

  public loadScript(url: string) {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  public del(url) {
    this.data.setCart('delete_from_cart', { delete: url , userId:this.appComponent.user.userId});
    setTimeout(() => {
      this.data.getnumberOfItems({ userId: this.appComponent.user.userId });
    }, 100);
  }
}
