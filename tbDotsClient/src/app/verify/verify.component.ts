import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { User } from '../home/home.component';
import { createHash } from 'crypto-browserify';
import { Doctor } from '../home/home.component';
@Component({
  selector: 'app-verify',
  template: `<div class="Enroll">
  <div class="form" >  
  
 
  <tr > <td>
  <label for="lblpatnam">Patient Name</label>
  </td> <td>
  <input [(ngModel)]="patnam" name="patnam" type="text" maxlength="60" style="width: 300px;" />
   </td>
   </tr>
   <tr> <td>
  <label for="lblmobnum">Mobile Number</label>
  </td> <td>
  <input [(ngModel)]="mobNum" name="mobNum" type="text" maxlength="6" style="width: 300px;" />
   </td>
   </tr>
     
        <tr>
        <td colspan="2"><label id="lblName">{{errorMsg}}</label></td>
        </tr>
        
    <br>
    <button (click)="doctor($event)">Add</button>
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
    
  


export class VerifyComponent implements OnInit {
  patnam
  mobNum
  errorMsg

  constructor(private router : Router ,private Data : SawtoothService) {
    console.log("login",this.Data);
   }

  ngOnInit() {
    
  }
  doctor(event) {
    
if (!this.patnam.trim() || this.patnam.length === 0   ) {
      this.errorMsg = "Please enter the details"

    }
    else
    {
      
     var newDoctor = <Doctor>{};
     newDoctor.PatientName =  this.patnam;
     newDoctor.PhoneNumber = this.mobNum.toString();
     // this.Data.veriVaccine(this.medid,newPatient)
      //this.router.navigate([""]);
      let passPharse = this.Data.hash(this.patnam + this.mobNum);
      this.Data.genKeyPair(passPharse.slice(0,64));
      this.Data.addPatient(this.mobNum,newDoctor,this.mobNum);
      this.router.navigate(['']);
      console.log(this.patnam)
      console.log(this.mobNum.toString())
    } 
}
}