import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({   
  providedIn: 'root'
})
export class HarddiscTypeService {
  public Apiurl: any = environment.BaseURL;

  constructor(private httpClient:HttpClient) { }


  
  HarddiscTypePost(HarddiscFromDate: any){
    return this.httpClient.post<any>(this.Apiurl+'/Harddisc/HarddiscTypeForm',HarddiscFromDate,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });  
  }

  GetHarddiscType()
  {
    return this.httpClient.get<any>(this.Apiurl+'/Harddisc/GetHarddiscType',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  } 

   
  EditHarddiscType(EditHarddiscFromDate : any){
    return this.httpClient.put<any>(this.Apiurl+'/Harddisc/EditHarddiscTypeForm',EditHarddiscFromDate,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  DeleteHarddiscType(id: any){
    return this.httpClient.delete<any>(this.Apiurl+'/Harddisc/DeleteHarddiscType/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }


  GetEditHarddiscType (id: number){
      return this.httpClient.get<any>(this.Apiurl+'/Harddisc/GetEditHarddiscType/'+id,{
        headers:new HttpHeaders({
          "content-type":"application/json"
        })
      })
  }
  }

