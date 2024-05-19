import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  
    constructor(
      private httpClient: HttpClient,
    ) { }
  
    getCalendarList(){
      const url = `Calendar`;
      return this.httpClient.get<any[]>(url); 
  }
    getCalendarDetailById(id){
      const url = `Calendar/${id}`;
      return this.httpClient.get<any[]>(url); 
  }
    addCalendarEvent(data){
      const url = `Calendar`;
      return this.httpClient.post<any[]>(url,data); 
  }
    editCalendarEvent(data,id){
      const url = `Calendar/${id}`;
      return this.httpClient.put<any[]>(url,data); 
  }
    deleteCalendarEvent(id){
      const url = `Calendar/${id}`;
      return this.httpClient.delete<any[]>(url); 
  }
  
  }
  
  
