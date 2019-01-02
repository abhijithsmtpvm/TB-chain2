import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { User } from '../home/home.component';
import { createHash } from 'crypto-browserify';

@Component({
  selector: 'app-signup',
  template: `
  <div class="signup">
  <div class="form" >  
  
 
  <tr>
  <td>
      <label for="lblUserName">User Name</label>
  </td>
  <td>
      <input [(ngModel)]="myUserName" name="myUserName" type="text" maxlength="60" style="width: 300px;" />
  </td>
</tr>
<tr>
  <td>
      <label for="lblPassword">Password</label>
  </td>
  <td>
      <input [(ngModel)]="myPassword" name="myPassword" type="password" maxlength="60" style="width: 300px;" />
  </td>
</tr>
   

    <button (click)="register($event)">Register</button>
    <div>
    <tr>
    <label id="lblName">
        {{errorMsg}}
    </label>
</tr>
</div>
   
   </div>
 </div>
 
  `,
  styles: [
    "../node_modules/angular2-busy/build/style/busy.css",
    "styles.css"
  ]
})
export class SignUpComponent implements OnInit {
  constructor(private router : Router ,private Data : SawtoothService) { 
    console.log("login",this.Data);
  }

  public otp:number =0;
  public defaultOTP: any;
  public inputOTP: any;
  public errorMsg: any;
  public myfield_control: any;
  public myUserName:string='';
  public myPassword:string='';
  public contactNo:number =0;
  ngOnInit() {
   
  }

  register(event) {
    if (this.myUserName.length ===0 || ! this.myUserName.trim() || this.myPassword.length === 0 || !this.myPassword.trim() ){
      this.errorMsg = "Error in User Name or Password "
      
    }else
    {
      var newUser = <User>{};
      newUser.UserName = this.myUserName;
      newUser.Password = this.Data.hash(this.myPassword);
      newUser.TimeStamp =  new Date().toTimeString();
      let passPharse = this.Data.hash(this.myUserName + this.myPassword);
      this.Data.genKeyPair(passPharse.slice(0,64));
      this.Data.addUser(this.myUserName,newUser);
      this.router.navigate(['login']);
    }
          
  }
  generateOTP(event)
  {
    this.defaultOTP = Math.floor(Math.random() * 100000); 
    this.errorMsg = ""
    this.otp =1;
   }
  
 }
    
 



