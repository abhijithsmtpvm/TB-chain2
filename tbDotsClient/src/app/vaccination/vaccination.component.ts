import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { Vaccine } from '../home/home.component';

@Component({
  selector: 'app-vaccination',
  template: `
  <div class="vaccination">
  <div class="form" >  
  
 
  <tr> 
  <td>
  <label for="lblVaccinationName">Vaccination Name</label>
  </td> 
  <td>
  <input [(ngModel)]="vaccineName" name="vacName" type="text" maxlength="60" style="width: 300px;" />
   </td>
   </tr>
   <tr> <td>
  <label for="lblvaccinationAge">Vaccination Age</label>
  </td> <td>
  <input [(ngModel)]="vaccineAge" name="vacAge" type="number" maxlength="60" style="width: 300px;" />
   </td>
   </tr>
   <tr> <td>
  <label for="lblsex">Sex</label>
  </td> 
  <td>
  <input type="radio" name="gender" value="male" (click)="onSelectionChange('Male')" checked> Male
  <input type="radio" name="gender" value="female" (click)="onSelectionChange('Female')"> Female
  <input type="radio" name="gender" value="other" (click)="onSelectionChange('Both')"> Both
</td>
</tr>

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

  <br>
 <button (click)="vaccination($event)">Add</button>
   </div>
 </div>
 
  `,
  styles: [
    "../node_modules/angular2-busy/build/style/busy.css",
    "styles.css"
  ]
})
export class VaccinationComponent implements OnInit {
 constructor(private router : Router ,private Data : SawtoothService) { 
    console.log("login",this.Data);
  }


  
  public vaccineName:string = '';
  public vaccineAge:number = 0;
  public sex:string = '';
  public gender:string='Male';
  public otp:number = 0;
  public defaultOTP: any;
  public inputOTP: any;
  public vacName:Text;
  public vacAge :number;
  public errorMsg: any;

  ngOnInit() {
  
  } 
  vaccination(event){
    var vaccine = <Vaccine>{};
 
    if ( this.inputOTP !== this.defaultOTP || this.otp == 0)
    {
      this.errorMsg = "Invalid OTP, please try again"
    }
    else
      {
        console.log("Gender",this.gender);
        vaccine.Name = this.vaccineName;
        vaccine.Age = this.vaccineAge;
        vaccine.Sex = this.gender;
        vaccine.CreatedBy = this.Data.retCurrentUser();
        vaccine.TimeStamp = new Date().toString();
        this.Data.addVaccine(this.vaccineName,vaccine);
        this.router.navigate(['home']);
      }
   
    
   
    //this.Data.addVaccine(this.vaccineName,this.vaccineName+ "|" + this.vaccineAge + "|" + this.gender);
    //this.router.navigate(['login']);
  }
  onSelectionChange(entry)
  {
    this.gender = entry;
  
  }
  generateOTP(event)
{
  this.defaultOTP = Math.floor(Math.random() * 100000); 
  this.errorMsg = ""
  this.otp =1;
 }
   
 }
    
 



