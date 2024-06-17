import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { emailStatusModel } from './status.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }


getEmailStatus():any{
  const url = `Dashboard/GetDashboardApplicationStatusList`;
  return this.http.get<emailStatusModel[]>(url, {
    observe: 'response',
  });
}



}
