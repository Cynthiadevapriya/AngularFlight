import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-addcoupon',
  templateUrl: './addcoupon.component.html',
  styleUrls: ['./addcoupon.component.css']
})
export class AddcouponComponent implements OnInit {
  couponForm = new FormGroup({
    Code: new FormControl('',Validators.required),
    Amount: new FormControl(false),
  });
  constructor(private service:FlightService,private router:Router,public modal:NgbActiveModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
  }
  AddCoupon(data:any){
    this.service.AddCoupon(data).subscribe((data:any) => 
      {
        console.log(data)  
        alert("Coupon has been added successfully");
        this.couponForm.reset();
      },(error:HttpErrorResponse)=>{
        alert("Please try again ");
        //this.service.Logout();
      }
    );
  }

}
