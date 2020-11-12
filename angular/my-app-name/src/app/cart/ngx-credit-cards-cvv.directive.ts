import { Directive, ElementRef, Output, EventEmitter, HostListener, Input } from '@angular/core';
import * as cardValidator from 'card-validator';
import { NgxCreditCardsService } from "./ngx-credit-cards.service";
import { ValidityOptions } from "./models";

@Directive({
  selector: '[ngxCardCvv]'
})
export class CreditCardCvvDirective {
  @Input() maxExpiryYear: Date | number | string
  @Output() cvvChange: EventEmitter<ValidityOptions> = new EventEmitter()
  maxLength: number = 3

  constructor(private cardService: NgxCreditCardsService, el: ElementRef) {
    el.nativeElement.classList.add('ngx-credit-card-cvv')
  }

  //  This runs on keyup of the element conatining the directive and outputs the card number validity
  @HostListener('keyup', ['$event']) cvvKeyUp(e: any) {
    let { value } = e.target
    // let validObj = cardValidator.cvv({ maxLength: this.maxLength, value })
    this.cardService.cvv = value
    // this.cvvChange.emit(validObj)
  }

  /**
   * Flips the card to the back
   * @param e Event
   */
  @HostListener('focus', ['$event']) cvvFocus(e: any) {
    console.log("CVV focused")
    this.cardService.cardOptions = [,true]
  }


}