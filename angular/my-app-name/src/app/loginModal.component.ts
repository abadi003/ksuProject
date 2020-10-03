import { Component } from '@angular/core';
import { Data } from './services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import * as mod from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './loginModal.component.html',
})
export class LoginModalComponent {
  checkoutForm;
  visible: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private data: Data,
    private cook: CookieService
  ) {
    this.checkoutForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //listener to submitting
  onSubmit(req) {
    if (!req.id || !req.password) {
      return;
    }
    this.data.postData('', req).subscribe((data: Array<Object>) => {
      this.setItem(data);
    });
    $('#exampleModalCenter').modal('hide');
  }

  //listner to submitting , store information into cookiese
  setItem(data: Array<Object>) {
    this.cook.set('token', data['token'], 1);
    this.cook.set('info', data['user'], 1);
    this.data.getUser({ token: data['token'], key: data['user'] });
  }
}
