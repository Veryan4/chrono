import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StaffModalComponent } from './staff-modal/staff-modal.component'
import { Staff } from '../types/staff.type';
import StaffJson  from '../../assets/Staff.json';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
  providers: [DecimalPipe]
})
export class StaffComponent implements OnInit {

  staffList: Staff[] = StaffJson;
  staffSubscription: Observable<Staff[]> ;
  filter = new FormControl('');
  
  constructor(
    private modalService: NgbModal,
    private pipe: DecimalPipe) { 
      this.staffSubscription = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text, pipe))
      );
    }

  ngOnInit() {
  }

  // Search also works on Ids, even if not displayed
  search(text: string, pipe: PipeTransform): Staff[] {
    return this.staffList.filter(staff => {
      const term = text.toLowerCase();
      return pipe.transform(staff.id).includes(term)
          || staff.firstName.toLowerCase().includes(term)
          || staff.lastName.toLowerCase().includes(term)
          || staff.group.toLowerCase().includes(term)
    });
  }

  openModal() {
    this.modalService.open(StaffModalComponent, {ariaLabelledBy: 'staff-modal'}).result.then((staff) => {
      if(staff){
        let latestId = Math.max.apply(Math, this.staffList.map(function(obj) { return obj.id; }))
        staff.id = latestId + 10;
        this.staffList.push(staff);
        //prevents Users from getting confused if staff missing after Modal Add.
        this.filter.setValue('');
      }
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  // Left here for debugging purposes, should be removed for production
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
