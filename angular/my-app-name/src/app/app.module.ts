import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Data } from './services/data.service';
import { ForEach } from './services/forEach';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu.component';
import { ItemComponent } from './item.component';
import { AddItemModalComponent } from './addItemModal.component';
import { LoginModalComponent } from './loginModal.component';
import { AppRoutingModule } from './routing.app.module';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CookieService } from "ngx-cookie-service"
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipModule} from 'primeng/tooltip';
import { Topup } from './topup';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ItemComponent,
    LoginModalComponent,
    CartComponent,
    AddItemModalComponent,
    Topup
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
    TooltipModule
    
  ],
  providers: [Data, ForEach , ItemComponent , CookieService , NgbModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
