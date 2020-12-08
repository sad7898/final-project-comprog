import { Component,ViewChild,OnInit } from '@angular/core';
import {ReqProvider} from '../providers/reqProvider'
import {IonInfiniteScroll} from '@ionic/angular'
import {Router,ActivatedRoute} from '@angular/router'
import {Search} from '../searchForm/search.page'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  @ViewChild('infiniteScroll') infiniteScroll: IonInfiniteScroll;
  private recipeArr: Object[] = []
  private pageNum =0;
  private query:any= {};
  constructor(private ReqProvider:ReqProvider,private router:Router,private route:ActivatedRoute,private search:Search) {}
  fetchAll(e=null){
    this.ReqProvider.fetch('fetch?',this.pageNum).subscribe(
      res => {
        console.log(res['data'])
        res['data'].forEach(element => {
          this.recipeArr.push({
            title: element.title,
            price: element.price,
            tags: element.tags,
            _id: element._id,
            likes: element.likes,
            color: 'primary'
          })
        });
        this.pageNum++;
        if (e) e.target.complete()
        
      },
      err => {
        console.log(err)
        if (e) e.target.complete()
        
      }
    )
  }
  fetchWithFilter(e,query){    
    let queryString=''
    if (query.tags){
    query.tags.forEach((tag,indx) => {
      if (indx!=query.tags.length-1) queryString +=`tag${indx}=`+tag+'&'
      else queryString +=`tag${indx}=`+tag+'&'
    })
  }
    queryString+= `title=${query.title}&price=${query.price}`
    console.log(queryString)
  this.ReqProvider.fetch(`fetch?${queryString}&`,this.pageNum).subscribe(
    res => {
      console.log(res['data'])
      res['data'].forEach(element => {
        this.recipeArr.push({
          title: element.title,
          price: element.price,
          tags: element.tags,
          _id: element._id,
          likes: element.likes,
          color: 'primary'
        })
      });
      this.pageNum++;
      if (e) e.target.complete()
      
    },
    err => {
      console.log(err)
      if (e) e.target.complete()
      
    }
  )
}
  loadData(e){
    if (Object.keys(this.query).length!=0){
      this.fetchWithFilter(e,this.query)
    }
    else{
      this.fetchAll(e)
    }
    console.log('load!')
  }
  ionViewWillEnter(){
    console.log('will enter')
    this.infiniteScroll.disabled = false
    this.route.queryParams.subscribe(
      params => {
      if (Object.keys(params)){
        Object.keys(params).forEach((q) => {
          if (params[q] && params[q].length!=0){
            this.query[q] = params[q]
          }
          else if (q=='tags'){
            this.query[q] = []
          }
        }
      
        )
      }
      else this.query={}

      }
    )
  }
  ionViewDidEnter(){
    console.log('did enter')
    if (this.query && Object.keys(this.query).length!=0){
      this.fetchWithFilter(null,this.query)
      console.log('perform fetch by query')
    }
    else{
      console.log('perform fetch all')
      this.fetchAll(null)
    }
}
  ionViewWillLeave(){
    this.removeParams(false)
  }
  removeParams(doFetch=true){
    this.pageNum=0
    this.recipeArr=[]
    this.query={}
    this.router.navigate([], {
      queryParams: {},
      queryParamsHandling: 'merge'
    })
    if (doFetch) this.fetchAll()
    }
  onSearch(){
    this.router.navigateByUrl('/tabs/filter');
  }
  loadOne(id){
    this.router.navigateByUrl(`/tabs/recipe/${id}`)
  }
  onLike(id,indx?){
    this.recipeArr[indx]['color'] = 'success'
    this.ReqProvider.updateOne('like',id).subscribe(
      res => {
        console.log(res)
      },
      err => {
        alert('Need to login to like')
        console.log(err)
      }
    )
  }
  filterbyButton(tag){
    this.recipeArr= []
    this.pageNum=0;
    this.query = {
      'tags': [tag]
    }
    this.fetchWithFilter(null,this.query)
  }
}



