import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';

import { Profile } from '../home/home.component';

@Component({
  selector: 'app-enroll',
  template: `
  <div class="Enroll">
  <div class="form" >  
  
 
  <tr > <td>
  <label for="lblmedid">Medicine ID</label>
  </td> <td>
  <input [(ngModel)]="medid" name="medid" type="text" maxlength="60" style="width: 300px;" />
   </td>
   </tr>
   <tr> <td>
  <label for="lblName">Medicine name</label>
  </td> <td>
  <input [(ngModel)]="givenName" name="givenName" type="text" maxlength="60" style="width: 300px;" />
   </td>
   </tr>
     <tr> <td>
     <label for="lblbcombination">Combination</label>
     </td> <td>
     <input [(ngModel)]="combination" name="combination" type="text" maxlength="60" style="width: 300px;" />
      </td>
      </tr>
        <tr>
        <td colspan="2"><label id="lblName">{{errorMsg}}</label></td>
        </tr>
        
    <br>
    <button (click)="enroll($event)">Add</button>
    <div>
    
</div>
   
   </div>
 </div>
 
  `,
  styles: [
    "../node_modules/angular2-busy/build/style/busy.css",
    "styles.css"
  ]
})
export class EnrollComponent implements OnInit {
  constructor(private router : Router ,private Data : SawtoothService) { 
    console.log("login",this.Data);
  }
  public aadharNo:number = 0;
  public givenName:string = '';
  public medid:string = '';
  public phoneNo:number = 0;
  public combination:string = '';
  public state:string ='';
  public contactNumber:number =0 ;
  public defaultOTP:number = 0;
  public inputOTP:number =0;
  public errorMsg:string ='';
  public otp:number=0;
  public pin:number=0;
  public PinCode: number = 0;
  public sex:string="Male";
  ngOnInit() {
    
  } 
  onSelectionChange(entry)
  {
    this.sex = entry;
  
  }
  generateOTP(event)
  {
    this.defaultOTP = Math.floor(Math.random() * 100000); 
    this.errorMsg = ""
    this.otp =1;
   }

   enroll(event) {
    //check the OTP
if (!this.givenName.trim() || this.givenName.length === 0 || !this.medid.trim() || this.medid.length === 0 || !this.combination.trim() || this.combination.length === 0 ) {
      this.errorMsg = "Please enter the details"

    }
  else
    {
      
      var newProfile = <Profile>{};
      newProfile.medid = this.medid;
      newProfile.Name = this.givenName;
      newProfile.combination = this.combination;
      newProfile.CreatedBy = this.Data.retCurrentUser();
      newProfile.Status = "Active";
      newProfile.TimeStamp = new Date().toString();
      this.Data.addVaccine(this.medid,newProfile)
      this.router.navigate(['home']);
      console.log("Hwlwlwll")
    }
     
  }

   
 }
    
 



