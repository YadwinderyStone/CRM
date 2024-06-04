import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmailOutboxService {

  constructor(private http: HttpClient) { }


  getOutboxEmailList(emailParams): Observable<HttpResponse<any[]>> {
    const url = 'Email/GetOutboxEmailRecords'
    const customParams = new HttpParams()
    .set('PageSize', emailParams.pageSize.toString())
    .set('PageNumber', emailParams.PageNumber.toString())
    return this.http.get<any[]>(url, {
      params: customParams,
      observe: 'response',
    });

  }

  getEmailDetailById(id):Observable<HttpResponse<any[]>>{
    const url = 'Email/GetOutboxEmailRecordsById';
    const customParams = new HttpParams()
    .set('id', id)
    return this.http.get<any[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }
}