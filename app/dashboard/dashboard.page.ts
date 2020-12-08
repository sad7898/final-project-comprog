import { Component,ViewChild,ElementRef } from '@angular/core';
import {ReqProvider} from '../providers/reqProvider'
import {Router} from '@angular/router'
import Chart from 'chart.js';
@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.page.html',
    styleUrls: ['dashboard.page.scss']
  })
  export class Dashboard{
    @ViewChild('chart', { static: true }) chart: ElementRef;
        private likedRecipe = []
        private chartData = [0,0,0,0]
        private color = ['#f9c0c0','#f6d6ad','#fafcc2','#ccf6c8']
      constructor(private ReqProvider:ReqProvider,private router: Router){}
      fetchData(){
          this.ReqProvider.userFetch().subscribe(
              res => {
                if (res['data']){
                res['data'].forEach((item) => {
                    this.likedRecipe.push(item)
                    
                })
                Object.keys(res['pieData']).forEach((key) =>{
                    switch(key){
                        case 'meat':
                            this.chartData[0]= res['pieData'][key]
                        case 'veggie':
                            this.chartData[1]= res['pieData'][key]
                        case 'rice':
                            this.chartData[2]= res['pieData'][key]
                        case 'fruits':
                            this.chartData[3]= res['pieData'][key]
                    }
                })
            }
            else this.likedRecipe.push({
                'title': 'You have not liked any'
            })
              },
              err => {
                console.log(err)
              }
          )
          
      }
      ionViewWillEnter(){
        this.fetchData()
      }
      ionViewDidEnter(){
          let dt = {
            datasets: [{
                data: this.chartData,
                backgroundColor: this.color
            }],
            labels: [
                'Meat',
                'Vegetables',
                'Carbohydrates',
                'Fruits'
            ]
        };
          
          let ctx = this.chart.nativeElement.getContext('2d')
          let pie = new Chart(ctx, {
              type: 'pie',
              data: dt
          })
      }
      navigate(id){
          this.router.navigate([`/tabs/recipe/${id}`])
      }
  }