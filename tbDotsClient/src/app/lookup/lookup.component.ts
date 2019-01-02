import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lookup',
  template: `
  <div class="lookup">
  <div class="form" >  
  
 
  <tr>
  <td>
      <label for="lblmyaadharid">Aadhar ID</label>
  </td>
  <td>
      <input [(ngModel)]="myAadhar_Id" name="myAadhar_Id" type="number" maxlength="60" style="width: 300px;" />
  </td>
</tr>
<tr>


<tr>
<td>
    <label for="lblPinCode">PinCode</label>
</td>
<td>
    <input [(ngModel)]="PinCode" name="PinCode" type="number" maxlength="6" style="width: 300px;" />
</td>
</tr>

<tr>
  



   <td>
   <button (click)="generateOTP($event)">Generate OTP</button>
   </td>
   <td>
   <input [(ngModel)]="defaultOTP" name="defOTP" type="text" maxlength="60" style="width: 300px;" />
   </td>
   <tr>
   <td>
   <label for="lblOTP">OTP</label>
   </td>
   <td>
   <input [(ngModel)]="inputOTP" name="inOTP" type="number" maxlength="60" style="width: 300px;" />
   </td>
   </tr>
   
    <tr>
        <td colspan="2"><label id="lblName">{{errorMsg}}</label></td>
        </tr>

    <button (click)="login($event)">Search</button>
  </div>
 </div>
 
  `,
  styles: [
    "../node_modules/angular2-busy/build/style/busy.css",
    "styles.css"
  ]
})
export class LookupComponent implements OnInit {
  constructor(private router : Router ,private Data : SawtoothService) { 
    console.log("login",this.Data);
  }
  public otp:number = 0;
  public defaultOTP: any;
  public inputOTP: any;
  public myAadhar_Id:number =0;
  public PinCode:number=0;
  public errorMsg: any
private pdfContent = "This a test"
  ngOnInit() {
    console.log("haii******************");
  } 


  login(event) {
    debugger;
  if ( this.inputOTP !== this.defaultOTP || this.otp == 0)
  {
    this.errorMsg = "Invalid OTP, please try again"
  }
   else if (this.myAadhar_Id.toString().length !== 12 && this.PinCode.toString().length !== 6 )
    {
        this.errorMsg = "invalid Aadhar ID or Pincode"
    }
   
  else
    {
      if ( this.myAadhar_Id.toString().length > 0 )
     this.Data.retAadhar(this.myAadhar_Id);
    else if ( this.PinCode > 0)
    this.Data.retPincode(this.PinCode);
      this.router.navigate(['home']);
    }
  }




  generateOTP(event)
{
  this.defaultOTP = Math.floor(Math.random() * 100000); 
  this.errorMsg = ""
  this.otp =1;
 }

 }
    
 



