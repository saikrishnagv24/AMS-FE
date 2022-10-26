import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetTypeService {

  constructor(private httpClient:HttpClient) { 

  }
  public Apiurl: any = environment.BaseURL;

  AssetTypePost(AssetFromDate: any){
    return this.httpClient.post<any>(this.Apiurl+'/AssetType/AssetTypeForm',AssetFromDate,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });
  
  // AssetTypeGet(){

    
  // }

  }
}


