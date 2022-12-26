import { NumberSymbol } from '@angular/common';
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

  getEmployees(){
    return this.httpClient.get<any>(this.Apiurl+'/Employee/GetEmployeeList',{
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

  EditEmployeeData(EmployeeForm:any){
    return this.httpClient.put<any>(this.Apiurl+'/Employee/EditEmployeeForm',EmployeeForm,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  getEmployeeEditDetial(id:number){
    return this.httpClient.get<any>(this.Apiurl+'/Employee/GetEditEmployee/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  DeleteEmployee(id: any){
    return this.httpClient.put<any>(this.Apiurl+'/Employee/DeleteEmployee/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }
}
