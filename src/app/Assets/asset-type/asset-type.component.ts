import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AssetTypeService } from 'src/app/Services/asset-type.service';

// export interface type{
//   id:number;
//   assetTypeName:string;
// }

@Component({
  selector: 'app-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.css']
})

export class AssetTypeComponent implements OnInit {
  
  assetDialog!: boolean;

  assetDialogEdit!: boolean;

  submitted!: boolean;

  assetTypeForm!: FormGroup;

  displayDeleteConfirmation: boolean = false;

  DelteId!:number;

  DeleteAssetType:any;

  // public AssetTypeList:type[] = [];
  AssetTypeList:any;
  AssetTypeListTemp:any;
  AssetTypeEdit:any;
  AssetTypeEditTemp:any;
  constructor(public formBuilder: FormBuilder, public AssetTypeService:AssetTypeService,private messageService: MessageService) { }

  ngOnInit(): void {

    this.assetTypeForm = this.formBuilder.group({
      Id:[''],
      AssetTypeName : ['',Validators.required]
   })

    this.getAssetType();

  }
  
  openNew() {
   
    this.submitted = false;
    this.assetDialog = true;
  }

  hideDialog() {
    this.assetDialog = false;
    this.submitted = false;
    this.assetTypeForm.reset();
  }

saveAsset(){
  this.submitted=true;
  console.log("this.assetTypeForm.value",this.assetTypeForm.value);
  
  if(this.assetTypeForm.value.Id == undefined || this.assetTypeForm.value.Id==''){
    this.assetTypeForm.get("Id")?.setValue(0);
  }
  if(this.assetTypeForm.value.Id == 0){
  console.log("this.assetTypeForm.value2222",this.assetTypeForm.value);
  if(this.assetTypeForm.valid){
    this.AssetTypeService.AssetTypePost(this.assetTypeForm.value).subscribe(res=>{ 
      this.getAssetType(); 
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type added'});
    });

  }
  this.assetDialog = false;    
  }
  else{
  if(this.assetTypeForm.valid){
  this.AssetTypeService.EditAssetType(this.assetTypeForm.value).subscribe((res)=>{ 
    this.AssetTypeListTemp = res;
    this.getAssetType();
    console.log("this.AssetTypeList",this.AssetTypeListTemp);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type edited'});
  });
  this.assetDialogEdit = false; 
  }
  }
  this.assetTypeForm.reset();

}


getAssetType(){
  this.AssetTypeService.GetAssetType().subscribe((res)=>{ 
    this.AssetTypeListTemp = res;
    console.log("this.AssetTypeList",this.AssetTypeListTemp);
  });
  setTimeout (() => {
    this.AssetTypeList =this.AssetTypeListTemp;
  console.log("this.AssetTypeList2",this.AssetTypeList);},1000)
}

EditAssetType(id : any,){
  this.assetDialogEdit = true;
  console.log("dadad",id);
  this.AssetTypeService.GetEditAssetType(id).subscribe((res)=>{ 
    console.log("res",res);
    this.AssetTypeEditTemp = res;
  });
  setTimeout (() => {
    this.AssetTypeEdit =this.AssetTypeEditTemp;
  console.log("this.AssetTypeEditTemp",this.AssetTypeEdit)
  this.assetTypeForm.get("Id")?.patchValue(this.AssetTypeEdit.id);
  this.assetTypeForm.get("AssetTypeName")?.patchValue(this.AssetTypeEdit.assetTypeName);},500)
}

DelteAssetType(id : number,assetTypeName : any){
  this.displayDeleteConfirmation=true;
  console.log("Deleteid",id);
  this.DelteId=0;
  this.DeleteAssetType = null;
  this.DelteId=id;
  this.DeleteAssetType = assetTypeName;
  }

  yesDelete(){
    console.log(this.DelteId);
    console.log(this.DeleteAssetType)

    if(this.DelteId!=0){
      this.AssetTypeService.DeleteAssetType(this.DelteId).subscribe((res)=>{ 
       console.log("this.AssetTypeList",this.AssetTypeListTemp);
       this.getAssetType();
       this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type '+ this.DeleteAssetType +' Deleted'});
        });
      }
      this.displayDeleteConfirmation = false;
      setTimeout (() => {
        this.DelteId=0;
        this.DeleteAssetType=null},500);
  }

  noDelete(){
    console.log(this.DelteId);
    this.displayDeleteConfirmation = false;
  }
}
