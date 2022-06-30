import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private service:FlightService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
  }
  Logout(){
    this.service.Logout();
  }
}
