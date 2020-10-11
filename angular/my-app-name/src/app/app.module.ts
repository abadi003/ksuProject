import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  Data,
  LanguageService,
  TranslationService,
} from './services/data.service';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu.component';
import { ItemComponent } from './item.component';
import { AddItemModalComponent } from './addItemModal.component';
import { LoginModalComponent } from './loginModal.component';
import { AppRoutingModule } from './routing.app.module';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { Topup } from './topup';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from'@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationModule } from './services/data.service.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ItemComponent,
    LoginModalComponent,
    CartComponent,
    AddItemModalComponent,
    Topup,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    DropdownModule,
    BrowserAnimationsModule,
    TooltipModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TranslationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    Data,
    CookieService,
    NgbModal,
    TranslationService,
    LanguageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
