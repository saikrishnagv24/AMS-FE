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
  }
    
  
  GetAssetType()
    {
      return this.httpClient.get<any>(this.Apiurl+'/AssetType/GetAssetType',{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    EditAssetType(EditAssetFromDate : any){
      return this.httpClient.put<any>(this.Apiurl+'/AssetType/EditAssetTypeForm',EditAssetFromDate,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    DeleteAssetType(id: any){
      return this.httpClient.delete<any>(this.Apiurl+'/AssetType/DeleteAssetType/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    GetEditAssetType(id: number){
      return this.httpClient.get<any>(this.Apiurl+'/AssetType/GetEditAssetType/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }
  
}

