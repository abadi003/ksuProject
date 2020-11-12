import { Injectable } from '@angular/core';
import { ValidityOptions } from './models';
import { Subject } from 'rxjs';

@Injectable()
export class NgxCreditCardsService {
  private _cardNumber: string | number
  private _cvv: number
  private _expiry: string
  public goNext: boolean
  private _cardOptions: Subject<[ValidityOptions, boolean]> = new Subject()
  private _cardNumberSubject: Subject<string> = new Subject()
  private _cvvSubject: Subject<string> = new Subject()
  private _expirySubject: Subject<string> = new Subject()
  private _nameSubject: Subject<string> = new Subject()
  constructor() { }

  /**
   * @description Returns a subscribable subject that resolves the card number
   */
  get cardNumberSuject(): Subject<string> {
    return this._cardNumberSubject
  }

  /**
   * @description sets the value of the card number
   * @param value The card number
   */
  set cardNumber(value: string) {
    this._cardNumberSubject.next(value)
  }


  /**
   * @description Returns a subscribable subject that resolves the card expiry date
   */
  get expirySubject(): Subject<string> {
    return this._expirySubject
  }


  /**
   * @description sets the value of the card number
   * @param value The card value
   */
  set expiry(value: string) {
    this._expirySubject.next(value)
  }


  /**
   * @description Returns a subscribable subject that resolves the card cvv
   */
  get cvvSubject(): Subject<string> {
    return this._cvvSubject
  }


  /**
   * @description sets the value of the card number
   * @param value The card value
   */
  set cvv(value: string) {
    this._cvvSubject.next(value)
  }

  /**
   * @description Return the card validity object
   */
  get cardOptionsSubject(): Subject<[ValidityOptions, boolean]> {
    return this._cardOptions
  }

  /**
   * @description sets the value of the card validity object
   * @param value An array caontaining the card validit and a boolean: true for card to show front
   * and false to show back
   */
  set cardOptions(value: [any, boolean]) {
    this._cardOptions.next(value)
  }

  /**
   * @description Return the card holder's name
   */
  get nameSubject(): Subject<string> {
    return this._nameSubject
  }

  /**
 * @description sets the value of the card hlder's name
 * @param value The card value
 */
  set name(value: string) {
    this._nameSubject.next(value)
  }
}
