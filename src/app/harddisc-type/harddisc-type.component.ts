import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HarddiscTypeService } from 'src/app/Services/harddisc-type.service';

@Component({
  selector: 'app-harddisc-type',
  templateUrl: './harddisc-type.component.html',
  styleUrls: ['./harddisc-type.component.css']
})
export class HarddiscTypeComponent implements OnInit {
  submitted!: boolean;
  harddiscDialog!: boolean;
  harddiscTypeForm: any;
  HardTypeListTemp: any;
  HarddiscTypeList: any;
  HarddiscTypeService: any;
  HarddiscTypeEdit : any;
  HarddiscTypeEditTemp : any;


  constructor(public formBuilder: FormBuilder , public harddiscTypeService : HarddiscTypeService) { }

  ngOnInit(): void {
    this.harddiscTypeForm = this.formBuilder.group({
      Id:[''],
      HarddiscTypeName : ['',Validators.required]
   })
    

 
  }

  openNew() {
    this.submitted = false;
    this.harddiscDialog = true;
  }

  hideDialog() {
    this.harddiscDialog = false;
    this.submitted = false;
}



saveHarddisc(){
  this.submitted=true;
  console.log("this.assetTypeForm.value",this.harddiscTypeForm.value);
  
  if(this.harddiscTypeForm.value.Id == undefined){
    this.harddiscTypeForm.get("Id")?.setValue(0);
  }
  if(this.harddiscTypeForm.value.Id == 0){
  console.log("this.harddiscTypeForm.value2222",this.harddiscTypeForm.value);
  if(this.harddiscTypeForm.valid){
    this.harddiscTypeService.HarddiscTypePost(this.harddiscTypeForm.value).subscribe(res=>{  
    });

  }      
 }
 else{
  if(this.harddiscTypeForm.valid){
  this.harddiscTypeService.EditHarddiscType(this.harddiscTypeForm.value).subscribe((res: any)=>{ 
    this.HardTypeListTemp = res;
    console.log("this.HarddiscTypeList",this.HardTypeListTemp);
  });
 }
  }
}
getHarddiscType(){
  this.harddiscTypeService.GetHarddiscType().subscribe((res: any)=>{ 
    this.HardTypeListTemp = res;
    console.log("this.HarddiscTypeList",this.HardTypeListTemp);
  });
  setTimeout (() => {
    this.HarddiscTypeList =this.HardTypeListTemp;
  console.log("this.HarddiscTypeList2",this.HarddiscTypeList);},1000)
}

EditHarddiscType(id : any,){
  this.harddiscDialog = true;
  console.log("dadad",id);
  this.harddiscTypeService.GetEditHarddiscType(id).subscribe((res)=>{ 
    console.log("res",res);
    this.HardTypeListTemp = res;
  });
  setTimeout (() => {
    this.HarddiscTypeEdit =this.HardTypeListTemp;
  console.log("this.HarddiscTypeEditTemp",this.HarddiscTypeEdit)
  this.harddiscTypeForm.get("Id")?.patchValue(this.HarddiscTypeEdit.id);
  this.harddiscTypeForm.get("HarddiscTypeName")?.patchValue(this.HarddiscTypeEdit.harddiscTypeName);},500)
}

DeleteHarddiscType(id : number){
  console.log("Deleteid",id);
  if(id!=0){
      this.harddiscTypeService.DeleteHarddiscType(id).subscribe((res)=>{ 
       console.log("this.HarddiscTypeList",this.HardTypeListTemp);
        });
  }
  
  }

}
