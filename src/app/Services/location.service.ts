import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient:HttpClient) { }
  public Apiurl: any = environment.BaseURL;
  locationPost(locationFormData : any){
    return this.httpClient.post<any>(this.Apiurl+'/Location/AddLoctionForm',locationFormData,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    });
  }

  EditLocationForm(editLocationFormData : any){
    return this.httpClient.put<any>(this.Apiurl+'/Location/EditLocationForm',editLocationFormData,{
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

  GetEditLocation(id: any){
    return this.httpClient.get<any>(this.Apiurl+'/Location/GetEditLocation/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  DeleteLocation(id: any){
    return this.httpClient.delete<any>(this.Apiurl+'/Location/DeleteLocation/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }
}
