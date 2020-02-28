import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { StaffService } from './staff.service';

describe('StaffService', () => {
  let service: StaffService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [ 
        StaffService 
      ]
    })
    .compileComponents();
    service = TestBed.get(StaffService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('fakeGet', () => {
    it('should return an Observable<Staff[]>', () => {
      const someStaff = [
        { 
          id: 80, 
          firstName: 'Steve', 
          lastName: 'Chrono', 
          group: 'doctor' 
        },
        { 
          id: 90, 
          firstName: 'Bruce', 
          lastName: 'Chrono', 
          group: 'nurse'
        },
      ];
      service.fakeGet().subscribe((staffList) => {
        expect(staffList.length).toBe(2);
        expect(staffList).toEqual(someStaff);
      });
      const req = httpMock.expectOne(`${service.baseUrl}api/doctors`);
      expect(req.request.method).toBe("GET");
      req.flush(someStaff);
      httpMock.verify();
    });
  });

  describe('changeStaffCount', () => {
    it('should update the BehaviorSubject value', () => {
      service.changeStaffCount(10)
      service.currentStaffCount.subscribe((count) => {
        expect(count).toBe(10);
      });
    });
  });
  
});