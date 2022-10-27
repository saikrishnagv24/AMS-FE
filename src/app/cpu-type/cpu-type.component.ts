import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CpuTypeService } from '../Services/cpu-type.service';
@Component({
  selector: 'app-cpu-type',
  templateUrl: './cpu-type.component.html',
  styleUrls: ['./cpu-type.component.css']
})
export class CpuTypeComponent implements OnInit {
  cpuDialog!: boolean;

  submitted!: boolean;

  cpuTypeForm!: FormGroup;

  CpuTypeList:any;
  CpuTypeListTemp:any;
  CpuTypeEdit:any;
  CpuTypeEditTemp:any;

  constructor(public formBuilder: FormBuilder,public CpuTypeService:CpuTypeService) { }

  ngOnInit(): void {

    this.cpuTypeForm = this.formBuilder.group({
      Id:[0],
      CpuTypeName : ['',Validators.required]
   })
   this.getCpuType();

  }

  openNew() {
   
    this.submitted = false;
    this.cpuDialog = true;
  }

  hideDialog() {
    this.cpuDialog = false;
    this.submitted = false;
}

saveCpu(){
  this.submitted=true;
  console.log("this.cpuTypeForm.value",this.cpuTypeForm.value);
  
  if(this.cpuTypeForm.value.Id == undefined){
    this.cpuTypeForm.get("Id")?.setValue(0);
  }
  if(this.cpuTypeForm.value.Id == 0){
  console.log("this.cpuTypeForm.value2222",this.cpuTypeForm.value);
  if(this.cpuTypeForm.valid){
    this.CpuTypeService.CpuTypePost(this.cpuTypeForm.value).subscribe(res=>{  
    });

  }      
 }
  else{
  if(this.cpuTypeForm.valid){
  this.CpuTypeService.EditCpuType(this.cpuTypeForm.value).subscribe((res)=>{ 
    this.CpuTypeListTemp = res;
    console.log("this.CpuTypeList",this.CpuTypeListTemp);
  });
 }
  }

}

getCpuType(){
  this.CpuTypeService.GetCpuType().subscribe((res)=>{ 
    this.CpuTypeListTemp = res;
    console.log("this.CpuTypeList",this.CpuTypeListTemp);
  });
  setTimeout (() => {
    this.CpuTypeList =this.CpuTypeListTemp;
  console.log("this.CpuTypeList2",this.CpuTypeList);},1000)
}

EditCpuType(id : any,){
  this.cpuDialog = true;
  console.log("dadad",id);
  this.CpuTypeService.GetEditCpuType(id).subscribe((res)=>{ 
    console.log("res",res);
    this.CpuTypeEditTemp = res;
  });
  setTimeout (() => {
    this.CpuTypeEdit =this.CpuTypeEditTemp;
  console.log("this.CpuTypeEditTemp",this.CpuTypeEdit)
  this.cpuTypeForm.get("Id")?.patchValue(this.CpuTypeEdit.id);
  this.cpuTypeForm.get("CpuTypeName")?.patchValue(this.CpuTypeEdit.cpuTypeName);},500)

  



}

DeleteCpuType(id : number){
console.log("Deleteid",id);
if(id!=0){
    this.CpuTypeService.DeleteCpuType(id).subscribe((res)=>{ 
     console.log("this.CpuTypeList",this.CpuTypeListTemp);
      });
}

}

}
