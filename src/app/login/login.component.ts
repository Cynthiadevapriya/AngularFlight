import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any;
  submitted=false;
  errorMessage='';
  
  constructor(private formBuilder:FormBuilder,private router: Router,private service:FlightService) { }

  ngOnInit() {
      this.loginForm=this.formBuilder.group({
      userName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
  });
 
  }
  get f(){return this.loginForm.controls;}
  Register()
  {
    this.router.navigate(['/Register']);
  }
  Home()
  {
    this.router.navigate(['']);
  }
  onReset(){
    this.submitted=false;
    this.loginForm.reset();
  }

  onSubmit(data:any):void{
    this.service.Login(data).subscribe(data=>{
      //alert('User Login Successfully');
      
      if(data){
      const IsAdmin=data?.user?.isAdmin;
      const Email=data.user.email;
      const Username=data.user.username;
      localStorage.setItem('email',Email);
      localStorage.setItem('isadmin',IsAdmin);
      localStorage.setItem('name',Username);
      localStorage.setItem('token',data.token);
      if(IsAdmin){
        this.router.navigate(['/AdminHome']);
      }
      else{
        this.router.navigate(['/UserHome']);
      }
    }
    },
    error=>console.log(error)
  )
  }


}
