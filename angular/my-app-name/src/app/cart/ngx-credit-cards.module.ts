import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditCardCvvDirective } from './ngx-credit-cards-cvv.directive';
import { CreditCardExpiryDirective } from './ngx-credit-cards-expiry.directive';
import { CreditCardNoDirective } from './ngx-credit-cards-no.directive';
import { CreditCardNameDirective } from './ngx-credit-cards-name.directive';
import { BuyComponent } from './buy/buy.component';
import { NgxCreditCardsService } from './ngx-credit-cards.service';
import { CommonModule } from "@angular/common";
import { NgxCreditCardsComponent } from "./buy/creditCard/ngx-credit-cards.component";
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [CommonModule ,FormsModule, ReactiveFormsModule , TranslateHttpLoader , TranslateModule],
  exports: [
    CreditCardCvvDirective,
    CreditCardExpiryDirective,
    CreditCardNoDirective,
    CreditCardNameDirective,
    BuyComponent,
    NgxCreditCardsComponent
  ],
  declarations: [
    CreditCardCvvDirective,
    CreditCardExpiryDirective,
    CreditCardNoDirective,
    CreditCardNameDirective,
    BuyComponent,
    NgxCreditCardsComponent
  ],
  providers: [NgxCreditCardsService],
})
export class NgxCreditCardsModule {}
