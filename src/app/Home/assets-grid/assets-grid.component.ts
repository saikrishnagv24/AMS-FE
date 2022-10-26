import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets-grid',
  templateUrl: './assets-grid.component.html',
  styleUrls: ['./assets-grid.component.css']
})
export class AssetsGridComponent implements OnInit {
  productDialog: boolean =false;
  submitted: boolean = false;
  minDate!: Date;
  maxDate!: Date;
  constructor() { }

  ngOnInit(): void {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

  }
  openNew() {
    this.submitted = false;
    this.productDialog = true;
  } 
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  } 

}
