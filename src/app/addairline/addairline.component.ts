import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-addairline',
  templateUrl: './addairline.component.html',
  styleUrls: ['./addairline.component.css']
})
export class AddairlineComponent implements OnInit {

  airlineForm = new FormGroup({
    Airlinename: new FormControl('',Validators.required),
    IsEnable: new FormControl(false),
  });

  constructor(private service:FlightService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
  }
  onReset(){
    this.airlineForm.reset();
  }
  AirlineRegister(data:any){
    this.service.AirlineRegister(data).subscribe((data:any) => 
      {
        console.log(data)  
        alert("Airline has been added successfully");
        this.airlineForm.reset();
      },(error:HttpErrorResponse)=>{
        alert("Please try again ");
        //this.service.Logout();
      }
    );
  }
  
}
