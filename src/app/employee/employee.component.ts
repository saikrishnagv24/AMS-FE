import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  EmployeeDetailsList: any;
  addEmployeeDialog:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  openNew(){
    this.addEmployeeDialog=true;
  }
  hideDialog(){
    this.addEmployeeDialog=false;
  }
}
