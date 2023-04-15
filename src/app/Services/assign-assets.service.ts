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

  AddAssignAssetForm(assignAssetForm:any){
    return this.httpClient.post<any>(this.Apiurl+'/AssignAsset/AssignAssetFrom',assignAssetForm,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    }); 

  }

  GetAssingAssetGrid(){
    return this.httpClient.get<any>(this.Apiurl+'/AssignAsset/GetAssingAssetGrid',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  getEditAssingAssetDetial(id : any){
    return this.httpClient.get<any>(this.Apiurl+'/AssignAsset/GetEditAssignAsset/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  EditAssingAssetData(editAssignAssetForm : any){
    return this.httpClient.put<any>(this.Apiurl+'/AssignAsset/EditAssignAssetForm',editAssignAssetForm,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  DeleteAssignAsset(id: any){
    return this.httpClient.put<any>(this.Apiurl+'/AssignAsset/DeleteAssignAssetForm/' + id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }
}

