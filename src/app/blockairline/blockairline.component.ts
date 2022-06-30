import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-blockairline',
  templateUrl: './blockairline.component.html',
  styleUrls: ['./blockairline.component.css']
})
export class BlockairlineComponent implements OnInit {

  blockFlightForm = new FormGroup({
    AirlineName: new FormControl('',Validators.required),
  });

  constructor(private service:FlightService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.route.params.subscribe(params=>{
      this.blockFlightForm.controls["AirlineName"].setValue(params['name']);

    })
  }
  onCancel(){
    this.router.navigate(['/Airline']);
  }
  blockair(data:any){
    this.service.BlockAirline(data.AirlineName).subscribe(data => 
      { console.log(data);
            alert(data.message);
            this.router.navigate(['/Airline'])                
        },
        (error:HttpErrorResponse)=>{
          alert("Unable to block airline,Please try again");
          //this.service.Logout();
        }
    );
  }
  Unblockair(data:any){
    this.service.UnBlockAirline(data.AirlineName).subscribe(data => 
      { console.log(data);
            alert(data.message);
            this.router.navigate(['/Airline'])                
        },
        (error:HttpErrorResponse)=>{
          alert("Unable to unblock airline,Please try again");
          //this.service.Logout();
        }
    );
  }
}


