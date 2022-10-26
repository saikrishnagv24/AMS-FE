import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private httpClient:HttpClient) { 

  }
  public Apiurl: any = environment.BaseURL;

  RegisterPost(RegisterFromDate: any){
    return this.httpClient.post<any>(this.Apiurl+'/Register/RegiseterForm',RegisterFromDate,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });
  }
}
