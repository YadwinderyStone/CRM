import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentEmailService {



  constructor(private http: HttpClient) { }


  getSentEmailList(emailParams): Observable<HttpResponse<any[]>> {
    // FIXME : need to change end point for this
    const url = 'Email/GetEmailRecords';
    const customParams = new HttpParams()
      .set('PageSize', emailParams.pageSize.toString())
      .set('PageNumber', emailParams.PageNumber.toString())
    return this.http.get<any[]>(url, {
      params: customParams,
      observe: 'response',
    });

  }


  getSentEmailDetailById(id): Observable<HttpResponse<any[]>> {
    const url = 'Email/GetEmailRecordsById';
    const customParams = new HttpParams()
      .set('id', id)
    return this.http.get<any[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }



}
