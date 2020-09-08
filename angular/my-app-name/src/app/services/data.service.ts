import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ItemComponent } from '../item.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class Data {
  constructor(private http: HttpClient) {}
  private resultList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  wholeItem: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  wholeItem$: Observable<any[]> = this.wholeItem.asObservable();
  category: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  category$: Observable<any[]> = this.category.asObservable();
  root: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  root$: Observable<any[]> = this.root.asObservable();
  cart: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  cart$: Observable<any[]> = this.cart.asObservable();
  numberOfItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  numberOfItem$: Observable<any[]> = this.numberOfItems.asObservable();
  user: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  user$: Observable<any[]> = this.user.asObservable();
  getData(url: string): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3/' + url).pipe();
  }
  postData(
    url: string,
    req: {
      //localhost:3/' + url, req, {
      token: string;
      key: string;
    }
  ): Observable<any[]> {
    return this.http
      .post<any[]>('http://localhost:3/' + url, req, {
        headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }
  public getWholeItem() {
    this.getData('item').subscribe((data) => this.wholeItem.next(data));
  }
  public setWholeItem(url: string, req: any) {
    this.postData(url, req).subscribe((data) => this.wholeItem.next(data));
  }
  public getCategory() {
    this.getData('category').subscribe(data => this.category.next(data));
  }
  public getRoot() {
    this.getData('root_category').subscribe(data => this.root.next(data));
  }
  public setCart(url , req) {
    this.postData(url, req).subscribe((data) => this.cart.next(data));
  }
  public getnumberOfItems(req) {
    this.postData('numberOfItems', req).subscribe((data) =>
      this.numberOfItems.next(data)
    );
  }
  public setNumberOfItems(url, req) {
    this.postData(url, req).subscribe();
  }
  public getUser(req) {
    return this.postData('user', req).subscribe((data) => this.user.next(data));
  }
  forEach(loop: Object[], target: Object[], attr: string[]) {
    loop.forEach(function (data) {
      let temp: any = {};
      for (let i = 0; i < attr.length; ++i) {
        temp[attr[i]] = data[attr[i]];
      }
      target.push(temp);
    });
    return target;
  }
}
