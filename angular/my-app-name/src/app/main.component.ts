import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute} from "@angular/router"
import { from } from 'rxjs';



@Component({
  selector: 'app-main',
  template: "<router-outlet></router-outlet>" ,
})
export class MainComponent{
  user = JSON.parse(localStorage.getItem("user"));
  cart = JSON.parse(localStorage.getItem("cart count"));
  mySubscription: any;

 constructor(private router: Router, private activatedRoute: ActivatedRoute){
   
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    }); 
 }
}