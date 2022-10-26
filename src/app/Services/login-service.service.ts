import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient:HttpClient) { }
  public Apiurl: any = environment.BaseURL;
  login(Loginform : any){
    return this.httpClient.post<any>(this.Apiurl+'/Login/LoginData',Loginform,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });
  }
}
