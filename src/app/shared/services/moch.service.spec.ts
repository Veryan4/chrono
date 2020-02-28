import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MochService } from './moch.service';

describe('MochService', () => {
  let service: MochService;
  let http: HttpClient;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
    })
    .compileComponents();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = new MochService(http);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('mochGet', () => {
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
      service.mochGet().subscribe((staffList) => {
        expect(staffList.length).toBe(2);
        expect(staffList).toEqual(someStaff);
      });
      const req = httpMock.expectOne(`${service.baseUrl}/api/doctors`);
      expect(req.request.method).toBe("GET");
      req.flush(someStaff);
      httpMock.verify();
    });
  });
  
});