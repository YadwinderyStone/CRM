import { Injectable } from '@angular/core';
import { Inventory } from '@core/domain-classes/inventory';
import { InventoryResourceParameter } from '@core/domain-classes/inventory-resource-parameter';
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
.set('Skip', emailParams.skip.toString())
return this.http.get<any[]>(url, {
  // params: customParams,
  observe: 'response',
});

}


getEmailDetailById(id):Observable<HttpResponse<any[]>>{
  const url = 'Interaction';
  const customParams = new HttpParams()
  .set('Id', id)
  return this.http.get<any[]>(url, {
    params: customParams,
    observe: 'response',
  });
}



}
