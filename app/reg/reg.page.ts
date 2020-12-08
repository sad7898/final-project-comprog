import { Component } from '@angular/core';
import {ReqProvider} from '../providers/reqProvider'
import {Router} from '@angular/router'
interface User {
  username: String,
  password: String
}
@Component({
  selector: 'app-reg',
  templateUrl: 'reg.page.html',
  styleUrls: ['reg.page.scss']
})
export class Register {
  private user:User = {
    username:'',
    password:''
  }
  public error =[]
  constructor(private ReqProvider: ReqProvider,private router:Router) {}
  onSubmit(f){
    this.ReqProvider.post('signup',{
      username: this.user.username,
      password: this.user.password
    }).subscribe(
      res => {
        this.error=[]
        f.reset()
        this.router.navigateByUrl('/tabs/login')
      },
      err => {
        f.reset()
        this.error.push(err['error']['error'])
        console.log(err)
      }
    )
  }

}
