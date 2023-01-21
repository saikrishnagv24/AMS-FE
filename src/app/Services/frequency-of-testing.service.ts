import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FrequencyOfTestingService {
  public Apiurl: any = environment.BaseURL;
  constructor(private httpClient:HttpClient) { }

  FrequencyPost(FrequencyFormData:any){
    return this.httpClient.post<any>(this.Apiurl+'/FrequencyOfTesting/AddFrequencyTypeForm',FrequencyFormData,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    }); 
  }

  GetFrequency(){
    return this.httpClient.get<any>(this.Apiurl+'/FrequencyOfTesting/GetFrequencyType',{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }
  GetEditFreqOftest(id: any){
    return this.httpClient.get<any>(this.Apiurl+'/FrequencyOfTesting/GetEditFrequency/'+id,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }
  EditFrequencyOfTestingForm(editFrequencyFormData : any){
    return this.httpClient.put<any>(this.Apiurl+'/FrequencyOfTesting/EditFrequencyForm',editFrequencyFormData,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })
  }

  DeleteFrequency(freqid:any){
    return this.httpClient.put<any>(this.Apiurl+'/FrequencyOfTesting/DeleteFrequencyOfType/'+freqid,{
      headers:new HttpHeaders({
        "content-type":"application/json"
      })
    })

  }

}
