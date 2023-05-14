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
      id: [''],
      locationName: ['', Validators.required]
    })
    this.getLocation();
  }

  openNew() {
    this.locationForm.reset();
    this.locationDialog = true;
  }

  hideDialog() {
    this.locationForm.reset();
    this.locationDialog = false;
    this.locationEditDialog = false;
  }

  saveLocation() {
    if (this.locationForm.value.id == undefined || this.locationForm.value.id == '') {
      this.locationForm.get("id")?.setValue(0);
    }
    if (this.locationForm.value.id == 0) {
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location edited' });
        });
        this.locationEditDialog = false;
      }
    }
    this.locationForm.reset();
  }

  getLocation() {
    this.locationService.GetLocation().subscribe((res) => {
      this.locationGridDetials = res;
    });
  }

  EditLocation(id: any,) {
    this.locationEditDialog = true;
    this.locationService.GetEditLocation(id).subscribe((res) => {
      this.loctionEdit = res;
      this.locationForm.get("id")?.patchValue(this.loctionEdit.id);
      this.locationForm.get("locationName")?.patchValue(this.loctionEdit.locationName);
    });
  }

  DelteLocation(id: number, assetTypeName: any) {
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
