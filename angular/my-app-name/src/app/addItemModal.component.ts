import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Data } from './services/data.service';
import { Observable } from 'rxjs';
import { ForEach } from './services/forEach';
import { ItemComponent } from './item.component';
import { Router, NavigationEnd } from '@angular/router';
import { SelectItem , SelectItemGroup } from 'primeng/api';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-addItem',
  templateUrl: './addItemModal.component.html',
})
export class AddItemModalComponent {
  addForm;
  sub = this.data.category$.subscribe((data) => { 
    if (data){
      data.forEach(cat=> {
        this.category = []
        data.forEach(data => {
          if(data.collegeName == cat.collegeName){
            this.category.push({label:data.name , value:data.code})
          }
        })
        if(this.rootNames.indexOf(cat.collegeName) == -1){
          this.rootNames.push(cat.collegeName)
          this.root.push({label:cat.collegeName , items: this.category})
        }
      })
    }
     });
  root: SelectItemGroup[] = [];
  category:SelectItem[]
  rootNames = []
  constructor(private formBuilder: FormBuilder, private data: Data) {
    //SelectItem API with label-value pairs

    this.addForm = this.formBuilder.group({
      url: ['', Validators.required],
      author: ['', Validators.required],
      name: ['', Validators.required],
      courseName: ['', Validators.required],
      edition: ['', Validators.required],
      price: ['', Validators.required],
      type: ['', Validators.required],
      selected: ["", Validators.required],
      code: ["", Validators.required],
    });
  }

  onSubmit(req) {
    console.log(req)
    this.data.setWholeItem('add_to_items', {
      url: req.url,
      author: req.author,
      name: req.name,
      edition: req.edition,
      price: req.price,
      type: req.type,
      category: req.selected,
      numberCode: req.code,
      courseName:req.courseName
    });
  }
}
