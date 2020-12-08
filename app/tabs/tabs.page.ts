import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import {Storage} from '../providers/storage'
import {Router} from '@angular/router'
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public token: String | null
  constructor(private storage:Storage,private router:Router) {}
  ngOnInit(){
    this.token = localStorage.getItem('token')
    this.storage.watchStorage().subscribe((data: String) => {
      console.log(this.token)
      this.token=localStorage.getItem('token')
    })
  }
  handleLogOut(){
    this.storage.removeItem('token');
    this.token= null;
    this.router.navigateByUrl('/tabs/home')
  }
}
