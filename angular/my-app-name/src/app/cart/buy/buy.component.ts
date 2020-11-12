import {
  ApplicationRef,
  Component,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Data } from '../../services/data.service';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
})
export class BuyComponent  {
  creditCardVar :boolean = true
  public title: string = 'app';
  result = ""
  user;
  cartPrice: number = 0;
  checkoutForm;
  message :string
  failure:boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private data: Data,
    private appRef: ApplicationRef
  ) {
    this.checkoutForm = this.formBuilder.group({
      method: ['', Validators.required],
    });
    this.data.user$.subscribe((data) => (this.user = data));
    this.data.cart$.subscribe((data) => {
      if (data) {
        data.forEach((prices) => {
          this.cartPrice += prices.whole_item.price;
        });
      }
    });
  }

  onSubmit(req) {
    if (req.method == 'balance') {
        this.data.postData('procced', { userId: this.user.userId , total:this.cartPrice}).subscribe(data => {
          if (data && data[0] == "sorry you dont have enough money"){
            this.message = data[0]
            this.failure = true
            setTimeout(() => {
              this.failure = false
            }, 7000);
          }
        });
    }
  }

  checkNumber(ref) {
    console.log(ref)
  }

  resetTitle() {
    console.log(this.title)
  }

  setTitle(title) {
    this.title = title
    this.result = title
    console.log("setting title to ", title)
    this.resetTitle()
  }

  paymentCancel() {
    this.setTitle(`Payment Cancelled`)
    console.log(this.title)
    this.appRef.tick()
  }

  creditCard(){
    console.log("credit")
    this.creditCardVar = true
  }
}

