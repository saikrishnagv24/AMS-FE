import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LocationService } from '../Services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locationForm!: FormGroup;
  locationDialog: boolean = false;
  locationEditDialog: boolean = false;
  editedLocationTemp: any;
  locationGridDetials: any;
  loctionEdit: any;
  DelteId!:number;
  displayDeleteConfirmation:boolean=false;
  DeleteLocaiton:any;
  constructor(public formBuilder: FormBuilder, private messageService: MessageService, public locationService: LocationService) { }

  ngOnInit(): void {
    this.locationForm = this.formBuilder.group({
      Id: [''],
      Location: ['', Validators.required]
    })
    this.getLocation();
  }

  openNew() {
    this.locationDialog = true;
  }

  hideDialog() {
    this.locationDialog = true;
  }

  saveLocation() {
    console.log("this.locationForm.value", this.locationForm.value);

    if (this.locationForm.value.Id == undefined || this.locationForm.value.Id == '') {
      this.locationForm.get("Id")?.setValue(0);
    }
    if (this.locationForm.value.Id == 0) {
      console.log("this.locationForm.value2222", this.locationForm.value);
      if (this.locationForm.valid) {
        this.locationService.locationPost(this.locationForm.value).subscribe(res => {
          this.getLocation();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location added' });
        });

      }
      this.locationDialog = false;
    }
    else {
      if (this.locationForm.valid) {
        this.locationService.EditLocationForm(this.locationForm.value).subscribe((res) => {
          this.editedLocationTemp = res;
          this.getLocation();
          console.log("this.AssetTypeList", this.editedLocationTemp);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset type edited' });
        });
        this.locationEditDialog = false;
      }
    }
    this.locationForm.reset();
  }

  getLocation() {
    this.locationService.GetLocation().subscribe((res) => {
      this.locationGridDetials = res;
      console.log("this.AssetTypeList", this.locationGridDetials);
    });
  }

  EditAssetType(id: any,) {
    this.locationEditDialog = true;
    console.log("dadad", id);
    this.locationService.GetEditLocation(id).subscribe((res) => {
      this.loctionEdit = res;
      console.log("this.AssetTypeEditTemp", this.loctionEdit)
      this.locationForm.get("Id")?.patchValue(this.loctionEdit.id);
      this.locationForm.get("AssetTypeName")?.patchValue(this.loctionEdit.assetTypeName);
    });
  }

  DelteAssetType(id: number, assetTypeName: any) {
    this.displayDeleteConfirmation = true;
    console.log("Deleteid", id);
    this.DelteId = 0;
    this.DeleteLocaiton = null;
    this.DelteId = id;
    this.DeleteLocaiton = assetTypeName;
  }

  yesDelete() {
    if (this.DelteId != 0) {
      this.locationService.DeleteLocation(this.DelteId).subscribe((res) => {
        this.getLocation();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset type ' + this.DeleteLocaiton + ' Deleted' });
      });
    }
    this.displayDeleteConfirmation = false;
    setTimeout(() => {
      this.DelteId = 0;
      this.DeleteLocaiton = null
    }, 500);
  }

  noDelete() {
    console.log(this.DelteId);
    this.displayDeleteConfirmation = false;
  }

}
