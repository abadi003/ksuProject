import { Component } from '@angular/core';
import { Data } from './services/data.service';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.conformation.component.html',
})
export class DeleteConformationComponent {
  failure:boolean = false
  message = "Thank you, you have delete the item"
  constructor(private data: Data, private cook: CookieService) {}
  delete() {
    if (!this.cook.get("delete")){
      this.message = "Sorry timeout"
      this.failure = true
      setTimeout(() => {
        this.failure = false
        this.message = "Thank you, you have delete the item"
      }, 7000);
      return
    }
this.data.setWholeItem('delete_from_items', {
      url: this.cook.get('delete'),
    });
  }
}
