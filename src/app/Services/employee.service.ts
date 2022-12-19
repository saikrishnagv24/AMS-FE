import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public Apiurl: any = environment.BaseURL;
  constructor(public httpClient:HttpClient) { }
  GetDepartment()
  {
    return this.httpClient.get<any>(this.Apiurl+'/Department/GetDepartment',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  GetLocation(){
    return this.httpClient.get<any>(this.Apiurl+'/Location/GetLoation',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  AddEmployee(EmplopyeeForm:any){
    return this.httpClient.post<any>(this.Apiurl+'/Employee/AddEmployeeForm',EmplopyeeForm,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });
  }

  EditEmployee(EmployeeForm:any){
    return this.httpClient.put<any>(this.Apiurl+'/Employee/EditEmployeeForm',EmployeeForm,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }
}
