import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  EmployeeDetailsList: any;
  addEmployeeDialog:boolean=false;
  EmployeeForm!: FormGroup;
  constructor(public formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.EmployeeForm = this.formBuilder.group({
      Id:[''],
      EmployeeId : ['',Validators.required],
      EmployeeName : ['',Validators.required],
      ContactNumber : ['',Validators.required],
      Department : ['',Validators.required],
      Location : ['',Validators.required]
   })
  }

  openNew(){
    this.addEmployeeDialog=true;
  }
  hideDialog(){
    this.addEmployeeDialog=false;
  }
}
