import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-updatesched',
  templateUrl: './updatesched.component.html',
  styleUrls: ['./updatesched.component.css']
})
export class UpdateschedComponent implements OnInit {
  @Input() data:any;
  scheduleForm = new FormGroup({
    Id: new FormControl('',Validators.required),
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
  airlines:any=[]
  @Output() update:EventEmitter<any>=new EventEmitter();
  constructor(private service:FlightService, public router:Router,private route:ActivatedRoute,public modal:NgbActiveModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.GetAirlineDetails();
    console.log(this.data);
    this.scheduleForm.patchValue({
      Id:this.data.id,
      FlightNumber:this.data.flightNumber,
      AirlineId:this.data.airlineId,
      From: this.data.from,
      To: this.data.to,
      StartTime: this.data.startTime,
      EndTime: this.data.endTime,
      Instrument:this.data.instrument,
      NoOfBusinessSeats: this.data.noOfBusinessSeats,
      NoOfNonBusinessSeats: this.data.noOfNonBusinessSeats,
      TicketCost: this.data.ticketCost,
      Meal: this.data.meal
    })
    console.log(this.scheduleForm.value);
    
  }
  
  UpdateSched(data:any){
    this.service.UpdateSchedule(data).subscribe((data:any) => {
      console.log(data);
      alert("schedule has been Updated successfully");
      this.update.emit('dismiss');
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
