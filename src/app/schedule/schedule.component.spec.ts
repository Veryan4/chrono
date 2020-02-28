import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { ScheduleComponent } from './schedule.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { StaffService } from '../shared/services/staff.service';
import { HttpClientTestingModule } from  '@angular/common/http/testing';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ScheduleComponent,
        SidenavComponent 
      ],
      imports:[
        RouterTestingModule,
        FormsModule,
        NgbModule,
        HttpClientTestingModule
      ],
      providers:[
        StaffService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
