import { Component, Injectable } from '@angular/core';
import {ReqProvider} from '../providers/reqProvider'
import {Router} from '@angular/router'
interface Query{
  title: String | null,
  tags: String[] | null,
  price: String | number
}
@Injectable()
@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class Search {
  private input: Query= {
    title: null,
    tags: [],
    price: null
  }
  public query: Query;
  constructor(private ReqProvider:ReqProvider,private router:Router) {}
  onSubmit(f){
    if (f) {
      this.query = {
        ...this.input
      }
      f.reset()
    this.router.navigate(['/tabs/home'],{queryParams: {
      title: this.query.title ?? '',
      tags: this.query.tags ?? [],
      price: this.query.price ?? ''
    }})
    // this.router.navigateByUrl(`/tabs/home?title=${this.query.title}&${tagsQuery}&price=${this.query.price}`)
  }

  }
}

