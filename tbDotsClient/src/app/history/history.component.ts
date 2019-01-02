import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { User } from '../home/home.component';
import { createHash } from 'crypto-browserify';
import { history } from '../home/home.component';
@Component({
  selector: 'app-history',
  template: `<div class="Enroll">
  <div class="form" >  
  
 
 
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
    <button (click)="history($event)">Submit</button>
    <div>
    
</div>
   
   </div>
 </div>
 
  `,
  styles: ["../node_modules/angular2-busy/build/style/busy.css",
  "styles.css"]
})
export class HistoryComponent implements OnInit {
  mobNum
  errorMsg

  constructor(private router : Router ,private Data : SawtoothService) { 
    console.log("login",this.Data);
  }

  ngOnInit() {
  }
  history(event) {
    
    if (!this.mobNum.trim() || this.mobNum.length === 0  ) {
      this.errorMsg = "Please enter the details"

    }
  else
    {
      
      var newhistory = <history>{};
      newhistory.mobNum =  this.mobNum;
      this.Data.addressing2(this.mobNum,this.mobNum);
      //this.router.navigate([""]);
     // console.log(this.mobNum)
    }
    }
}
