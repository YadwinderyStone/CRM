import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailInboxService {

  constructor(private http: HttpClient) { }


getInboxEmailList(emailParams):Observable<HttpResponse<any[]>>{
  const url = 'Email/GetEmailRecords';
  const customParams = new HttpParams()
.set('PageSize', emailParams.pageSize.toString())
.set('PageNumber', emailParams.PageNumber.toString())
return this.http.get<any[]>(url, {
  params: customParams,
  observe: 'response',
});

}


getEmailDetailById(id):Observable<HttpResponse<any[]>>{
  const url = 'Email/GetEmailRecordsById';
  const customParams = new HttpParams()
  .set('id', id)
  return this.http.get<any[]>(url, {
    params: customParams,
    observe: 'response',
  });
}



}
