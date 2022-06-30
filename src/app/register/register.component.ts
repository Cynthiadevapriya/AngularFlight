import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:any;
  submitted=false;
  errorMessage='';
  constructor(private formBuilder:FormBuilder,private service:FlightService,private router:Router) { }

  ngOnInit() {
      this.registerForm=this.formBuilder.group({
      // title:['',Validators.required],
      userName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      Age:['',Validators.required],
      Gender:['',Validators.required]
      // confirmPassword:['',Validators.required],
      // acceptTerms:[false,Validators.requiredTrue]

  },
  // {
  //   validator:ConfirmPasswordValidator.MatchPassword
  // }
  );
  }
  get f(){return this.registerForm.controls;}
  
  onReset(){
    this.submitted=false;
    this.registerForm.reset();
  }
  Home()
  {
    this.router.navigate(['']);
  }
  onSubmit(data:any):void{
    this.service.Register(data).subscribe(data => {
       alert(data.message);
    },
    error=>console.log(error)
    );
  }
  Login()
  {
    this.router.navigate(['/login']);
  }
}
