import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() staffCount: number = 0;

  scheduleIsView: boolean = true;
  staffIsView: boolean = false;

  constructor(private router: Router) {
    this.scheduleIsView = this.router.url === '/schedule';
    this.staffIsView = this.router.url === '/staff';
   }

  ngOnInit() {
    
  }

  switchView(link:string){
    this.router.navigate([link])
  }

}
