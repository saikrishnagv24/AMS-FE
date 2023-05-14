import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AddAssetsService } from 'src/app/Services/add-assets.service';
import { AssetTypeService } from 'src/app/Services/asset-type.service';
import { AssignAssetsService } from 'src/app/Services/assign-assets.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { FrequencyOfTestingService } from 'src/app/Services/frequency-of-testing.service';
import { LocationService } from 'src/app/Services/location.service';

@Component({
  selector: 'app-assign-assets',
  templateUrl: './assign-assets.component.html',
  styleUrls: ['./assign-assets.component.css']
})
export class AssignAssetsComponent implements OnInit {
  submitted: boolean = false;
  editAssignAssetDialog:boolean = false;
  assignAssetDialog: boolean = false;
  assignAssetForm!: FormGroup;
  AssetsData:any;
  employeeList: any;
  frequencyDetials: any;
  locationDetials: any;
  AssetType: any;
  AssetTypeDetails: any;
  employeeDetails: any;
  DepartmentList:any;
  AssignAssetEditData: any;
  AssingAssetGrid: any;
  DelteId:any;
  displayDeleteConfirmation:boolean=false;
  DeleteAssignAssetId:any;
  constructor(public formBuilder: FormBuilder, 
    private messageService: MessageService,
    public addAssetsService:AddAssetsService,
    public employeeService:EmployeeService,
    public frequencyOfTestingService: FrequencyOfTestingService,
    public AssetTypeServices:AssetTypeService,
    public locationService: LocationService,
    public departmentService:DepartmentService,
    public assignAssetsService:AssignAssetsService) { }

  ngOnInit(): void {
    this.assignAssetForm = this.formBuilder.group({
      Id:[''],
      AssetId : ['',Validators.required],
      AssetCost: ['',Validators.required],
      AssetTypeId: ['',Validators.required],
      EmployeeId: ['',Validators.required],
      EmployeeName:['', Validators.required],
      EmployeeDepartment:['', Validators.required],
      ContactNumber:['', Validators.required],
      IssuedDate:['', Validators.required],
      LocationId:['', Validators.required],
      FrequencyId:[''],
      Remark:['']  
   })
   this.getAssingAsset();
   this.getAssetsData(); 
   this.getEmployeeDetails();
   this.getFrequencyOfTesting();
   this.getAssetType();
   this.getLocation();
   this.getDepartment();
  }
  getAssingAsset(){
    this.assignAssetsService.GetAssingAssetGrid().subscribe((res)=>{ 
      this.AssingAssetGrid = res;
      console.log("this.GetAssingAssetGrid",this.AssingAssetGrid);
    });
  }

  getAssetsData(){
    this.addAssetsService.GetAssets().subscribe((res)=>{ 
      this.AssetsData = res;
      console.log("this.AddAssetData",this.AssetsData);
    });
  }

  getEmployeeDetails(){
    this.employeeService.getEmployees().subscribe((res) => {
      this.employeeList = res;
      console.log("this.employeeList",this.employeeList);
    });
  }

  getFrequencyOfTesting(){
    this.frequencyOfTestingService.GetFrequency().subscribe((res) => {
      this.frequencyDetials = res;
      console.log("this.frequencyGridDetials",this.frequencyDetials);
    });
  }

  getAssetType(){
    this.AssetTypeServices.GetAssetType().subscribe((res)=>{ 
      this.AssetType = res;
      console.log("this.AssetType",this.AssetType);
    });
  }

  getLocation() {
    this.locationService.GetLocation().subscribe((res) => {
      this.locationDetials = res;
      console.log("this.locationDetials",this.locationDetials);
    });
  }
  getDepartment(){
    this.departmentService.GetDepartment().subscribe((res)=>{ 
      this.DepartmentList = res;
      console.log("this.DepartmentList",this.DepartmentList);
    });
  }

  collectAssetDetails(id:any){
    this.assignAssetsService.CollectAsset(id).subscribe((res)=>{ 
      this.AssetTypeDetails = res;
      console.log("this.AssetTypeDetails",this.AssetTypeDetails);
      this.assignAssetForm.get("AssetCost")?.setValue(this.AssetTypeDetails.assetCost);
      this.assignAssetForm.get("AssetTypeId")?.patchValue(this.AssetTypeDetails.assetTypeId);
    });
  }

  collectEmployeeDetails(id:any){
    this.assignAssetsService.CollectEmployee(id).subscribe((res)=>{ 
      this.employeeDetails = res;
      console.log("this.employeeDetails",this.employeeDetails);
      this.assignAssetForm.get("EmployeeName")?.setValue(this.employeeDetails.name);
      this.assignAssetForm.get("EmployeeDepartment")?.patchValue(this.employeeDetails.departmentId);
      this.assignAssetForm.get("ContactNumber")?.patchValue(this.employeeDetails.phoneNumber);
      this.assignAssetForm.get("LocationId")?.patchValue(this.employeeDetails.locationId);
    });
  }

  openNew() {
    this.submitted = false;
    this.assignAssetDialog = true;
    this.assignAssetForm.reset();
  }

  hideDialog() {
    this.assignAssetDialog = false;
    this.submitted = false;
    this.assignAssetForm.reset();
    this.editAssignAssetDialog = false;
  }

  saveAssignAsset(){
    if(this.assignAssetForm.value.Id == undefined || this.assignAssetForm.value.Id==''){
      this.assignAssetForm.get("Id")?.setValue(0);
    }
    if(this.assignAssetForm.value.Id == 0){
      console.log("this.assignAssetForm",this.assignAssetForm.value);
    if(this.assignAssetForm.valid){
      this.assignAssetsService.AddAssignAssetForm(this.assignAssetForm.value).subscribe(res=>{ 
        this.getAssingAsset(); 
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Employee added'});
      });
  
    }
    this.assignAssetDialog = false;    
    }
    else{
      if(this.assignAssetForm.valid){
      this.assignAssetsService.EditAssingAssetData(this.assignAssetForm.value).subscribe((res)=>{ 
        this.getAssingAsset(); 
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Employee edited'});
      });
      this.editAssignAssetDialog = false; 
      }
      }
      this.assignAssetForm.reset();

  }

  EditAssignAsset(id:any){
    this.editAssignAssetDialog=true;
    this.assignAssetsService.getEditAssingAssetDetial(id).subscribe((res)=>{
      this.AssignAssetEditData = res
      console.log("this.AssignAssetEditData",this.AssignAssetEditData)
      this.assignAssetForm.get("Id")?.setValue(this.AssignAssetEditData.id);
      this.assignAssetForm.get("AssetId")?.setValue(this.AssignAssetEditData.assetdataid);
      this.assignAssetForm.get("AssetCost")?.setValue(this.AssignAssetEditData.assetCost);
      this.assignAssetForm.get("AssetTypeId")?.setValue(this.AssignAssetEditData.assetTypeId);
      this.assignAssetForm.get("EmployeeId")?.setValue(this.AssignAssetEditData.empId);
      this.assignAssetForm.get("EmployeeName")?.setValue(this.AssignAssetEditData.employeeName);
      this.assignAssetForm.get("EmployeeDepartment")?.setValue(this.AssignAssetEditData.employeeDepartmentId);
      this.assignAssetForm.get("ContactNumber")?.setValue(this.AssignAssetEditData.employeeContact);
      this.assignAssetForm.get("IssuedDate")?.setValue(this.AssignAssetEditData.issuedDate);
      this.assignAssetForm.get("LocationId")?.setValue(this.AssignAssetEditData.locationId);
      this.assignAssetForm.get("FrequencyId")?.setValue(this.AssignAssetEditData.frequencyId);
      this.assignAssetForm.get("Remark")?.setValue(this.AssignAssetEditData.remark);
     });

  }

  DeleteAssignAsset(id : any,assetID:any){
    this.displayDeleteConfirmation=true;
    console.log("Deleteid",id);
    this.DelteId=0;
    this.DeleteAssignAssetId = null;
    this.DelteId=id;
    this.DeleteAssignAssetId = assetID;

  }

  yesDelete(){
    console.log(this.DelteId);
    console.log(this.DeleteAssignAssetId)

    if(this.DelteId!=0){
      this.assignAssetsService.DeleteAssignAsset(this.DelteId).subscribe((res)=>{ 
       this.getAssingAsset();
       this.messageService.add({severity:'success', summary: 'Success', detail: 'Asset type '+ this.DeleteAssignAssetId +' Deleted'});
        });
      }
      this.displayDeleteConfirmation = false;
      setTimeout (() => {
        this.DelteId=0;
        this.DeleteAssignAssetId=null},500);
  }

  noDelete(){
    console.log(this.DelteId);
    this.displayDeleteConfirmation = false;
  }  

}

