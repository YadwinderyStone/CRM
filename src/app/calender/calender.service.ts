import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCalenderList(){
    const url = `Calender`;
    return this.httpClient.get<any[]>(url); 
}
  getCalenderDetailById(id){
    const url = `Calender/${id}`;
    return this.httpClient.get<any[]>(url); 
}
  addCalenderEvent(data){
    const url = `Calender`;
    return this.httpClient.post<any[]>(url,data); 
}
  editCalenderEvent(data,id){
    const url = `Calender/${id}`;
    return this.httpClient.put<any[]>(url,data); 
}
  deleteCalenderEvent(id){
    const url = `Calender/${id}`;
    return this.httpClient.delete<any[]>(url); 
}

}

