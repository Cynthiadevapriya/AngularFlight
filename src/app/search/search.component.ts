import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookTicketComponent } from '../book-ticket/book-ticket.component';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service:FlightService, public router:Router,private modalservice:NgbModal) { }

  ngOnInit(): void {
    
  }

  flights:any = [];
  airlines:any=[];
  searchForm = new FormGroup({
    Source: new FormControl('',Validators.required),
    Destination: new FormControl('',Validators.required),
    // RoundTrip: new FormControl(0,Validators.required)
  });
 
  Search(data:any){
    debugger
    this.service.GetFlights(data.Source,data.Destination).subscribe((data:any)=>
    {
      this.flights =data;
      if(this.flights==0){
        alert("No flights available for searched source and destination");
      }
      
      console.log(this.flights)
    },
    error=>console.log(error)
    );
  } 
  Open(item:any) {
    debugger
    const modalref=this.modalservice.open(BookTicketComponent);
    modalref.componentInstance.data=item;
    // modalref.componentInstance.update.subscribe((message:any)=>{
      //this.dismiss(message);
    //});
  }
  // dismiss(message:any){
  //   if(message=='dismiss'){
  //     this.Search();
  //     this.modalservice.dismissAll();
  //   }
  // }
}
