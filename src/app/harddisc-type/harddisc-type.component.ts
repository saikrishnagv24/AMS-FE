import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HarddiscTypeService } from 'src/app/Services/harddisc-type.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-harddisc-type',
  templateUrl: './harddisc-type.component.html',
  // styleUrls: ['./harddisc-type.component.css']
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
  displayDeleteConfirmation: boolean = false;

  DeleteId!:number;

  DeleteHardTypeDetail:any;


  constructor(public formBuilder: FormBuilder , public harddiscTypeService : HarddiscTypeService,public messageService:MessageService) { }

  ngOnInit(): void {
    this.harddiscTypeForm = this.formBuilder.group({
      Id:[0],
      HarddiscTypeName : ['',Validators.required]
   })
    
   this.getHarddiscType();
 
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
  console.log("this.harddiscTypeForm.value",this.harddiscTypeForm.value);
  
  if(this.harddiscTypeForm.value.Id == undefined){
    this.harddiscTypeForm.get("Id")?.setValue(0);
  }
  if(this.harddiscTypeForm.value.Id == 0){
  console.log("this.harddiscTypeForm.value2222",this.harddiscTypeForm.value);
  if(this.harddiscTypeForm.valid){
    this.harddiscTypeService.HarddiscTypePost(this.harddiscTypeForm.value).subscribe(res=>{  
    });

  }   
  this.harddiscDialog = false;    
 }
 else{
  if(this.harddiscTypeForm.valid){
  this.harddiscTypeService.EditHarddiscType(this.harddiscTypeForm.value).subscribe((res: any)=>{ 
    this.HardTypeListTemp = res;
    this.getHarddiscType();
    console.log("this.CpuTypeList",this.HardTypeListTemp);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Cpu type added'});
  });
  this.harddiscDialog = false; 
 }
 this.harddiscTypeForm.reset();
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

DeleteHarddiscType(id : number,cpuTypeName : any){
  this.displayDeleteConfirmation=true;
  console.log("Deleteid",id);
  this.DeleteId=0;
  this. DeleteHardTypeDetail = null;
  this.DeleteId=id;
  this. DeleteHardTypeDetail = cpuTypeName;
  }

  yesDelete(){
    console.log(this.DeleteId);
    console.log(this.DeleteHardTypeDetail)

    if(this.DeleteId!=0){
      this.harddiscTypeService.DeleteHarddiscType(this.DeleteId).subscribe((res)=>{ 
       console.log("this.AssetTypeList",this.HardTypeListTemp);
       this.getHarddiscType();
       this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type '+ this.DeleteHardTypeDetail +' Deleted'});
        });
      }
      this.displayDeleteConfirmation = false;
      setTimeout (() => {
        this.DeleteId=0;
        this. DeleteHardTypeDetail=null},500);
  }

  noDelete(){
    console.log(this.DeleteId);
    this.displayDeleteConfirmation = false;
  }

  }


