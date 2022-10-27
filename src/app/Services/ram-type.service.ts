import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RamTypeService {

  constructor(private httpClient:HttpClient) { }
  public Apiurl: any = environment.BaseURL;

  RamTypePost(RamFromDate: any){
    return this.httpClient.post<any>(this.Apiurl+'/RamType/RamTypeForm',RamFromDate,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });  
  }
    
  
  GetRamType()
    {
      return this.httpClient.get<any>(this.Apiurl+'/RamType/GetRamType',{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    EditRamType(EditRamFromDate : any){
      return this.httpClient.put<any>(this.Apiurl+'/RamType/EditRamTypeForm',EditRamFromDate,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    DeleteRamType(id: any){
      return this.httpClient.delete<any>(this.Apiurl+'/RamType/DeleteRAMType/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    GetEditRamType(id: number){
      return this.httpClient.get<any>(this.Apiurl+'/RamType/GetEditRamType/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }
}
