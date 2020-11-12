import {
  Component,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { Data , TranslationService } from './services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit {

  subItem = this.data.cart$.subscribe(data => {
    if (this.user){
       this.data.getnumberOfItems({userId: this.user.userId})
    }
  })

  //subscribe for user
  sub = this.data.user$.subscribe((data) => {
    if (data && data['userId'] == '') {
      this.user = null;
      return;
    }
    this.user = data;
    if (data) {
      this.data.setCart('cart', { userId: data['userId'] });
    }
  });
  user;

  //subscribe that listen to changes happen on number of items on cart
  subCart = this.data.numberOfItem$.subscribe((data) => (this.cart = data));

  //number of items on cart
  cart;

  constructor(
    private router: Router,
    private data: Data,
    private cook: CookieService,
    private translate: TranslateService,
    private trans: TranslationService
  ) {
    this.useLang()



    //if it is set to 1 that means nothing changed in main page , there is no need to route the user. otherwise we will route them to same page and restore everything to defult
    cook.set('main', '1');

    //if it saved in cookies that means he have loged in so we will bring his information from database by the information we saved in cookies
    if (this.cook.check('info')) {
      this.data.getUser({
        token: this.cook.get('token'),
        key: this.cook.get('info'),
      });
    }
  }

  //one of the life cycle called after rendering the page
  ngAfterViewInit() {
    this.loadScript('assets/Public/jquery/jquery.min.js');
    this.loadScript('assets/Public/bootstrap/js/bootstrap.bundle.min.js');
    this.loadScript('assets/Public/jquery-easing/jquery.easing.min.js');
    this.loadScript('assets/Public/sb-admin-2.min.js');
    this.loadScript('assets/Public/chart.js/Chart.min.js');
    this.loadScript('assets/Public/demo/chart-area-demo.js');
    this.loadScript('assets/Public/demo/chart-pie-demo.js');
    this.loadScript('assets/Public/scriptt.js');
  }

  //load javascripts beacuse it is not supported due to render delay
  public loadScript(url: string) {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  //get the route
  public getRouter(): string {
    return this.router.url;
  }

  //logout the user
  logout() {
    this.data.getData('logout').subscribe();
    this.data.getUser({});
    this.cook.delete("info");
    this.cook.delete("token");
    this.data.setCart('cart', {});
  }

  //in cart route there is no search box instead we have search button
  searchButton() {
    this.router.navigateByUrl('/');
    setTimeout(() => {
      this.data.setWholeItem('search', { search: this._filter });
    }, 100);
  }

  //listner to search box

  private _filter: string;
  @Input() get filter() {
    return this._filter;
  }

  set filter(val: string) {
    this._filter = val;
    //Raise changed event
    if (this.getRouter() == '/') {
      this.data.setWholeItem('search', { search: val });
    }
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  //end of the listner

  menu: boolean = false;

  //change the menu class to change some attribute in "menu_toggled" class
  toggleMenu() {
    this.menu = !this.menu;
  }
  //return to main page if it have been changed
  homePage() {
    if (this.getRouter() != '/') {
      this.router.navigateByUrl('/');
    } else if (this.getRouter() == '/' && this.cook.get('main') == '0') {
      this.data.getWholeItem();
      this.cook.set('main', '1');
    }
  }

  //this function knows what lang to use
  useLang(){
    if (this.cook.get("lang") == ""){
      this.translate.use(this.translate.getBrowserLang());
      this.cook.set("lang" , this.translate.getBrowserLang())
    }else{
      this.translate.use(this.cook.get("lang"));
    }
  }

  //change Lang
  changeLang(){
    if (this.cook.get("lang") == "ar"){
      this.cook.set("lang" , "en")
      this.useLang()
    }else if (this.cook.get("lang") == "en"){
      this.cook.set("lang" , "ar")
      this.useLang()
    }
  }

  openAddModal(){
    $('#pills-add-tab').tab('show')
  }
}
