import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  EmployeeDetailsList: any;
  addEmployeeDialog:boolean=false;
  EmployeeForm!: FormGroup;
  DepartmentDropdown:any;
  locationDropdown:any;
  constructor(public formBuilder: FormBuilder,public employeeService:EmployeeService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.EmployeeForm = this.formBuilder.group({
      Id:[''],
      EmployeeId : ['',Validators.required],
      Name : ['',Validators.required],
      PhoneNumber : ['',Validators.required],
      DepartmentId : ['',Validators.required],
      LocationId : ['',Validators.required]
   })

   this.getDepartmentDropdown();
   this.getLocationDropdown();
  }

  getDepartmentDropdown(){
    this.employeeService.GetDepartment().subscribe((res)=>{ 
      this.DepartmentDropdown = res;
      console.log("this.DepartmentDropdown",this.DepartmentDropdown);
    });
  }
  getLocationDropdown(){
    this.employeeService.GetLocation().subscribe((res) => {
      this.locationDropdown = res;
      console.log("this.locationDropdown",this.locationDropdown);
    });
  }

  saveEmployee(){
    console.log("this.EmployeeForm",this.EmployeeForm.value);   
        if(this.EmployeeForm.value.Id == undefined || this.EmployeeForm.value.Id==''){
        this.EmployeeForm.get("Id")?.setValue(0);
      }
      if(this.EmployeeForm.value.Id == 0){
      console.log("this.assetTypeForm.value2222",this.EmployeeForm.value);
      if(this.EmployeeForm.valid){
        this.employeeService.AddEmployee(this.EmployeeForm.value).subscribe(res=>{ 
          //this.getAssetType(); 
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type added'});
        });
    
      }
      //this.assetDialog = false;    
      }
      else{
      if(this.EmployeeForm.valid){
      this.employeeService.EditEmployee(this.EmployeeForm.value).subscribe((res)=>{ 
        // this.AssetTypeListTemp = res;
        // this.getAssetType();
       // console.log("this.AssetTypeList",this.AssetTypeListTemp);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type edited'});
      });
      //this.assetDialogEdit = false; 
      }
      }
      this.EmployeeForm.reset();
    
  }

  openNew(){
    this.addEmployeeDialog=true;
  }
  hideDialog(){
    this.addEmployeeDialog=false;
  }
}
