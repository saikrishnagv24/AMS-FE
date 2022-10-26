import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder ,Validators} from "@angular/forms";
import { RegisterServiceService } from '../Services/register-service.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public RegisterForm:FormGroup;
  constructor(fb:FormBuilder,public RegService : RegisterServiceService) {
   this.RegisterForm=fb.group({
    name:[null , Validators.required],
    phoneName:[null , Validators.required],
    email:[null , Validators.required],
    password:[null , Validators.required],
    confirmPassword:[null , Validators.required]
    })
   }

  ngOnInit(): void {
  }

  Submit(){
    console.log("this.RegisterForm",this.RegisterForm.value);
    this.RegService.RegisterPost(this.RegisterForm.value).subscribe(res=>{  
    });
  }

}
