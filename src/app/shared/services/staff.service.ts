import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Staff } from '../types/staff.type';

@Injectable()
export class StaffService {

  // I would init with 0 instead of 4, but since it's a Fake Get, I'll skip loading the Json and counting the objects.
  private $staffCount = new BehaviorSubject(4);
  public currentStaffCount = this.$staffCount.asObservable();
  public baseUrl:string;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http : HttpClient) {
    this.baseUrl = environment.mockUrl;
    this.headers.set('Content-type', 'application/json');
  }

  public fakeGet(): Observable<Staff[]> {
    return Observable.create(observer => {
      this.http.get(this.baseUrl + "api/doctors", {headers: this.headers}).pipe()
      .subscribe((data : any) => {
          observer.next(data);
          observer.complete();
          this.changeStaffCount(data.length)
      },(error : any) => console.log('error', error))
    });
  }

  public changeStaffCount(count: number) : void {
    this.$staffCount.next(count)
  }

}