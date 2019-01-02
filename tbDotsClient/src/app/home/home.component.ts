import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SawtoothService } from '../sawtooth.service';

export interface User {
  UserName: string;
  Password: string;
  TimeStamp:string;
}

export interface Login {
  UserName: string;
  Password:  string;
}

export interface Profile {
  Name:string;
  medid:string;
  combination:string;
  CreatedBy:string;
  Status:string;
  TimeStamp:string;
}
export interface Pcon {
  medid:string;
  TimeStamp:string;
}

export interface Patient {
  patid:string;
  medid:string;
  status:string;
  TimeStamp:string;
}

export interface Vaccine {
  Name: string;
  Age: number;
  Sex: string;
  CreatedBy:string;
  TimeStamp:string;
}
export interface Doctor {
  PatientName: string;
  PhoneNumber: number;
  
}
export interface history {
  mobNum: number;
  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    "../node_modules/angular2-busy/build/style/busy.css",
    "styles.css"
  ]
})

export class HomeComponent implements OnInit {

  constructor(private router :Router,private Data : SawtoothService) {
    if ( Data.retCurrentUser() === '')
    { this.router.navigate(['login']);}
    let ws = new WebSocket('ws:localhost:8008/subscriptions')
    ws.onopen = () => {
      ws.send(JSON.stringify({
        'action': 'subscribe',
        'address_prefixes': ['225b42']
      }))
    }
    ws.onopen = function(evt) { console.log("0000000000000000000000000000000000000000000000000001") };
    ws.onclose = function(evt) { console.log("0000000000000000000000000000000000000000000000000002") };
    ws.onmessage = function(evt){ console.log("0000000000000000000000000000000000000000000000000003" + evt.data)
    let abc = JSON.parse(evt.data);
    console.log("00000000000000000000000000000000000000000000000000022222"+ abc["block_id"]);
  
  
  
  
  };
    ws.onerror = function(evt) {console.log("0000000000000000000000000000000000000000000000000004") };

    ws.onopen = () => {
      ws.send(JSON.stringify({
        'action': 'subscribe',
        'address_prefixes': ['+ this.hash(this.FAMILY_NAME).substr(0, 6) +']
      }))
    }
   }

  ngOnInit() {
  }

}
