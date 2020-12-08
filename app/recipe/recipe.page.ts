import { Component } from '@angular/core';
import {ReqProvider} from '../providers/reqProvider'
import {Router} from '@angular/router'
import {Storage} from '../providers/storage'
interface Recipe{
  title: String,
  ingredients: Object[],
  step: String[],
  price: number | null,
  tags: String[] | null
}
@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  styleUrls: ['recipe.page.scss']
})
export class RecipePage {
  private recipe: Recipe = {
    title: null,
    ingredients: [{},{},{},{},{}],
    step: ['','','','',''],
    price: null,
    tags: []
  }

  constructor(private ReqProvider: ReqProvider ,private router:Router,private storage: Storage) {}
 ionViewDidEnter(){
   this.ReqProvider.fetchOne('fetchOne',this.router.url.split('/')[3]).subscribe(
     res => {
       console.log(res)
       const data = <Recipe>res['data']
        this.recipe = data
        console.log(this.recipe)
     },
     err => {
      console.log(err)
     }
   )
 }

}