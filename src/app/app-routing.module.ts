import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AirlineComponent } from './airline/airline.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { SearchComponent } from './search/search.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';
import { AddairlineComponent } from './addairline/addairline.component';
import { BlockairlineComponent } from './blockairline/blockairline.component';
import { CancelticketComponent } from './cancelticket/cancelticket.component';
import { UpdateschedComponent } from './updatesched/updatesched.component';
import { DownloadComponent } from './download/download.component';
import { CouponComponent } from './coupon/coupon.component';

const routes: Routes = [
    {
      path:'',
      component:HomeComponent
    },
    {
    path:'Login',
    component:LoginComponent
    },
    {
      path:'Register',
      component:RegisterComponent
    },
    {
      path:'AdminHome',
      component:AdminHomeComponent
    },
    {
      path:'UserHome',
      component:UserHomeComponent
    },
    {
      path:'Airline',
      component:AirlineComponent
    },
    {
      path:'History',
      component:HistoryComponent
    },
    {
      path:'book',
      component:BookTicketComponent
    },
    {
      path:'search',
      component:SearchComponent
    },
    {
      path:'schedule',
      component:ScheduleComponent
    },
    {
      path:'schedules',
      component:AllSchedulesComponent
    },
    {
      path:'airlineregister',
      component:AddairlineComponent
    },
    {
      path:'block/:name',
      component:BlockairlineComponent
    },
    {
      path:'cancel',
      component:CancelticketComponent
    },
    {
      path:'updatesched',
      component:UpdateschedComponent
    },
    {
      path:'ticktdetails',
      component:UpdateschedComponent
    },
    {
      path:'download',
      component:DownloadComponent
    },
    {
      path:'coupon',
      component:CouponComponent
    }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
