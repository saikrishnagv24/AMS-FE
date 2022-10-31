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
  editHarddiscDialog! : boolean;
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
      Id:[''],
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
  
  if(this.harddiscTypeForm.value.Id == undefined || this.harddiscTypeForm.value.Id==''){
    this.harddiscTypeForm.get("Id")?.setValue(0);
  }
  if(this.harddiscTypeForm.value.Id == 0){
  if(this.harddiscTypeForm.valid){
    this.harddiscTypeService.HarddiscTypePost(this.harddiscTypeForm.value).subscribe(res=>{  
      this.getHarddiscType();
      this.messageService.add({severity:'success', summary: 'Success', detail: ' Harddisc Type added'});
    });
   

  }   
  this.harddiscDialog = false;    
 }
 else{
  if(this.harddiscTypeForm.valid){
  this.harddiscTypeService.EditHarddiscType(this.harddiscTypeForm.value).subscribe((res: any)=>{ 
    this.HardTypeListTemp = res;
    this.getHarddiscType();
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Harddisc Type edited'});
  });
  this.harddiscDialog = false; 
 }
 this.harddiscTypeForm.reset();
  }
}
getHarddiscType(){
  this.harddiscTypeService.GetHarddiscType().subscribe((res: any)=>{ 
    this.HardTypeListTemp = res;
  });
  setTimeout (() => {
    this.HarddiscTypeList =this.HardTypeListTemp;
  ;},3000)
}

EditHarddiscType(id : any,){
  this.editHarddiscDialog = true;
  this.harddiscTypeService.GetEditHarddiscType(id).subscribe((res)=>{ 
    this.HardTypeListTemp = res;
  });
  setTimeout (() => {
    this.HarddiscTypeEdit =this.HardTypeListTemp;
  this.harddiscTypeForm.get("Id")?.patchValue(this.HarddiscTypeEdit.id);
  this.harddiscTypeForm.get("HarddiscTypeName")?.patchValue(this.HarddiscTypeEdit.harddiscTypeName);},500)
}

DeleteHarddiscType(id : number,cpuTypeName : any){
  this.displayDeleteConfirmation=true;
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
       this.getHarddiscType();
       this.messageService.add({severity:'success', summary: 'Success', detail: 'Harddisc type '+ this.DeleteHardTypeDetail +' Deleted'});
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


