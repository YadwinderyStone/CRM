import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { emailStatusModel } from './status.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }


getEmailStatus():any{
  const url = `Report/GetInteraction185ReportFourList`;
  return this.http.get<emailStatusModel[]>(url, {
    observe: 'response',
  });
}



}
