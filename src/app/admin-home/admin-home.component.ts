import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private service:FlightService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
  }
  Logout(){
    this.service.Logout();
  }

}
