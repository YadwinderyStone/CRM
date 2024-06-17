import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

}
