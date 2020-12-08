import { Component } from '@angular/core';
import {ReqProvider} from '../providers/reqProvider'
import {Router} from '@angular/router'
import {Storage} from '../providers/storage'
interface User{
  username: String,
  password: String
}
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  private user:User = {
    username:'',
    password:''
  }
  public error=[]
  constructor(private ReqProvider: ReqProvider ,private router:Router,private storage: Storage) {}
  onSubmit(f){
    this.ReqProvider.post('login',{
      username: this.user.username,
      password: this.user.password
    }).subscribe(
      res => {
        f.reset()
        this.error=[]
        this.storage.setItem('token',res['access_token'])
        this.storage.setItem('username',res['username'])
        this.router.navigateByUrl('/tabs/home')
      },
      err => {
        f.reset()
        this.error.push(err['error']['error'])
        console.log(err)
      }
    )
  }

}