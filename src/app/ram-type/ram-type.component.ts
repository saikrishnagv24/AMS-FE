import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RamTypeService } from '../Services/ram-type.service';

@Component({
  selector: 'app-ram-type',
  templateUrl: './ram-type.component.html',
  styleUrls: ['./ram-type.component.css']
})
export class RamTypeComponent implements OnInit {

  ramDialog!: boolean;

  submitted!: boolean;

  ramTypeForm!: FormGroup;

  RamTypeList:any;
  RamTypeListTemp:any;
  RamTypeEdit:any;
  RamTypeEditTemp:any;
  constructor(public formBuilder: FormBuilder,public RamTypeService:RamTypeService ) { }

  ngOnInit(): void {

    this.ramTypeForm = this.formBuilder.group({
      Id:[0],
      RamTypeName : ['',Validators.required]
   })

   this.getRamType();
  }
  openNew(){
    this.submitted = false;
    this.ramDialog = true;
  }
  hideDialog(){
    this.ramDialog = false;
    this.submitted = false;
  }

  saveRam(){
    this.submitted=true;
    console.log("this.ramTypeForm.value",this.ramTypeForm.value);
    
    if(this.ramTypeForm.value.Id == undefined){
      this.ramTypeForm.get("Id")?.setValue(0);
    }
    if(this.ramTypeForm.value.Id == 0){
    console.log("this.ramTypeForm.value2222",this.ramTypeForm.value);
    if(this.ramTypeForm.valid){
      this.RamTypeService.RamTypePost(this.ramTypeForm.value).subscribe(res=>{  
      });
  
    }      
   }
    else{
    if(this.ramTypeForm.valid){
    this.RamTypeService.EditRamType(this.ramTypeForm.value).subscribe((res)=>{ 
      this.RamTypeListTemp = res;
      console.log("this.RamTypeList",this.RamTypeListTemp);
    });
   }
    }
  
  }
  
  getRamType(){
    this.RamTypeService.GetRamType().subscribe((res)=>{ 
      this.RamTypeListTemp = res;
      console.log("this.RamTypeList",this.RamTypeListTemp);
    });
    setTimeout (() => {
      this.RamTypeList =this.RamTypeListTemp;
    console.log("this.RamTypeList2",this.RamTypeList);},1000)
  }
  
  EditRamType(id : any,){
    this.ramDialog = true;
    console.log("dadad",id);
    this.RamTypeService.GetEditRamType(id).subscribe((res)=>{ 
      console.log("res",res);
      this.RamTypeEditTemp = res;
    });
    setTimeout (() => {
      this.RamTypeEdit =this.RamTypeEditTemp;
    console.log("this.RamTypeEditTemp",this.RamTypeEdit)
    this.ramTypeForm.get("Id")?.patchValue(this.RamTypeEdit.id);
    this.ramTypeForm.get("RamTypeName")?.patchValue(this.RamTypeEdit.cpuTypeName);},500)
  
    
  
  
  
  }
  
  DeleteRamType(id : number){
  console.log("Deleteid",id);
  if(id!=0){
      this.RamTypeService.DeleteRamType(id).subscribe((res)=>{ 
       console.log("this.RamTypeList",this.RamTypeListTemp);
        });
  }
  
  }
}
