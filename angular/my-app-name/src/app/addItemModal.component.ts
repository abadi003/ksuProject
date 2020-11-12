import { Component} from '@angular/core';
import { Data } from './services/data.service';
import { SelectItem , SelectItemGroup } from 'primeng/api';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-addItem',
  templateUrl: './addItemModal.component.html',
})
export class AddItemModalComponent {
  message = "Thank you, The item have changed"
  success:boolean = false
  addForm;
  sub = this.data.root$.subscribe(dataRoot => {
    if (dataRoot){
      dataRoot.forEach(dataArrayRoot => {
        this.data.getCategory({name:dataArrayRoot.name})
      })
    }
  })

  subCategory = this.data.category$.subscribe(dataCategory => {
    if (dataCategory){
      let category:SelectItem[] = []
      dataCategory.forEach(dataArrayCategory => {
        category.push({label:dataArrayCategory.name , value:dataArrayCategory.name})
      })
      this.root.push({label:dataCategory[0].collegeName , items:category})
    }
  })

  root: SelectItemGroup[] = [];
  rootNames = []
  constructor(private formBuilder: FormBuilder, private data: Data , private cook : CookieService) {
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
    this.success = true
    setTimeout(() => {
      this.success = false
      $('addModal').modal('hide');
    }, 7000);
  }
  onEdit(req){
    if (!this.cook.get("edited")){
      this.success = true
      this.message = "Sorry timeout"
      setTimeout(() => {
        this.success = false
        this.message = "Thank you, The item have changed"
      }, 7000);
      $('#addModal').modal('hide');
      return
    }
    this.data.setWholeItem("edit_item" , {
      url:this.cook.get("edited"),
      courseName:req.courseName,
      edition:req.edition,
      price:req.price,
      type:req.type,
      category:req.selected,
      numberCode:req.code
    })
    this.success = true
    setTimeout(() => {
      this.success = false
      $('addModal').modal('hide');
    }, 7000);
  }
}
