import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddcouponComponent } from '../addcoupon/addcoupon.component';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  coupons:any=[]
  constructor(private service:FlightService,private router:Router,private modalservice:NgbModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.GetCoupon();
  }
  GetCoupon(){
      this.service.GetCoupons().subscribe((data:any)=>
      {
        this.coupons=data;
        console.log(data);
      });
  }
  Open() {
    debugger
    const modalref=this.modalservice.open(AddcouponComponent);
    modalref.componentInstance.update.subscribe((message:any)=>{
    });
  }
  Delete(coupon:any){
    this.service.DeleteCoupon(coupon.code).subscribe((data:any) =>{
      console.log(data)
      if(data.message){
        this.router.navigate(['/coupon']);
      }
      }
      ,(error:HttpErrorResponse)=>{
        console.log(error);
        alert("Please try again");       
      }
    );

  }

}
