import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Staff } from '../types/staff.type';

@Injectable()
export class MochService {

  public baseUrl:string;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http : HttpClient) {
    this.baseUrl = environment.mockUrl;
    this.headers.set('Content-type', 'application/json');
  }

  public mochGet(): Observable<Staff[]> {
    return Observable.create(observer => {
      this.http.get(this.baseUrl + "api/doctors", {headers: this.headers}).pipe()
      .subscribe((data : any) => {
          observer.next(data);
          observer.complete();
      },(error : any) => console.log('error', error))
    });
  }


}