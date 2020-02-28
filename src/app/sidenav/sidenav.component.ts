import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../shared/services/staff.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  staffCount:number = 0;
  scheduleIsView: boolean = true;
  staffIsView: boolean = false;

  constructor(
    private router: Router,
    public staffService: StaffService) {
    this.scheduleIsView = this.router.url === '/schedule';
    this.staffIsView = this.router.url === '/staff';
   }

  ngOnInit() {
    this.staffService.currentStaffCount.subscribe(count => this.staffCount = count);
  }

  switchView(link:string) : void {
    this.router.navigate([link])
  }

}
