import { Component, OnInit, Input, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { NgxCreditCardsService } from "../../ngx-credit-cards.service";
import { padEnd } from "../../utils";
import { images } from "../../card-images";

@Component({
  selector: 'ngx-credit-cards',
  styleUrls: ['ngx-credit-cards.component.css'],
  templateUrl: 'ngx-credit-cards.component.html'
})
export class NgxCreditCardsComponent implements OnInit , OnDestroy {
  public images: any
  public cvv: string = ''
  public name: string = ''
  public number: string = ''
  public expiry: string = ''
  public type: string = ''
  public length: number = 16
  public isAmex: boolean = false
  public creditCardClassObject: any = {}
  public imageClassObject: any = {}
  public flipped: boolean = false
  @Input() hideName: boolean = true
  @Input() namePlaceholder: string = 'FULL NAME'
  @Input() expiryBeforeText: string = '13/2018'
  @Input() expiryAfterText: string = 'No expiry'
  @Input() backDescriptionText: string = 'backDescriptionText'

  constructor(private ngxccService: NgxCreditCardsService, private renderer: Renderer2, private el: ElementRef) { }

  formatName() {
  }

  formatNumber() {
    // const { length: maxLength, type } = this.state
  }

  formatCVC() {
    this.cvv = padEnd(this.ngxccService.expiry, 3, '•')
  }

  addClass() {
    let name = 'ng-credit-card--' + this.type
    this.imageClassObject = { 'ng-credit-card__logo': true, [name]: true }
    this.creditCardClassObject = { 'ng-credit-card': true, [name]: true, 'ng-credit-card--flipped': this.flipped }
  }

  ngOnInit() {
    this.images = images
    this.hideName = this.hideName || false
    this.namePlaceholder = this.namePlaceholder || 'FULL NAME'
    this.expiryBeforeText = this.expiryBeforeText || 'month/year'
    this.expiryAfterText = this.expiryAfterText || 'valid thru'
    this.subscribeToValues()
    this.ngxccService.cardOptionsSubject.subscribe(([cardOptions, flipped]) => {
      this.flipped = flipped
      if (cardOptions && cardOptions.card) {
        this.type = cardOptions.card.type
      } else if (cardOptions&& cardOptions.card === null) {
        this.type = ''
      }
      this.addClass()
    })
  }

  subscribeToValues() {
    this.ngxccService.cardNumberSuject.subscribe(number => {
      this.number = number
    })
    this.ngxccService.expirySubject.subscribe(expiry => {
      this.expiry = expiry
    })
    this.ngxccService.cvvSubject.subscribe(cvv => {
      this.cvv = cvv
    })
    this.ngxccService.nameSubject.subscribe(name => {
      this.name = name
    })
  }

  ngOnDestroy() {
    this.ngxccService.cardOptionsSubject.unsubscribe()
    this.ngxccService.cardNumberSuject.unsubscribe()
    this.ngxccService.expirySubject.unsubscribe()
    this.ngxccService.cvvSubject.unsubscribe()
    this.ngxccService.nameSubject.unsubscribe()
  }
}
