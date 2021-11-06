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
            
      let arrayOfInvoices= data
      for(let i=0; i<arrayOfInvoices.length;++i){
        arrayOfInvoices.sort((a,b)=>{
          if(a.invoiceId<b.invoiceId)
            return -1
          if(a.invoiceId<b.invoiceId)
            return 0
          return 1
        })
        console.log(arrayOfInvoices.indexOf(data[i].invoiceId))
        console.log(data[i].invoiceId) 
        
      }
      this.invoices = arrayOfInvoices
      console.log(arrayOfInvoices)
    }

  })
  invoices
  userId
  constructor(private data :Data){

  }

}

// sub = this.data.invoices$.subscribe(data => {
//   if (data){
//     console.log(data)
//     let arrayOfInvoices= []
//     for(let i=0; i<data.length;++i){
//       arrayOfInvoices.push(data[i])
//     }
//     this.invoices = arrayOfInvoices
//   }

// })
// invoices
// userId
// constructor(private data :Data){

// }