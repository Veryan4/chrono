import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StaffComponent } from './staff.component';

// Mock class for NgbModalRef
export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
}

describe('StaffComponent', () => {

  let fixture: ComponentFixture<StaffComponent>;
  let component: StaffComponent;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaffComponent
      ],
      imports: [
        NgbModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    modalService = TestBed.get(NgbModal);
  }));

  it('should open modal', () => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef);
    component.openModal();
    expect(modalService.open).toHaveBeenCalledWith('<xxxx>');
  });

  // Needs to be async as modal result returned in a promise
  it('should update closeResult when modal closed', fakeAsync(() => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef);

    component.openModal();
    tick();
    expect(component.closeResult).toBe('Closed with: x');
  }));

  // Needs to be async as modal result returned in a promise
  it('should update closeResult when modal dismissed', fakeAsync(() => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef);
    // Override the result returned from the modal so we can test what happens when the modal is dismissed
    mockModalRef.result = new Promise((resolve, reject) => reject('y'));

    component.openModal();
    tick();
    expect(component.closeResult).toBe('Dismissed with: y');
  }));

  it('should filter the dataSource', () => {
    expect.hasAssertions();
    component.filter.setValue('Alain');
    component.ngOnChanges();
    fixture.detectChanges();
    

    expect(component.staffList.filter).toBe('Alain');
    expect(component.staffList.length).toBe(1);

    expect(component.staffList[0].firstName).toBe(
      'Alain'
    );

    return fixture.whenStable().then(() => {
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(1); 
      const cell = fixture.nativeElement
        .querySelector('tbody td:nth-child(1)')
            expect(cell.textContent)
        .toBe('Alain Chrono');
    });
  });

});