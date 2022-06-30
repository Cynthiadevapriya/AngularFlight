import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelticketComponent } from '../cancelticket/cancelticket.component';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  ticketHistory:any = [];
  constructor(private service:FlightService,private router:Router,private modalservice:NgbModal) { }
  
  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.bookingHistory(localStorage.getItem('email'));

  }
  displayStyle = "none";
  bookingHistory(history:any){
    this.service.History(history).subscribe((data:any)=>
    {
      debugger
      this.ticketHistory =data;
      console.log(this.ticketHistory)
    },
    error=>console.log(error)
    );
  }  
  Open(pnr:any) {
    const modalref=this.modalservice.open(CancelticketComponent);
    modalref.componentInstance.pnr=pnr;
    modalref.componentInstance.cancel.subscribe((pnrNum:any)=>{this.cancelTicket(pnrNum)});
  }
  closePopup() {
    this.displayStyle = "none";
  }
  cancelTicket(data:any){
    this.service.cancelTicket(data).subscribe((data:any) =>{
      console.log(data)
      if(data.message){
        this.modalservice.dismissAll();
        this.bookingHistory(localStorage.getItem('email'));
        this.router.navigate(['/History']);
      }
      
      }
      ,(error:HttpErrorResponse)=>{
        console.log(error);
        alert("Please try again");       
      }
    );

  }
  
}
