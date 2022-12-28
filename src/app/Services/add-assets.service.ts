import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddAssetsService {

  constructor(private httpClient:HttpClient) { }
  public Apiurl: any = environment.BaseURL;
  GetAssetTypeDropDown(){
    return this.httpClient.get<any>(this.Apiurl+'/AssetType/GetAssetType',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  GetAssets(){
    return this.httpClient.get<any>(this.Apiurl+'/AddAsset/GetAddAsset',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  AddAssetForm(AddAssetForm:any){
    return this.httpClient.post<any>(this.Apiurl+'/AddAsset/AddAssetForm',AddAssetForm,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    }); 
  }

  GetCpuTypeDropDown(){
    return this.httpClient.get<any>(this.Apiurl+'/CpuType/GetCpuType',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  GetHddTypeDropDown(){
    return this.httpClient.get<any>(this.Apiurl+'/Harddisc/GetHarddiscType',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  GetRamTypeDropDown(){
    return this.httpClient.get<any>(this.Apiurl+'/RamType/GetRamType',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  getAssetEditDetial(id: number){
    return this.httpClient.get<any>(this.Apiurl+'/AddAsset/GetEditAsset/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  EditAddAssetData(AddAssetForm:any){
    return this.httpClient.put<any>(this.Apiurl+'/AddAsset/EditAddAssetForm',AddAssetForm,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  DeleteAsset(id: number){
    return this.httpClient.put<any>(this.Apiurl+'/AddAsset/DeleteAddAsset/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }
}
