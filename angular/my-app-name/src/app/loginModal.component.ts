import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Data } from './services/data.service';
import { Observable, from } from 'rxjs';
import { ForEach } from './services/forEach';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import * as mod from 'bootstrap';
import { AppComponent } from './app.component';

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
    private foreach: ForEach,
    private cook: CookieService,
    private appComponent : AppComponent
  ) {
    this.checkoutForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(req) {
    if (!req.id || !req.password) {
      return;
    }
    this.data
      .postData('', req)
      .subscribe((data: Array<Object>) => this.setItem(data));
    $('#exampleModalCenter').modal('hide');
  }
  setItem(data: Array<Object>) {
    this.cook.set('token', data['token'], 1);
    this.cook.set('info', data['user'], 1);
    this.data.getUser({ token: data['token'], key: data['user'] });
    setTimeout(() => {
      this.data.getnumberOfItems({ userId: this.appComponent.user.userId});
      this.data.setCart("cart" ,{userId: this.appComponent.user.userId})
    }, 100);
  }
}
