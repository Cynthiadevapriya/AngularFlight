import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../Services/flight.service';
// import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  ticket:any
  downloadForm:any
  header = [['FlightNumber','Source', 'Destination', 'StartTime', 'EndTime','MealType','NoOfSeatsBooked','SeatNumbers']];

 tableData :any;

  constructor(private service:FlightService,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')==null)
      this.router.navigate(['']);
    this.downloadForm=this.formBuilder.group({
      PNRNumber:['',Validators.required],
  });
  }
  GetTicketDet(data:any){
    this.service.GetTicket(data.PNRNumber).subscribe((data:any)=>
    {
      this.ticket=data;
      console.log(data);
    });
  }
  onReset(){
    this.router.navigate(['/history']);
  }
  generatePdf(data1:any) {
    var pdf = new jsPDF();

    pdf.setFontSize(2);
    pdf.text('Angular PDF Table', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);

    this.tableData = [[data1.flightNumber,data1.from,data1.to,data1.startTime,data1.endTime,data1.meal,data1.noOfSeatsBooked,data1.seatNumbers]];
    (pdf as any).autoTable({
    head: this.header,
    body: this.tableData,
    theme: 'grid',
    didDrawCell: (data:any) => {
        console.log(data.column.index)
    }
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
}  

}
