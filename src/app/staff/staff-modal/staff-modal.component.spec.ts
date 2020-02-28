import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { StaffModalComponent } from './staff-modal.component';
import { FormBuilder } from '@angular/forms';


describe('StaffModalComponent', () => {
  let component: StaffModalComponent;
  let fixture: ComponentFixture<StaffModalComponent>;

  let validStaff = {
    id: 0,
    firstName: 'Veryan',
    lastName: 'Chrono',
    group: 'admin',
  }
  
  let invalidStaff = {
    id: 0,
    firstName: '3hew2@#~',
    lastName: '-D4Fs79',
    group: 'steve',
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffModalComponent ],
      providers: [
        FormBuilder
      ],
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(StaffModalComponent);
        component = fixture.componentInstance;
      });
  }));

  // create reusable function for a dry spec.
  function updateForm(staffFirstName, staffLastName, staffGroup) {
    component.staffForm.controls['firstName'].setValue(staffFirstName);
    component.staffForm.controls['lastName'].setValue(staffLastName);
    component.staffForm.controls['group'].setValue(staffGroup);
  }


  it('form value should update from form changes', fakeAsync(() => {
    updateForm(validStaff.firstName, validStaff.lastName, validStaff.group);
    expect(component.staffForm.value).toEqual(validStaff);
  }));
  it('isValid should be false when form is invalid', fakeAsync(() => {
    updateForm(invalidStaff.firstName, invalidStaff.lastName, invalidStaff.group);
    expect(component.staffForm.valid).toBeFalsy();
  }));
  it('should return new Staff on submit', fakeAsync(() => {
    updateForm(validStaff.firstName, validStaff.lastName, validStaff.group);
    let result = component.getNewStaff();
    expect(result).toEqual(validStaff);
  }));
  it('should return null if Form invalid', fakeAsync(() => {
    updateForm(invalidStaff.firstName, invalidStaff.lastName, invalidStaff.group);
    let result = component.getNewStaff();
    expect(result).toEqual(null);
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

