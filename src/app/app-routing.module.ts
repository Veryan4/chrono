import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ScheduleComponent } from './schedule/schedule.component'
import { StaffComponent } from './staff/staff.component'

const routes: Routes = [
  {
    path: 'schedule',
    component: ScheduleComponent
  }, 
  {
    path: 'staff',
    component: StaffComponent
  }, 
  { 
    path: '**', 
    redirectTo: '/schedule', 
    pathMatch: 'full' 
  }
];

  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule {}
