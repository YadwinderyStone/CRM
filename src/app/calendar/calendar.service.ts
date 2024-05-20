import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CalendarList } from './calendar.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  
    constructor(
      private httpClient: HttpClient,
    ) { }
  
    getCalendarList(data){
      const url = `Report/getCalenderMasterDataByYear?year=${data}`;
      return this.httpClient.get<CalendarList[]>(url); 
  }
    getCalendarDetailById(id){
      const url = `Calendar/${id}`;
      return this.httpClient.get<CalendarList[]>(url); 
  }
    addCalendarEvent(data){
      const url = `Calendar`;
      return this.httpClient.post<CalendarList>(url,data); 
  }
    editCalendarEvent(data){
      const url = `Report/UpdateCalenderMasterReport`;
      return this.httpClient.put<CalendarList>(url,data); 
  }
    deleteCalendarEvent(id){
      const url = `Calendar/${id}`;
      return this.httpClient.delete<CalendarList>(url); 
  }
  
  }
  
  
