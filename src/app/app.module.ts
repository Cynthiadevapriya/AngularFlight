import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHomeComponent } from './user-home/user-home.component';
import { HomeComponent } from './home/home.component';
import { AirlineComponent } from './airline/airline.component';
import { FlightService } from './Services/flight.service';
import { HistoryComponent } from './history/history.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { SearchComponent } from './search/search.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';
import { AddairlineComponent } from './addairline/addairline.component';
import { BlockairlineComponent } from './blockairline/blockairline.component';
import { CancelticketComponent } from './cancelticket/cancelticket.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateschedComponent } from './updatesched/updatesched.component';
import { DownloadComponent } from './download/download.component';
import { CouponComponent } from './coupon/coupon.component';
import { AddcouponComponent } from './addcoupon/addcoupon.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    UserHomeComponent,
    HomeComponent,
    AirlineComponent,
    HistoryComponent,
    BookTicketComponent,
    SearchComponent,
    ScheduleComponent,
    AllSchedulesComponent,
    AddairlineComponent,
    BlockairlineComponent,
    CancelticketComponent,
    UpdateschedComponent,
    DownloadComponent,
    CouponComponent,
    AddcouponComponent,
   
    
  ],
  entryComponents:[
    CancelticketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
