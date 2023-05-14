import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FrequencyOfTestingService } from '../Services/frequency-of-testing.service';
@Component({
  selector: 'app-frequency-of-testing',
  templateUrl: './frequency-of-testing.component.html',
  styleUrls: ['./frequency-of-testing.component.css']
})
export class FrequencyOfTestingComponent implements OnInit {
  FrequencyOfTestingDialog:boolean = false;
  FrequencyOfTestingForm!: FormGroup;
  FrequencyOfTestingEditDialog:boolean = false;
  displayDeleteConfirmation:boolean = false;
  dleteFrequencyOfTesting:any;
  DelteId!:number;
  frequencyGridDetials:any;
  FrequencyOfTestingEdit:any;

  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public frequencyOfTestingService: FrequencyOfTestingService) { }

  ngOnInit(): void {
    this.FrequencyOfTestingForm=this.formBuilder.group({
      Id: [''],
      FrequencyTesting: ['', Validators.required]
    })
    this.getFrequencyOfTesting();
  }

  saveFrequencyType() {
    if (this.FrequencyOfTestingForm.value.Id == undefined || this.FrequencyOfTestingForm.value.Id == '') {
      this.FrequencyOfTestingForm.get("Id")?.setValue(0);
    }
    if (this.FrequencyOfTestingForm.value.Id == 0) {
      if (this.FrequencyOfTestingForm.valid) {
        this.frequencyOfTestingService.FrequencyPost(this.FrequencyOfTestingForm.value).subscribe(res => {
          this.getFrequencyOfTesting();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Frequency of testing added' });
        });

      }
      this.FrequencyOfTestingDialog = false;
    }
    else {
      if (this.FrequencyOfTestingForm.valid) {
        this.frequencyOfTestingService.EditFrequencyOfTestingForm(this.FrequencyOfTestingForm.value).subscribe((res) => {
          
          this.getFrequencyOfTesting();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Frequency of testing edited' });
        });
        this.FrequencyOfTestingEditDialog = false;
      }
    }
    this.FrequencyOfTestingForm.reset();
  }


  getFrequencyOfTesting(){
    this.frequencyOfTestingService.GetFrequency().subscribe((res) => {
      this.frequencyGridDetials = res;
      console.log("this.frequencyGridDetials",this.frequencyGridDetials);
    });
  }

  openNew() {
    this.FrequencyOfTestingDialog = true;
    this.FrequencyOfTestingForm.reset();
  }

  hideDialog() {
    this.FrequencyOfTestingDialog = false;
    this.FrequencyOfTestingEditDialog = false;
    this.FrequencyOfTestingForm.reset();
  }

  yesDelete() {
    if (this.DelteId != 0) {
      this.frequencyOfTestingService.DeleteFrequency(this.DelteId).subscribe((res) => {
        this.getFrequencyOfTesting();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset type ' + this.dleteFrequencyOfTesting + ' Deleted' });
      });
    }
    this.displayDeleteConfirmation = false;
    setTimeout(() => {
      this.DelteId = 0;
      this.dleteFrequencyOfTesting = null
    }, 500);
  }
  EditFrequency(FrequencyId : number){
    this.FrequencyOfTestingEditDialog = true;
    this.frequencyOfTestingService.GetEditFreqOftest(FrequencyId).subscribe((res) => {
      this.FrequencyOfTestingEdit = res;
      this.FrequencyOfTestingForm.get("Id")?.patchValue(this.FrequencyOfTestingEdit.id);
      this.FrequencyOfTestingForm.get("FrequencyTesting")?.patchValue(this.FrequencyOfTestingEdit.frequencyTesting);
    });

  }
  DelteFrequency(FrequencyId : number, FrequencyType: any){
    this.displayDeleteConfirmation = true;
    console.log("Deleteid", FrequencyId);
    this.DelteId = 0;
    this.dleteFrequencyOfTesting = null;
    this.DelteId = FrequencyId;
    this.dleteFrequencyOfTesting = FrequencyType;
  }

  noDelete() {
    console.log(this.DelteId);
    this.displayDeleteConfirmation = false;
  }


}
