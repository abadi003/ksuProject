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
  sub = this.data.wholeItem$.subscribe(data=>this.wholeItem = data)
  subFromCart = this.data.cart$.subscribe(data=> {
    if (data){
      this.cartNames = []
    data.forEach((data) => this.cartNames.push(data.whole_item.name))
    }
  })
  subUser = this.data.user$.subscribe(data =>this.user = data)
  cartNames
  wholeItem
  user
  cartItem
  mySubscription: any;
  constructor(
    private data: Data,
    private forEach: ForEach,
    private router: Router,
    private appComponent: AppComponent,
    private cook: CookieService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
    this.data.getWholeItem()
    setTimeout(() => {
      if (this.user){
        this.data.setCart('cart', { userId: this.user.userId});
      }
    }, 100);
  }

  isBought(itemName){
      for(let i = 0 ; i < this.cartNames.length ; ++i){
      if(itemName == this.cartNames[i]){
        return true
      }
    }
    return false
  }
 
  ngOnInit() {}
  ngOnDestroy() {}
  refresh(url) {
    this.data.setNumberOfItems("add_to_cart" , {url:url,userId:this.appComponent.user.userId})
    setTimeout(() => {
      this.data.getnumberOfItems({userId:this.appComponent.user.userId})
      this.data.setCart('cart', { userId: this.appComponent.user.userId });
    }, 100);
  }
  
  changeFontSize(name:string) : boolean{
    if (name.length>25)
    return true
    return false
  }
}
