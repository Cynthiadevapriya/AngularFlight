import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  airlines:any=[]
  constructor(private service:FlightService, public router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.GetAirlineDetails();
  }

  scheduleForm = new FormGroup({
    FlightNumber: new FormControl('',Validators.required),
    AirlineId:new FormControl('',Validators.required),
    From: new FormControl('',Validators.required),
    To: new FormControl('',Validators.required),
    StartTime: new FormControl('',Validators.required),
    EndTime: new FormControl('',Validators.required),
    Instrument:new FormControl('',Validators.required),
    NoOfBusinessSeats: new FormControl(0,Validators.required),
    NoOfNonBusinessSeats: new FormControl(0,Validators.required),
    TicketCost: new FormControl(0,Validators.required),
    Meal: new FormControl(0,Validators.required)
  });

  // Schedule(){
    
  // }
  Schedule(data:any){
    this.service.AddSchedule(data).subscribe((data:any) => {
      console.log(data);
      alert("schedule has been added successfully");
      this.scheduleForm.reset();
    },(error:HttpErrorResponse)=>{
      console.log(error);
    }
    );
    
  }
  GetAirlineDetails(){
    this.service.GetAirline().subscribe((data:any)=>
    {
      this.airlines=data;
      this.airlines=this.airlines.filter((x:any)=>{
        debugger
        if(x.isEnable){
          return x;
        }
        });

      console.log(this.airlines);
    });
  }

}
