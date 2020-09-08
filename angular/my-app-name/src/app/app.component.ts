import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { from, of } from 'rxjs';
import { Data } from './services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  sub = this.data.user$.subscribe((data) => (this.user = data));
  user;
  subCart = this.data.numberOfItem$.subscribe((data) => (this.cart = data));
  cart;

  mySubscription: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private data: Data,
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
        this.data.getnumberOfItems({ userId: this.user.userId });
      }, 100);
    }
  }

  ngOnInit() {}

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

  public loadScript(url: string) {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public getRouter(): string {
    return this.router.url;
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  logout() {
    this.data.getData('logout').subscribe();
    this.data.getUser({});
    this.cook.deleteAll();
  }
  searchButton(){
    this.router.navigateByUrl("/")
    setTimeout(() => {
      this.data.setWholeItem('search', { search: this._filter });
    }, 100);
  }
  private _filter: string;
  @Input() get filter() {
    return this._filter;
  }

  set filter(val: string) {
    this._filter = val;
    //Raise changed event
    if (this.getRouter() == "/"){
      this.data.setWholeItem('search', { search: val });
    }
  }

  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
}
