import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray} from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FlightService } from '../Services/flight.service';
@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  @Input() data:any;
  constructor(private service:FlightService,public modal:NgbActiveModal,private router:Router,private formBuilder:FormBuilder) { 
    this.passengerForm = this.formBuilder.group({  
     
      passengers: this.formBuilder.array([]) ,  
    });  
  }
  bookingForm:any;
  details:any={}
  form:any
  passe:string=''
  det:FormGroup=new FormGroup({})
  coupons:any=[]
  // det:any
  submitted=false;
  ngOnInit() {
    this.GetCoupon();
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.bookingForm=this.formBuilder.group({
    FlightNumber:['',Validators.required],
    From:['',Validators.required],
    To:['',[Validators.required,Validators.email]],
    StartTime:['',Validators.required],
    EndTime:['',Validators.required],
    Coupon:['',Validators.required],
    TicketCost:['',Validators.required],
    NoOfSeatsBooked:['',Validators.required],
    Meal:['',Validators.required]
});
debugger
console.log(this.data);
this.bookingForm.patchValue({
  FlightNumber:this.data.flightNumber,
  From:this.data.from,
  To: this.data.to,
  StartTime: this.data.startTime,
  EndTime: this.data.endTime,
  TicketCost:this.data.ticketCost
  })
console.log(this.bookingForm.value);
}
  onSubmit(form:any) { 
    debugger
    this.det=form
    console.log(this.passengerForm.get('passengers')?.value);
  // console.log(JSON.stringify(JSON.stringify(this.passengerForm.get('passengers')?.value)) );
  this.passe=JSON.stringify(JSON.stringify(this.passengerForm.get('passengers')?.value))
  let data= this.passengerForm.get('passengers')?.value;

}
  BookTicket(bookingForm:any){
    debugger
    console.log(bookingForm);
    this.details={
      FlightNumber:bookingForm.FlightNumber,
      From:bookingForm.From,
      To:bookingForm.To,
      StartTime:bookingForm.StartTime,
      EndTime:bookingForm.EndTime,
      // SeatNumbers:('{"Name":'+bookingForm.Name+',"Age":'+bookingForm.Age+',"Gender":'+bookingForm.Gender+'}').toString(),
      SeatNumbers:this.passe,
      NoOfSeatsBooked:bookingForm.NoOfSeatsBooked,
      Meal:bookingForm.Meal,
      UserName:localStorage.getItem('name'),
      Email:localStorage.getItem('email')
    }
    // data["userName"]=localStorage.getItem('name');
    // data["email"]=localStorage.getItem('email');
    console.log(this.details);
    this.service.BookTicket(this.details).subscribe((data:any) => {
      console.log(data)  
      console.log(data);
      alert(data.message);
    },(error:HttpErrorResponse)=>{
      alert("Please Login to continue");
    });        
  }
  valuechange(data:any){
    let num=this.bookingForm.controls['NoOfSeatsBooked'].value;
    let price=this.bookingForm.controls['TicketCost'].value;
    this.bookingForm.controls['TicketCost'].setValue(num*price);
    console.log(price);
    console.log(num*price);
  }
  Discount(data:any)
  {
    debugger
    let cost=this.bookingForm.controls['TicketCost'].value;
    let name=this.bookingForm.controls['Coupon'].value;
    let dis=this.coupons.find((x:any)=>x.code=name)?.amount as  any;
    this.bookingForm.controls['TicketCost'].setValue(cost-dis);
    console.log(dis);
    console.log(name);
  } 
  GetCoupon(){
    this.service.GetCoupons().subscribe((data:any)=>
    {
      this.coupons=data;
      console.log(data);
    });
    }
  passengerForm: FormGroup;  
    
    
  Passengers() : FormArray {  
    return this.passengerForm.get("passengers") as FormArray  
  }  
     
  newPassenger(): FormGroup {  
    return this.formBuilder.group({  
      Name: '',  
      Age: '',  
      Gender:''
    })  
  }  
     
  addPassenger() {  
    this.Passengers().push(this.newPassenger());  
  }  
     
  removePassenger(i:number) {  
    this.Passengers().removeAt(i);  
  }  
     
  
}
