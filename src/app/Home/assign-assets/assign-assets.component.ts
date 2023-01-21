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
  AssetsData1:any;
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
      AssetType: ['',Validators.required],
      EmployeeId: ['',Validators.required],
      EmployeeName:['', Validators.required],
      EmployeeDepartment:['', Validators.required],
      ContactNumber:['', Validators.required],
      AssignDate:['', Validators.required],
      Location:['', Validators.required],
      Frequency:[''],
      Remark:['']  
   })

   this.getAssetsData(); 
   this.getEmployeeDetails();
   this.getFrequencyOfTesting();
   this.getAssetType();
   this.getLocation();
   this.getDepartment();
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
      this.assignAssetForm.get("AssetType")?.patchValue(this.AssetTypeDetails.assetTypeId);
    });
  }

  collectEmployeeDetails(id:any){
    this.assignAssetsService.CollectEmployee(id).subscribe((res)=>{ 
      this.employeeDetails = res;
      console.log("this.employeeDetails",this.employeeDetails);
      this.assignAssetForm.get("EmployeeName")?.setValue(this.employeeDetails.name);
      this.assignAssetForm.get("EmployeeDepartment")?.patchValue(this.employeeDetails.departmentId);
      this.assignAssetForm.get("ContactNumber")?.patchValue(this.employeeDetails.phoneNumber);
      this.assignAssetForm.get("Location")?.patchValue(this.employeeDetails.locationId);
    });
  }

  openNew() {
    this.submitted = false;
    this.assignAssetDialog = true;
  }

  hideDialog() {
    this.assignAssetDialog = false;
    this.submitted = false;
    this.assignAssetForm.reset();
  }

  saveAssignAsset(){

  }
}

