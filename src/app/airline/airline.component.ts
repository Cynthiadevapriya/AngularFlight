import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  airlines:any = [];
  constructor(private service:FlightService,private router:Router) { }
  ngOnInit(){
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.GetAirlineDetails();
  }
  GetAirlineDetails(){
    this.service.GetAirline().subscribe((data:any)=>
    {
      this.airlines=data;
      console.log(data);
    });
  }
  AddAirline(){
    this.router.navigate(['/airlineregister']);
  }
  Edit()
  {
    this.router.navigate(['/block']);
  }
  BlockAirline(name:any){
    this.router.navigate(['/block',name]);
  }
  // UnBlockAirline(name:any){
  //   this.router.navigate(['/block',name]);
  // }
    
}
