import { Component} from '@angular/core';
import { Data } from './services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import * as mod from 'bootstrap';
import { SelectItem, SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './loginModal.component.html',
})
export class LoginModalComponent {
  failure:boolean = false
  message = "wrong ID or wrong password, try again please"
  keepUp:boolean = false
  checkoutForm;
  daysSelect:SelectItem[] = [{label:"Days", value: 1} , {label:"Weeks" , value:7} , {label:"Months" , value:30} , {label:"Years" , value:365}]
  visible: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private data: Data,
    private cook: CookieService
  ) {
    this.checkoutForm = this.formBuilder.group({
      id:["" , Validators.required],
      password: ['', Validators.required],
      keepMe: ["",Validators.required],
      days:[
        {
          value : 'days',
          disabled: true
        },
Validators.required
    ],
      daysSelect:[
        {
          value : 'daysSelect',
          disabled: true
        },
Validators.required
    ]
    });
  }

  //disable fields
  disable(){
    this.keepUp = !this.keepUp
    if (this.keepUp){
      this.checkoutForm.controls.days.status = "INVALID"
      this.checkoutForm.get("daysSelect").enable()
    }else{
      this.checkoutForm.controls.days.status = "DISABLED"
      this.checkoutForm.get("daysSelect").disable()
    }
  }


  //listener to submitting
  onSubmit(req) {
    if (!req.id || !req.password) {
      console.log(!req.id)
      let oldMessage = this.message;
      this.message = "Please fill"
      if (!req.id){
          this.message+= " ID field"
      }
      if (!req.password){
        this.message +=" Password field"
      }
      if (this.message.includes("ID") && this.message.includes("Password")){
        this.message.indexOf("required")
        let last = this.message.slice(this.message.indexOf("field") + 6);
        let first = this.message.slice(0,this.message.indexOf("field") + 6)
        this.message = first + "and " + last
      }
      this.failure=true;
        setTimeout(() => {
          this.failure =false
          this.message = oldMessage
        }, 7000);
      return;
    }
    this.data.postData('', req).subscribe((data: Array<Object>) => {
      if (data["statusText"] == "Unauthorized"){
        this.failure=true;
        setTimeout(() => {
          this.failure =false
        }, 7000);
        return
      }
      this.setItem(data , req.days*req.daysSelect);
      $('#exampleModalCenter').modal('hide');
    });
  }

  //listner to submitting , store information into cookiese
  setItem(data: Array<Object> , time : number) {
    this.cook.set('token', data['token'], time);
    this.cook.set('info', data['user'], time);
    this.data.getUser({ token: data['token'], key: data['user'] });
  }

  hide = true;
  get passwordInput() { return this.checkoutForm.get('password'); }  
}
