import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffModalComponent } from './staff-modal.component';


describe('StaffModalComponent', () => {
  let component: StaffModalComponent;
  let fixture: ComponentFixture<StaffModalComponent>;

  let validForm:any = {
    firstName: 'Veryan',
    lastName: 'Chrono',
    group: 'admin',
  }

  let invalidForm = {
    firstName: '3hew2@#~',
    lastName: '!D4Fs79',
    group: 'steve',
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffModalComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        NgbActiveModal
      ],
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(StaffModalComponent);
        component = fixture.componentInstance;
      });
  }));

  function updateForm(staffFirstName, staffLastName, staffGroup) {
    component.staffForm.controls['firstName'].setValue(staffFirstName);
    component.staffForm.controls['lastName'].setValue(staffLastName);
    component.staffForm.controls['group'].setValue(staffGroup);
  }

  it('form value should update from form changes', fakeAsync(() => {
    updateForm(validForm.firstName, validForm.lastName, validForm.group);
    expect(component.staffForm.value).toEqual(validForm);
  }));
  it('isValid should be false when form is invalid', fakeAsync(() => {
    updateForm(invalidForm.firstName, invalidForm.lastName, invalidForm.group);
    expect(component.staffForm.valid).toBeFalsy();
  }));
  it('should return new Staff on form submit', fakeAsync(() => {
    updateForm(validForm.firstName, validForm.lastName, validForm.group);
    let result = component.getNewStaff();
    let validStaff = Object.assign({}, validForm);
    validStaff.id = 0;
    expect(result).toEqual(validStaff);
  }));
  it('should return null if form invalid', fakeAsync(() => {
    updateForm(invalidForm.firstName, invalidForm.lastName, invalidForm.group);
    let result = component.onClose();
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

