import { Component} from '@angular/core';
import { Data } from './services/data.service';
import { SelectItem , SelectItemGroup } from 'primeng/api';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoices.component.html',
})
export class InvoicesComponent {
  subUser = this.data.user$.subscribe(user => {
    if (user){
      this.userId =
      this.data.getInvoices({userId:user["userId"]})
    }
  })
  sub = this.data.invoices$.subscribe(data => {
    if (data){
      console.log(data)
      this.invoices = data
    }

  })
  invoices
  userId
  constructor(private data :Data){

  }

}
