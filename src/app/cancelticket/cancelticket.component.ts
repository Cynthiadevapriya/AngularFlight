import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cancelticket',
  templateUrl: './cancelticket.component.html',
  styleUrls: ['./cancelticket.component.css']
})
export class CancelticketComponent implements OnInit {
  @Input() pnr:any;
  @Output() cancel:EventEmitter<any>=new EventEmitter();
  constructor(private service:FlightService,private router:Router,public modal:NgbActiveModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
  }

  CancelForm = new FormGroup({
    pnr: new FormControl('',Validators.required),
  });
  cancelTicket(){
    this.cancel.emit(this.pnr);
  }
  }
