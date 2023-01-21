import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AssignAssetsService {

  constructor(private httpClient:HttpClient) { }
  public Apiurl: any = environment.BaseURL;

  CollectAsset(id:number){
    return this.httpClient.get<any>(this.Apiurl+'/AssignAsset/CollectAsset/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  CollectEmployee(id:number){
    return this.httpClient.get<any>(this.Apiurl+'/AssignAsset/CollectEmployee/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }
}
