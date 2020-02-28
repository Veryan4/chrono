import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Staff } from '../../shared/types/staff.type';


@Component({
  selector: 'app-staff-modal',
  templateUrl: './staff-modal.component.html',
  styleUrls: ['./staff-modal.component.css']
})
export class StaffModalComponent implements OnInit {

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

  //Form builder will gives more validation control on the Input, less simple but safer long term.
  createForm() {
    this.staffForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      group: ['', [Validators.required]],
    },
    {
      validator: this.staffValidator('firstName', 'lastName','group')
    });
    this.firstNameControl = this.staffForm.controls['firstName'];
    this.lastNameControl = this.staffForm.controls['lastName'];
    this.groupControl = this.staffForm.controls['group'];
  }

  staffValidator(firstNameKey:string, lastNameKey:string, groupKey:string) {
    return (group: FormGroup): {[key: string]: any} => {
      let specialChar = /[ `!@#$%^&*()_+=\[\]{};:"\\|,.<>\/?~]/;
      let hasNumber = /\d/
      let firstName = group.controls[firstNameKey];
      let lastName = group.controls[lastNameKey];
      let staffGroup = group.controls[groupKey];
      if (specialChar.test(firstName.value) || hasNumber.test(firstName.value)) {
        return {
          invalidFirstName: true
        }
      }
      if (specialChar.test(lastName.value) || hasNumber.test(lastName.value)) {
        return {
          invalidLastName: true
        };
      }
      if (!this.groups.includes(staffGroup.value)) {
        return {
          groupNotFound: true
        };
      }
    }
  }

  getNewStaff(): Staff | void {
    if(!this.staffForm.valid) {
      this.getFormValidationErrors();
      return null;
    }
    let staff: Staff = {
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
