import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(public httpClient:HttpClient) { }

  public Apiurl: any = environment.BaseURL;

  DepartmentPost(DepartmentFromDate: any){
    return this.httpClient.post<any>(this.Apiurl+'/Department/DepartmentForm',DepartmentFromDate,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });  
  }
    
  
  GetDepartment()
    {
      return this.httpClient.get<any>(this.Apiurl+'/Department/GetDepartment',{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    EditDepartment(EditDepartmentFromDate : any){
      return this.httpClient.put<any>(this.Apiurl+'/Department/GetDepartment',EditDepartmentFromDate,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    DeleteDepartment(id: any){
      return this.httpClient.delete<any>(this.Apiurl+'​/Department​/DeleteDepartment/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }

    GetEditDepartment(id: number){
      return this.httpClient.get<any>(this.Apiurl+'/Department/GetEditDepartment/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
    }
}
