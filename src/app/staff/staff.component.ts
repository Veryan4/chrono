import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StaffModalComponent } from './staff-modal/staff-modal.component'
import { StaffService } from '../shared/services/staff.service';
import { Staff } from '../shared/types/staff.type';
import StaffJson  from '../../assets/Staff.json';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staffList: Staff[] = StaffJson;
  staffObs: Observable<Staff[]> ;
  filter = new FormControl('');
  closeResult: string;
  
  constructor(
    private modalService: NgbModal,
    private staffService: StaffService) { 
      this.staffObs = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
    }

  ngOnInit() {
    this.fakeHttpGet();
  }

  // Search also works on Ids, even if not displayed
  search(text: string): Staff[] {
    return this.staffList.filter(staff => {
      const term = text.toLowerCase();
      return staff.id.toString().includes(term)
          || staff.firstName.toLowerCase().includes(term)
          || staff.lastName.toLowerCase().includes(term)
          || staff.group.toLowerCase().includes(term)
    });
  }

  openModal() : void {
    this.modalService.open(StaffModalComponent, {ariaLabelledBy: 'staff-modal'}).result.then((staff) => {
      if(staff){
        let latestId = Math.max.apply(Math, this.staffList.map(function(obj) { return obj.id; }))
        staff.id = latestId + 10;
        this.staffList.push(staff);
        //prevents Users from getting confused if staff missing after Modal Add.
        this.filter.setValue('');
        this.staffService.changeStaffCount(this.staffList.length);
      }
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  fakeHttpGet() : void {
    this.staffService.fakeGet().subscribe(staffToAdd => {
      staffToAdd.forEach(staff =>{
        //This is simply a moch, so there's no data to push
        //Unit Test handled in StaffService
        //this.staffList.push(staff);
      });
    })
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
