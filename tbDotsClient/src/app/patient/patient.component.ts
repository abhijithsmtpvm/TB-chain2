import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { Router } from '@angular/router';
import { createHash } from 'crypto-browserify';
import {Buffer} from 'buffer/';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { Login } from '../home/home.component';
import { Patient } from '../home/home.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styles: []
})

export class PatientComponent implements OnInit {
  mobNum
  medid
  errorMsg

  constructor(private router : Router,private Data : SawtoothService ) {console.log("routed",this.router) }

  ngOnInit() {
  }

  intakeSubmit(event){
    {
      
      //check the OTP
  if (!this.mobNum.trim() || this.mobNum.length === 0 || !this.medid.trim() || this.medid.length === 0 ) {
        this.errorMsg = "Please enter the details"
  
      }
    else
      {
        
        var newPatient = <Patient>{};
        newPatient.patid =  this.mobNum;
        newPatient.medid = this.medid;
        newPatient.status = "Active";
        newPatient.TimeStamp = new Date().toString();
        this.Data.veriVaccine(this.medid,newPatient,this.mobNum);
        //this.Data.addressing2(this.mobNum,newPatient);
        //this.router.navigate([""]);
       // console.log(this.mobNum)
      }
       
    }
  
    
  }
}
