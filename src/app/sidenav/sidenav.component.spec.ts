import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { StaffService } from '../shared/services/staff.service';
import { HttpClientTestingModule } from  '@angular/common/http/testing';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let routes:string[] = ['staff','schedule']

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent ],
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        StaffService,
        {
          provide: Router,
          useClass: class { 
              navigate = jasmine.createSpy("navigate"); 
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /<link> when switchView(<link>)', () => {
    let router = fixture.debugElement.injector.get(Router);
    routes.forEach( route => {
      component.switchView(route);
      expect(router.navigate).toHaveBeenCalledWith([route]);
    });
  });
  
});
