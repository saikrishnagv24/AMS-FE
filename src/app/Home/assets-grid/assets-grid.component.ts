import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppModule } from 'src/app/app.module';
import { AddAssetsService } from 'src/app/Services/add-assets.service';

@Component({
  selector: 'app-assets-grid',
  templateUrl: './assets-grid.component.html',
  styleUrls: ['./assets-grid.component.css']
})
export class AssetsGridComponent implements OnInit {
  AddAssetDialog: boolean =false;
  submitted: boolean = false;
  minDate!: Date;
  maxDate!: Date;
  AssetTypeDropDown:any;
  AddAssetForm!: FormGroup;
  AssetsData:any;
  CpuTypeDropDown:any;
  HddDropDown:any;
  RamDropDown:any;
  DelteId!:number;
  DeleteAddAsset:any;
  displayDeleteConfirmation:boolean=false;
  EditAssetDialog:boolean=false;
  AssetEditData:any;
  constructor(public formBuilder: FormBuilder,public addAssetsService:AddAssetsService,private messageService: MessageService,) { }

  ngOnInit(): void {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);


    this.AddAssetForm = this.formBuilder.group({
      Id:[''],
      AssetId : ['',Validators.required],
      AssetCost : ['',Validators.required],
      AssetTypeId : ['',Validators.required],
      CpuId : ['',Validators.required],
      HddId : ['',Validators.required],
      RamId : ['',Validators.required],
      AssetPurchaseDate : ['',Validators.required],
      Remark : ['']
   })

   this.getAssetTypeDropDown();
   this.getAssetsData(); 
   this.getCpuTypeDropDown(); 
   this.getHddTypeDropDown();
   this.getRamTypeDropDowm();
  }

  getAssetsData(){
    this.addAssetsService.GetAssets().subscribe((res)=>{ 
      this.AssetsData = res;
      console.log("this.AddAssetData",this.AssetsData);
    });
  }

  getAssetTypeDropDown(){
    this.addAssetsService.GetAssetTypeDropDown().subscribe((res)=>{ 
      this.AssetTypeDropDown = res;
      console.log("this.AssetTypeList",this.AssetTypeDropDown);
    });
  }
  getCpuTypeDropDown(){
    this.addAssetsService.GetCpuTypeDropDown().subscribe((res)=>{ 
      this.CpuTypeDropDown = res;
      console.log("this.CpuTypeDropDown",this.CpuTypeDropDown);
    });
  }

  getHddTypeDropDown(){
    this.addAssetsService.GetHddTypeDropDown().subscribe((res)=>{ 
      this.HddDropDown = res;
      console.log("this.HddDropDown",this.HddDropDown);
    });
  }

  getRamTypeDropDowm(){
    this.addAssetsService.GetRamTypeDropDown().subscribe((res)=>{ 
      this.RamDropDown = res;
      console.log("this.RamDropDown",this.RamDropDown);
    });
  }

  saveAddAsset(){
    if(this.AddAssetForm.value.Id == undefined || this.AddAssetForm.value.Id==''){
      this.AddAssetForm.get("Id")?.setValue(0);
    }
    if(this.AddAssetForm.value.Id == 0){
      console.log("this.AddAssetForm",this.AddAssetForm.value);
    if(this.AddAssetForm.valid){
      this.addAssetsService.AddAssetForm(this.AddAssetForm.value).subscribe(res=>{ 
       this.getAssetsData(); 
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Employee added'});
      });
  
    }
    this.AddAssetDialog = false;    
    }
    else{
    if(this.AddAssetForm.valid){
    this.addAssetsService.EditAddAssetData(this.AddAssetForm.value).subscribe((res)=>{ 
      this.getAssetsData();
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Employee edited'});
    });
    this.EditAssetDialog = false; 
    }
    }
    this.AddAssetForm.reset();
  }
  EditAddAsset(id : number){
    this.EditAssetDialog=true;
    this.addAssetsService.getAssetEditDetial(id).subscribe((res)=>{
      this.AssetEditData = res
      console.log("this.AssetEditData",this.AssetEditData)
      this.AddAssetForm.get("Id")?.patchValue(this.AssetEditData.id);
      this.AddAssetForm.get("AssetId")?.patchValue(this.AssetEditData.assetId);
      this.AddAssetForm.get("AssetCost")?.patchValue(this.AssetEditData.assetCost);
      this.AddAssetForm.get("AssetTypeId")?.patchValue(this.AssetEditData.assetTypeId);
      this.AddAssetForm.get("CpuId")?.patchValue(this.AssetEditData.cpuId);
      this.AddAssetForm.get("HddId")?.patchValue(this.AssetEditData.hddId);
      this.AddAssetForm.get("RamId")?.patchValue(this.AssetEditData.ramId);
      this.AddAssetForm.get("AssetPurchaseDate")?.patchValue(this.AssetEditData.assetPurchaseDate);
      this.AddAssetForm.get("Remark")?.patchValue(this.AssetEditData.remark);
     });

  }

  DelteAssetType(id : number,assetName : any){
    this.displayDeleteConfirmation=true;
    console.log("Deleteid",id);
    this.DelteId=0;
    this.DeleteAddAsset = null;
    this.DelteId=id;
    this.DeleteAddAsset = assetName;
    }
  
    yesDelete(){
      console.log(this.DelteId);
      console.log(this.DeleteAddAsset)
  
      if(this.DelteId!=0){
        this.addAssetsService.DeleteAsset(this.DelteId).subscribe((res)=>{ 
         this.getAssetsData();
         this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type '+ this.DeleteAddAsset +' Deleted'});
          });
        }
        this.displayDeleteConfirmation = false;
        setTimeout (() => {
          this.DelteId=0;
          this.DeleteAddAsset=null},500);
    }
  
    noDelete(){
      console.log(this.DelteId);
      this.displayDeleteConfirmation = false;
    }  

  openNew() {
    this.submitted = false;
    this.AddAssetDialog = true;
  } 
  hideDialog() {
    this.AddAssetDialog = false;
    this.submitted = false;
  } 

}
