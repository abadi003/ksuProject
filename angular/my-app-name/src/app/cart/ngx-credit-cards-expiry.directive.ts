import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import paymentFormatter from 'payment-formatter';
import * as cardValidator from 'card-validator';
import { NgxCreditCardsService } from "./ngx-credit-cards.service";
import { ValidityOptions } from './models';

@Directive({
  selector: '[ngxCardExpiry]'
})
export class CreditCardExpiryDirective {
  @Output() expiryChange: EventEmitter<ValidityOptions> = new EventEmitter()
  maxLength: number = 3
  
  constructor(private cardService: NgxCreditCardsService, el: ElementRef) {
    el.nativeElement.classList.add('ngx-credit-card-expiry')
    paymentFormatter({
      inputType: 'expiry',
      selector: '.ngx-credit-card-expiry'
    })
  }

  //  This runs on keyup of the element conatining the directive and outputs the card expiry validity
  @HostListener('keyup', ['$event']) keyUp(e: any) {
    let { value } = e.target
    let validObj = cardValidator.cvv({ maxLength: this.maxLength, value })
    this.cardService.expiry = value
    this.expiryChange.emit(validObj)
  }

  /**
   * Flips the card back to the front
   * @param e Event
   */
  @HostListener('focus', ['$event']) cvvFocus(e: any) {
    this.cardService.cardOptions = [,false]
  }

  
}