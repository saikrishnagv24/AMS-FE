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
  addEmployeeDialog:boolean=false;
  EmployeeForm!: FormGroup;
  DepartmentDropdown:any;
  locationDropdown:any;
  employeeList:any;
  displayDeleteConfirmation:boolean=false;
  DelteId!:number;
  DeleteEmployee:any;
  EditEmployeeDialog:boolean=false;
  EmployeeEdit:any;
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
   this.getEmployeeDetails();
  }

  getDepartmentDropdown(){
    this.employeeService.GetDepartment().subscribe((res)=>{ 
      this.DepartmentDropdown = res;
    });
  }
  getLocationDropdown(){
    this.employeeService.GetLocation().subscribe((res) => {
      this.locationDropdown = res;
    });
  }

  getEmployeeDetails(){
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeeList = res;
    });
  }
  saveEmployee(){ 
        if(this.EmployeeForm.value.Id == undefined || this.EmployeeForm.value.Id==''){
        this.EmployeeForm.get("Id")?.setValue(0);
      }
      if(this.EmployeeForm.value.Id == 0){
      if(this.EmployeeForm.valid){
        this.employeeService.AddEmployee(this.EmployeeForm.value).subscribe(res=>{ 
          this.getEmployeeDetails(); 
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Employee added'});
        });
    
      }
      this.addEmployeeDialog = false;    
      }
      else{
      if(this.EmployeeForm.valid){
      this.employeeService.EditEmployeeData(this.EmployeeForm.value).subscribe((res)=>{ 
        this.getEmployeeDetails(); 
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Employee edited'});
      });
      this.EditEmployeeDialog = false; 
      }
      }
      this.EmployeeForm.reset();
    
  }

  EditEmployee(id: number){
    this.EditEmployeeDialog=true;
    this.employeeService.getEmployeeEditDetial(id).subscribe((res)=>{ 
      this.EmployeeEdit = res;
      console.log("EmployeeEdit",this.EmployeeEdit)
      this.EmployeeForm.get("Id")?.patchValue(this.EmployeeEdit.id);
      this.EmployeeForm.get("EmployeeId")?.patchValue(this.EmployeeEdit.employeeId);
      this.EmployeeForm.get("Name")?.patchValue(this.EmployeeEdit.name);
      this.EmployeeForm.get("PhoneNumber")?.patchValue(this.EmployeeEdit.phoneNumber);
      this.EmployeeForm.get("DepartmentId")?.patchValue(this.EmployeeEdit.departmentId);
      this.EmployeeForm.get("LocationId")?.patchValue(this.EmployeeEdit.locationId);
    });
  }

  DelteAssetType(id : number,assetTypeName : any){
    this.displayDeleteConfirmation=true;
    console.log("Deleteid",id);
    this.DelteId=0;
    this.DeleteEmployee = null;
    this.DelteId=id;
    this.DeleteEmployee = assetTypeName;
  }
  
  yesDelete(){
      console.log(this.DelteId);
      console.log(this.DeleteEmployee)
  
      if(this.DelteId!=0){
        this.employeeService.DeleteEmployee(this.DelteId).subscribe((res)=>{ 
         //console.log("this.AssetTypeList",this.AssetTypeListTemp);
         this.getEmployeeDetails();
         this.messageService.add({severity:'success', summary: 'Success', detail: 'Employee'+ this.DeleteEmployee +' Deleted'});
          });
        }
        this.displayDeleteConfirmation = false;
        setTimeout (() => {
          this.DelteId=0;
          this.DeleteEmployee=null},500);
  }
  
  noDelete(){
      console.log(this.DelteId);
      this.displayDeleteConfirmation = false;
  }

  openNew(){
    this.addEmployeeDialog=true;
  }
  hideDialog(){
    this.addEmployeeDialog=false;
  }
}
