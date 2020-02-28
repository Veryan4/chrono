import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff.component';
import { StaffModalComponent } from './staff-modal/staff-modal.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    StaffComponent, 
    StaffModalComponent
  ],
  entryComponents: [
    StaffModalComponent
  ]
})

export class StaffModule {
}

export { StaffModalComponent };