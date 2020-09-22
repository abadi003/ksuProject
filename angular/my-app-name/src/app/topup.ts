import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Data } from './services/data.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-topup',
    templateUrl: './topup.html',
  })
  export class Topup {
    success:boolean = false;
    failure:boolean = false 
    topup
    checkoutForm
    sub = this.data.user$.subscribe(data => {
      if (data){
        this.user = data;
      }
    })
    user
    constructor(
      private formBuilder: FormBuilder,
      private data: Data,
      private cook: CookieService,
    ) {
      this.checkoutForm = this.formBuilder.group({
        topup: ['', Validators.required],
      });
    }
    onSubmit(req){
      this.data.postData("topup" , {userId:this.user.userId , topup:req.topup}).subscribe(data => {
        if(data[0] == "success"){
          this.success = true
          this.topup = data[1]
        }
      })
    }
  }