import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Data } from './services/data.service';
import { Observable } from 'rxjs';
import { ForEach } from './services/forEach';
import { ItemComponent } from './item.component';
import { Router, NavigationEnd } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  sub = this.data.category$.subscribe(data=>this.category = data)
  rootSub = this.data.root$.subscribe(data=>this.root = data)
  category;
  root;
  mySubscription: any;

  constructor(
    private data: Data,
    private forEach: ForEach,
    private router: Router
  ) {
    this.data.getCategory();
    this.data.getRoot();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    // this.data
    //   .getData('category')
    //   .subscribe((data: Array<Object>) =>
    //     this.forEach.forEach(data, this.category, ['name'])
    //   );
  }
  categorize(name) {
    if (this.router.url != "/"){
       this.router.navigateByUrl("/")
    setTimeout(() => {
      this.data.setWholeItem('get_from_category', { category: name });
    }, 100);
    }else{
      this.data.setWholeItem('get_from_category', { category: name });
    }
  }

  replaceString(word : string , char : string , replacer : string){
   return word.split(char).join(replacer)
  }
}
