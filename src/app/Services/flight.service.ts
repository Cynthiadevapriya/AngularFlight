import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  apiUrl="http://localhost:32765/";
  apiRegister="http://localhost:32765/auth-register";
  apiLogin="http://localhost:32765/auth-login";
  apiAllSchedules="http://localhost:32765/inventorydetails";
  apiAddSchedules="http://localhost:32765/addflights";
  apiUpdateSchedule="http://localhost:32765/updateschedule";
  apiAirlineRegister="http://localhost:32765/registerairline";
  apiGetAirlines="http://localhost:32765/airlines";
  // apiGetAirlines="https://gatewayforflight.azure-api.net/api/inventory/Airline/search";
  apiAirlineBlock="http://localhost:32765/blockairline?name=";
  apiAirlineUnBlock="http://localhost:32765/unblockairline?airlinename=";
  apiBookingHistory="http://localhost:32765/email?email=";  
  apiBookingTicket="http://localhost:32765/bookingDetails";
  apiTicketCancel="http://localhost:32765/cancel?pnr=";
  apiTicketByPnr="http://localhost:32765/pnr?pnr=";
  apiAddCoupon="http://localhost:32765/addcoupon";
  apiDeleteCoupon="http://localhost:32765/deletecoupon?code=";
  apiGetCoupons="http://localhost:32765/getallcoupons";

  apiInvUrl="http://localhost:9009/api/inventory/";
  apiAuthUrl="http://localhost:9007/api/auth/";
  apiBookingUrl="http://localhost:9008/api/booking/";
  apiBookingCouUrl="http://localhost:9008/api/coupon/";

  constructor(private httpClient:HttpClient, private router: Router) { }

  Login(data:any):Observable<any>{   
    const headers = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post(this.apiLogin,data,{headers:headers});
  }


  Register(data:any):Observable<any>{
     const headers = new HttpHeaders({'content-type': 'application/json'});
    return this.httpClient.post(this.apiRegister,data,{headers:headers});
  }



  public GetSchedules():Observable<any>
  {
    debugger
    var jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    });

    return this.httpClient.get(this.apiAllSchedules,{headers:headers});
  }


  AirlineRegister(data:any):Observable<any>{
    const header={
      headers:new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })};
    return this.httpClient.post(this.apiAirlineRegister,JSON.stringify(data),header);
  }
  

  public GetAirline():Observable<any>
  {
    // var jwtToken = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   'content-type': 'application/json',
    //   Authorization: `Bearer ${jwtToken}`
    // });
    // let endPoint=this.apiInvUrl+"Airline/search";
    // return this.httpClient.get(this.apiGetAirlines,{headers:headers});
    return this.httpClient.get(this.apiGetAirlines);
  }

  public GetCoupons():Observable<any>
  {
    var jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    });
    return this.httpClient.get(this.apiGetCoupons,{headers:headers});
  }

  public DeleteCoupon(code:any):Observable<any>
  {
    var jwtToken = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    });
    return this.httpClient.delete(this.apiDeleteCoupon+code,{headers:headers});
  }

  AddCoupon(data:any):Observable<any>{
    
    var jwtToken = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.httpClient.post(this.apiAddCoupon,JSON.stringify(data), {headers:headers});
  }

  public History(emailId:string):Observable<any>{
    debugger
    var jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    });
    let mail=localStorage.getItem('email');
    var getURL = this.apiBookingHistory+ mail;
    return this.httpClient.get(getURL,{headers:headers});
  }

  public GetTicket(pnr:any):Observable<any>{
    debugger
    var jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    });
    var getURL = this.apiTicketByPnr+ pnr;
    return this.httpClient.get(getURL,{headers:headers});
  }

  public GetFlights(source:string,destination:any):Observable<any>{
    debugger
    var jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    });
    var getURL = this.apiInvUrl +"flightsearch?source="+ source+"&destination="+destination;
    return this.httpClient.get(getURL,{headers:headers});
  }


  AddSchedule(data:any):Observable<any>{
    
    var jwtToken = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.httpClient.post(this.apiAddSchedules,JSON.stringify(data), {headers:headers});
  }

  UpdateSchedule(data:any):Observable<any>{
    
    var jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    });
    return this.httpClient.put(this.apiInvUrl+"updateschedule",JSON.stringify(data),{headers:headers});
  }

  BlockAirline(name:String):Observable<any>{
    
    const header={
      headers:new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    })};
    console.log(header+this.apiAirlineBlock + name);
    // return this.httpClient.put(this.apiAirlineBlock + name,header);
    return this.httpClient.put(this.apiInvUrl+"name?name="+name,header);
  }

  UnBlockAirline(name:String):Observable<any>{
    
    var jwtToken = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    });
    // return this.httpClient.put(this.apiAirlineUnBlock+name,{headers:headers});
    return this.httpClient.put(this.apiInvUrl+"airlinename?airlinename="+name,{headers:headers});
  }

  BookTicket(data:any):Observable<any>{
    var jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`
    });
    return this.httpClient.post(this.apiBookingTicket,data,{headers:headers});
  }

  //Cancel ticket
  cancelTicket(num:any):Observable<any>{
    var jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      //Authorization: `Bearer ${jwtToken}`
    });
    // return this.httpClient.delete(this.apiTicketCancel+num,{headers:headers});
    return this.httpClient.delete(this.apiBookingUrl+"cpnr?pnr="+num,{headers:headers});
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['/Login']);
  }

}
