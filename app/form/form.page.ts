import { Component } from '@angular/core';
import {ReqProvider} from '../providers/reqProvider'
interface Recipe{
  title: String,
  ingredients: Object[],
  step: String[],
  price: number | null,
  tags: String[]
}
@Component({
  selector: 'app-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss']
})
export class FormPage {
  private recipe: Recipe = {
    title: null,
    ingredients: [{},{},{},{},{}],
    step: [null,null,null,null,null],
    price: null,
    tags: []
  }
  constructor(private ReqProvider:ReqProvider) {}
  onUpload(f){
    this.ReqProvider.post('post',this.recipe,{headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }},).subscribe(
      res=> {console.log(res);},
      err => console.log(err)
    )

  }

}
