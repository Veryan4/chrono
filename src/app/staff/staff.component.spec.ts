import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormControl, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from  '@angular/common/http/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { map, startWith } from 'rxjs/operators';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { StaffComponent } from './staff.component';
import { StaffModalComponent } from './staff-modal/staff-modal.component';
import { StaffService } from '../shared/services/staff.service';


describe('StaffComponent', () => {

  let fixture: ComponentFixture<StaffComponent>;
  let component: StaffComponent;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidenavComponent,
        StaffComponent,
        StaffModalComponent
      ],
      imports:[
        FormsModule,
        HttpClientTestingModule,
        NgbModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers:[
        FormControl,
        StaffService
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [StaffModalComponent] }})
    .compileComponents().then(() => {
      modalService = TestBed.get(NgbModal);
      spyOn(modalService, "open").and.returnValue(modalRef);
      spyOn(console,'log').and.callThrough();
      });;

    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(StaffModalComponent);
  }));

  it('should open modal', () => {
    component.openModal();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should update closeResult when modal dismissed', fakeAsync(() => {
    // Override the result returned from the modal so we can test what happens when the modal is dismissed
    modalRef.result = new Promise((resolve, reject) => reject('y'));
    component.openModal();
    tick();
    expect(component.closeResult).toBe('Dismissed with: y');
  }));

  it('should filter the staffList', fakeAsync(() => {
    component.staffObs = new FormControl('').valueChanges.pipe(
      startWith(''),
      map(text => component.search('ala'))
    );
    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      tick();
      component.staffObs.subscribe(staffList => {
        expect(staffList.length).toBe(1);
        expect(staffList[0].firstName).toBe('Alain');
      });
      fixture.detectChanges();
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(1); 
      const cell = fixture.nativeElement
        .querySelector('tbody td:nth-child(1)')
            expect(cell.textContent)
        .toBe('Alain Chrono');
    })
  }));

});