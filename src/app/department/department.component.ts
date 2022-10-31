import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DepartmentService } from '../Services/department.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentDialog!: boolean;

  departmentDialogEdit!: boolean;

  submitted!: boolean;

  departmentTypeForm!: FormGroup;

 
  
  displayDeleteConfirmation: boolean = false;

  DeleteId!:number;

  DeleteDepartmentType:any;

  DeleteDepartmentdescription:any;

  
  DepartmentTypeList:any;
  DepartmentTypeListTemp:any;
  DepartmentTypeEdit:any;
  DepartmentTypeEditTemp:any;
  constructor(public formBuilder:FormBuilder,public DepartmentService:DepartmentService,public messageService:MessageService  ) { }

  ngOnInit(): void {

    this.departmentTypeForm = this.formBuilder.group({
      id:[0],
      departmentName : ['',Validators.required]
      // description : ['',Validators.required] 
   })

   this. getDepartment();
  }
 
  openNew() {
   
    this.submitted = false;
    this.departmentDialog = true;
  }

  hideDialog() {
    this.departmentDialog = false;
    this.submitted = false;
    this.departmentTypeForm.reset();
  }

  saveDepartment(){
    this.submitted=true;
    console.log("this.departmentTypeForm.value",this.departmentTypeForm.value);
    
    if(this.departmentTypeForm.value.id == undefined || this.departmentTypeForm.value.id==''){
      this.departmentTypeForm.get("id")?.setValue(0);
    }
    if(this.departmentTypeForm.value.id == 0){
    console.log("this.departmentTypeForm.value2222",this.departmentTypeForm.value);
    if(this.departmentTypeForm.valid){
      this.DepartmentService.DepartmentPost(this.departmentTypeForm.value).subscribe(res=>{ 
        this.getDepartment(); 
        this.messageService.add({severity:'success', summary: 'Success', detail: 'department detail added'});
      });
  
    }
    this.departmentDialog = false;    
    }
    else{
    if(this.departmentTypeForm.valid){
    this.DepartmentService.EditDepartment(this.departmentTypeForm.value).subscribe((res)=>{ 
      this.DepartmentTypeListTemp = res;
      this.getDepartment();
      console.log("this.DepartmentTypeList",this.DepartmentTypeListTemp);
      this.messageService.add({severity:'success', summary: 'Success', detail: 'department name Edited'});
    });
    this.departmentDialogEdit = false; 
    }
    }
    this.departmentTypeForm.reset();
  
  }
  
  
  getDepartment(){
    this.DepartmentService.GetDepartment().subscribe((res)=>{ 
      this.DepartmentTypeList = res;
      console.log("this.DepartmentTypeList",this.DepartmentTypeList);
    });
    // setTimeout (() => {
    //   this.DepartmentTypeList =this.DepartmentTypeListTemp;
    // console.log("this.DepatmentTypeList2",this.DepartmentTypeList);},1000)
  }
  
  EditDepartment(id : any,){
    this.departmentDialogEdit = true;
    console.log("dadad",id);
    this.DepartmentService.GetEditDepartment(id).subscribe((res)=>{ 
      console.log("res",res);
      this.DepartmentTypeEditTemp = res;
    });
    setTimeout (() => {
      this.DepartmentTypeEdit =this.DepartmentTypeEditTemp;
    console.log("this.departmentEditTemp",this.DepartmentTypeEdit)
    this.departmentTypeForm.get("id")?.patchValue(this.DepartmentTypeEdit.id);
    this.departmentTypeForm.get("departmentName")?.patchValue(this.DepartmentTypeEdit.departmentName);},500)
    // this.departmentTypeForm.get("description")?.patchValue(this.DepartmentTypeEdit.description);},500)
  }
  
  DeleteDepartment(id : number,departmentName : any){
    this.displayDeleteConfirmation=true;
    console.log("Deleteid",id);
    this.DeleteId=0;
    this.DeleteDepartmentType = null;
    this.DeleteDepartmentdescription= null;
    this.DeleteId=id;
    this.DeleteDepartmentType = departmentName;
    // this.DeleteDepartmentdescription= description;
    }
  
    yesDelete(){
      console.log(this.DeleteId);
      console.log(this.DeleteDepartmentType);
      // console.log(this.DeleteDepartmentdescription)
  
      if(this.DeleteId!=0){
        this.DepartmentService.DeleteDepartment(this.DeleteId).subscribe((res)=>{ 
         console.log("this.DepartmentTypeList",this.DepartmentTypeListTemp);
         this.getDepartment();
         this.messageService.add({severity:'success', summary: 'Success', detail: 'Department Name '+ this.DeleteDepartmentType +' Deleted'});
          });
        }
        this.displayDeleteConfirmation = false;
        setTimeout (() => {
          this.DeleteId=0;
          this.DeleteDepartmentType=null},500)
          // this.DeleteDepartmentdescription=null},500);
    }
  
    noDelete(){
      console.log(this.DeleteId);
      this.displayDeleteConfirmation = false;
    }
}
