import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

  submitted!: boolean;

  assetTypeForm!: FormGroup;

  // public AssetTypeList:type[] = [];
    
  constructor(public formBuilder: FormBuilder, public AssetTypeService:AssetTypeService) { }

  ngOnInit(): void {

    this.assetTypeForm = this.formBuilder.group({
      AssetTypeName : ['',Validators.required]
   })

  //  this.getAssetType();

  }
  
  openNew() {
   
    this.submitted = false;
    this.assetDialog = true;
  }

  hideDialog() {
    this.assetDialog = false;
    this.submitted = false;
}

saveAsset(){
  this.submitted=true;
  console.log("hi")
  if(this.assetTypeForm.valid){
    console.log("this.assetTypeForm",this.assetTypeForm.value);
    this.AssetTypeService.AssetTypePost(this.assetTypeForm.value).subscribe(res=>{  
    });

  }
}


// getAssetType(){
//   this.AssetTypeService.GetAssetType().subscribe(res=>{ 
//     console.log("result",res); 
//     this.AssetTypeList = res;
//     console.log("this.AssetTypeList",this.AssetTypeList);
//   });
//  // console.log("this.AssetTypeList",this.AssetTypeList);
// }

}
