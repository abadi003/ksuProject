import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
import { NgxCreditCardsService } from "./ngx-credit-cards.service";

@Directive({ selector: '[ngxCardName]' })
export class CreditCardNameDirective {
  @Output() nameChange: EventEmitter<string> = new EventEmitter()

  constructor(private cardService: NgxCreditCardsService) { }

  //  This runs on keyup of the element conatining the directive and outputs the card expiry validity
  @HostListener('keyup', ['$event']) keyUp(e: any) {
    let { value } = e.target
    this.cardService.name = value
    this.nameChange.emit(value)
  }

  /**
   * Flips the card back to the front
   * @param e Event
   */
  @HostListener('focus', ['$event']) cvvFocus(e: any) {
    this.cardService.cardOptions = [,false]
  }


}