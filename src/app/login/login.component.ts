import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder ,Validators} from "@angular/forms";
import { LoginServiceService } from '../Services/login-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public Loginform:FormGroup;
  decodedToken:any;
  helper = new JwtHelperService();
  userid: any;
  passwordDecoded: any;

  constructor(fb:FormBuilder,public LoginService : LoginServiceService, private route:Router) {
    this.Loginform = fb.group({
      name:[null , Validators.required],
      password:[null , Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onLogin(){
    console.log("this.Loginform",this.Loginform.value);
    this.LoginService.login(this.Loginform.value).subscribe(res=>{
      console.log("token result",res);
        this.decodedToken = this.helper.decodeToken(res.token);
        console.log("decoded",this.decodedToken)
        this.passwordDecoded = this.decodedToken.password;
        console.log("this.passwordDecoded",this.passwordDecoded);
        this.userid=this.decodedToken.nameid;
        console.log("userid",this.userid);      
        localStorage.setItem("userID",this.userid);
        localStorage.setItem('token',res.token);
        //this.route.navigate(['home']) 
        if (this.decodedToken.unique_name == this.Loginform.value.name)
           {
           this.route.navigate(['Home']);
          } 
    });
  }

}
