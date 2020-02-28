import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
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
    this.groupControl.setValue(this.groups[0]);
  }

  staffValidator(firstNameKey:string, lastNameKey:string, groupKey:string) : Object  {
    return (group: FormGroup): {[key: string]: any} => {
      let specialChar = /[ `!@#$%^&*()_+=\[\]{};:"\\|,.<>\/?~]/;
      let hasNumber = /\d/
      let firstName = group.controls[firstNameKey];
      let lastName = group.controls[lastNameKey];
      let staffGroup = group.controls[groupKey];
      if (specialChar.test(firstName.value) || hasNumber.test(firstName.value)) {
        return {
          invalidFirstName: "Name can not contain numbers or special characters"
        }
      }
      if (specialChar.test(lastName.value) || hasNumber.test(lastName.value)) {
        return {
          invalidLastName: "Name can not contain numbers or special characters"
        };
      }
      if (!this.groups.includes(staffGroup.value)) {
        return {
          groupNotFound: "A group must be selected"
        };
      }
    }
  }
  
  getNewStaff(): Staff {
    let staff: Staff = {
      id: 0,
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      group: this.groupControl.value
    };
    return staff;
  }

  onClose() : Staff | void {
    if(!this.staffForm.valid) {
      return null;
    }
    this.activeModal.close(this.getNewStaff());
  }

  getValidationErrors(key) : string | void {
    if(this.staffForm.errors && this.staffForm.errors.length > 0){
      console.log(this.staffForm.errors[key])
    return this.staffForm.errors[key];
    }
  }

}
