import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CpuTypeService } from '../Services/cpu-type.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cpu-type',
  templateUrl: './cpu-type.component.html',
  styleUrls: ['./cpu-type.component.css']
})
export class CpuTypeComponent implements OnInit {
  cpuDialog!: boolean;

  submitted!: boolean;

  cpuTypeForm!: FormGroup;

  displayDeleteConfirmation: boolean = false;

  DeleteId!:number;

  DeleteCpuTypeDetail:any;


  CpuTypeList:any;

  CpuTypeListTemp:any;

  CpuTypeEdit:any;
  
  CpuTypeEditTemp:any;

  constructor(public formBuilder: FormBuilder,public CpuTypeService:CpuTypeService,public messageService:MessageService ) { }

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
    this.cpuTypeForm.reset();
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
      this.getCpuType(); 
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Cpu type added'});
    });

  } 
  this.cpuDialog = false;       
 }
  else{
  if(this.cpuTypeForm.valid){
  this.CpuTypeService.EditCpuType(this.cpuTypeForm.value).subscribe((res)=>{ 
    this.CpuTypeListTemp = res;
    this.getCpuType();
    console.log("this.CpuTypeList",this.CpuTypeListTemp);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Cpu type added'});
  });
  this.cpuDialog = false; 
 }
  }
  this.cpuTypeForm.reset();
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

DeleteCpuType(id : number,cpuTypeName : any){
  this.displayDeleteConfirmation=true;
  console.log("Deleteid",id);
  this.DeleteId=0;
  this.DeleteCpuTypeDetail = null;
  this.DeleteId=id;
  this.DeleteCpuTypeDetail = cpuTypeName;
  }

  yesDelete(){
    console.log(this.DeleteId);
    console.log(this.DeleteCpuTypeDetail)

    if(this.DeleteId!=0){
      this.CpuTypeService.DeleteCpuType(this.DeleteId).subscribe((res)=>{ 
       console.log("this.AssetTypeList",this.CpuTypeListTemp);
       this.getCpuType();
       this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type '+ this.DeleteCpuTypeDetail +' Deleted'});
        });
      }
      this.displayDeleteConfirmation = false;
      setTimeout (() => {
        this.DeleteId=0;
        this.DeleteCpuTypeDetail=null},500);
  }

  noDelete(){
    console.log(this.DeleteId);
    this.displayDeleteConfirmation = false;
  }

}
