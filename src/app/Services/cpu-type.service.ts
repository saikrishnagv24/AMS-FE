import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CpuTypeService {

  constructor(private httpClient:HttpClient) { }

  public Apiurl: any = environment.BaseURL;

  CpuTypePost(CpuFromDate: any){
    return this.httpClient.post<any>(this.Apiurl+'/CpuType/CpuTypeForm',CpuFromDate,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });  
  }
    
  
  GetCpuType()
    {
      return this.httpClient.get<any>(this.Apiurl+'/CpuType/GetCpuType',{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    EditCpuType(EditCpuFromDate : any){
      return this.httpClient.put<any>(this.Apiurl+'/CpuType/EditCpuTypeForm',EditCpuFromDate,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    DeleteCpuType(id: any){
      return this.httpClient.delete<any>(this.Apiurl+'/CpuType/DeleteCpuType/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    GetEditCpuType(id: number){
      return this.httpClient.get<any>(this.Apiurl+'/CpuType/GetEditCpuType/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }
}
