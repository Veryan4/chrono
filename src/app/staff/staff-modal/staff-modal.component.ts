import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Staff } from '../../types/staff.type';


@Component({
  selector: 'app-staff-modal',
  templateUrl: './staff-modal.component.html',
  styleUrls: ['./staff-modal.component.css']
})
export class StaffModalComponent implements OnInit {
  @Input() name;

  groups: string[] = ['doctor', 'nurse', 'admin']
  staffForm: FormGroup;
  firstNameControl: AbstractControl;
  lastNameControl: AbstractControl;
  groupControl: AbstractControl;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) {
    }

  ngOnInit() {
    this.createForm();
  }

  //Form builder will give you more validation control on the Input, less simple but better long term.
  createForm() {
    this.staffForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      group: ['', [Validators.required]],
  });
  this.firstNameControl = this.staffForm.controls['firstName'];
  this.lastNameControl = this.staffForm.controls['lastName'];
  this.groupControl = this.staffForm.controls['group'];
  }

  getNewStaff(): Staff | void{
    if(!this.staffForm.valid) {
      this.getFormValidationErrors();
      return null;
    }
    let staff:Staff = {
      id: 0,
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      group: this.groupControl.value
    };
    return staff;
  }

  // Left here for debugging purposes, should be remove for production
  getFormValidationErrors() {
    Object.keys(this.staffForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.staffForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

}
