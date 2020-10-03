import { Component} from '@angular/core';
import { Data } from './services/data.service';
import { Router} from '@angular/router';
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  sub = this.data.category$.subscribe((data) => this.category = data);
  rootSub = this.data.root$.subscribe((data) => (this.root = data));
  category;
  root;
  constructor(
    private data: Data,
    private router: Router,
    private cookie:CookieService
  ) {
    this.data.getRoot();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  //categorize the item if it is in main page , otherwise route the user before categorize the items
  categorize(name) {
    this.cookie.set("main" , "0")
    if (this.router.url != '/') {
      this.router.navigateByUrl('/');
      setTimeout(() => {
        this.data.setWholeItem('get_from_category', { category: name });
      }, 100);
    } else {
      this.data.setWholeItem('get_from_category', { category: name });
    }
  }

  //call  subcategory from database
  expand(name) {
    this.data.getCategory({ name: name });
  }
 
}
