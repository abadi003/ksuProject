import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { TranslationKeyValues } from '../interfaces';
import { CookieService } from 'ngx-cookie-service';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';

@Injectable()
export class Data {
  // config = "http://165.22.74.255:3/"
  config = 'http://localhost:3/';
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
  invoices: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  invoices$: Observable<any[]> = this.invoices.asObservable();
  getData(url: string): Observable<any[]> {
    return this.http.get<any[]>(this.config + url).pipe();
  }
  postData(url: string, req): Observable<any[]> {
    return this.http
      .post<any[]>(this.config + url, req, {
        headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return [errMessage]
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return [error||'Node.js server error']
  }

  /**
   *
   */
  public getWholeItem() {
    this.getData('item').subscribe((data) => this.wholeItem.next(data));
  }
  public setWholeItem(url: string, req: any) {
    this.postData(url, req).subscribe((data) => this.wholeItem.next(data));
  }
  public getCategory(req) {
    this.postData('category', req).subscribe((data) =>
      this.category.next(data)
    );
  }
  public getRoot() {
    this.getData('root_category').subscribe((data) => this.root.next(data));
  }
  public setCart(url, req) {
    this.postData(url, req).subscribe((data) => this.cart.next(data));
  }
  public getnumberOfItems(req) {
    this.postData('numberOfItems', req).subscribe((data) =>
      this.numberOfItems.next(data)
    );
  }
  public getUser(req) {
    this.postData('user', req).subscribe((data) => this.user.next(data));
  }
  public getInvoices(req) {
    this.postData('get_invoices', req).subscribe((data) => this.invoices.next(data));
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
export class Languages {
  readonly current: string;
  readonly other: string[];
  private constructor(currentLanguage: string, supportedLanguages: string[]) {
    this.current = currentLanguage;
    this.other = supportedLanguages.filter(
      (supportedLanguage) => supportedLanguage !== currentLanguage
    );
  }
  static from(
    currentLanguage: string,
    supportedLanguages: string[]
  ): Languages {
    return new Languages(currentLanguage, supportedLanguages);
  }
}
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private httpClient: HttpClient) {}
  getTranslation(language: string): Observable<TranslationKeyValues> {
    return from(this.getLanguageTranslationsRequest(language));
  }
  private getLanguageTranslationsRequest(
    language: string
  ): Promise<TranslationKeyValues> {
    setTimeout(() => {
      console.log(language);
    }, 1000);
    return this.httpClient
      .get<TranslationKeyValues>(`assets/translation/${language}.json`)
      .toPromise();
  }
}
export class CustomTranslateLoader implements TranslateLoader {
  private constructor(private translationService: TranslationService) {}
  static of(translationService: TranslationService) {
    return new CustomTranslateLoader(translationService);
  }
  getTranslation(language: string): Observable<TranslationKeyValues> {
    return this.translationService.getTranslation(language);
  }
}
export function CustomTranslateLoaderFactory(
  translationService: TranslationService
) {
  return CustomTranslateLoader.of(translationService);
}
/*
Just call this.languageService.updateCurrentLanguage(language); to switch language
*/
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANGUAGE_COOKIE = 'website.locale';
  private languagesSubject: BehaviorSubject<Languages>;
  constructor(
    private translateService: TranslateService,
    private cookieService: CookieService
  ) {
    const currentLanguage =
      cookieService.get(this.LANGUAGE_COOKIE) ||
      this.translateService.getDefaultLang();
    this.languagesSubject = new BehaviorSubject<Languages>(
      this.getLanguages(currentLanguage)
    );
    this.translateService.use(currentLanguage);
  }
  getCurrentAndOtherLanguages$(): Observable<Languages> {
    return this.languagesSubject.asObservable();
  }
  updateCurrentLanguage(currentLanguage: string): void {
    this.cookieService.set(this.LANGUAGE_COOKIE, currentLanguage);
    this.translateService.use(currentLanguage);
    this.languagesSubject.next(this.getLanguages(currentLanguage));
  }
  private getLanguages(currentLanguage: string): Languages {
    setTimeout(() => {
      console.log('hi');
    }, 1000);
    return Languages.from(
      currentLanguage,
      Array(this.translateService.getBrowserLang())
    );
  }
}
