import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightService } from '../Services/flight.service';
import { UpdateschedComponent } from '../updatesched/updatesched.component';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrls: ['./all-schedules.component.css']
})
export class AllSchedulesComponent implements OnInit {
  
  allSchedules:any = [];
  airlines:any=[]
  constructor(private service:FlightService,private router:Router,private modalservice:NgbModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.GetScheduleDetails()
  }
  GetAirlineDetails(){
    this.service.GetAirline().subscribe((data:any)=>
    {
      this.airlines=data;
      this.airlines=this.airlines.filter((x:any)=>{
        if(x.isEnable){
          return x;
        }
        });
    });
  }
  GetScheduleDetails(){

    this.service.GetSchedules().subscribe((data:any)=>
    {
      this.allSchedules=data;
      console.log(data);
    });
  }
  AddSch(){
    this.router.navigate(['/schedule'])
  }
  // UpdateSch(flightnumb:any){
  //   this.router.navigate(['/updatesched']);
  // }
  Open(item:any) {
    debugger
    const modalref=this.modalservice.open(UpdateschedComponent);
    modalref.componentInstance.data=item;
    modalref.componentInstance.update.subscribe((message:any)=>{
      this.dismiss(message);
    });
  }
  dismiss(message:any){
    if(message=='dismiss'){
      this.GetScheduleDetails();
      this.modalservice.dismissAll();
    }
  }
 }
