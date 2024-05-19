import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InteractionCategory, InteractionStatus } from '@core/domain-classes/interactionCatetgory';
import { Inventory } from '@core/domain-classes/inventory';
import { Queue } from '@core/domain-classes/queue.model';

@Injectable({
  providedIn: 'root'
})
export class InteractionReportsService {

  constructor(private http: HttpClient) { }

  getInteractionsList(params) {
    let param:any = `Skip=${params?.skip.toString()}`
    param+=`&PageSize=${params?.pageSize.toString()}`
    param+=`&IsAdmin=${params?.IsAdmin}`
    if(params?.toDate) param+=`&toDate=${params?.toDate}`
    if(params?.fromDate) param+=`&fromDate=${params?.fromDate}`
    if(params?.search) param+=`&TransactionNumber=${params?.search}`
    if(params?.type) param+=`&TicketType=${params?.type}`
    if(params?.team) param+=`&TeamId=${params?.team}`
    if(params?.status) param+=`&StatusName=${params?.status}`
    const url = `Interaction?${param}`;
    return this.http.get<Inventory[]>(url, {
      observe: 'response',
    });
  }



 
  getTeamsList() { //team list for dropdown
    const url = 'Queues';
    return this.http.get<Queue[]>(url);
  }
   getstatusList() { //status list for dropdown
    const url = `Status`;
    return this.http.get<InteractionStatus[]>(url);
  }
  getsubStatusList(id: string) { //Sub status list for dropdown
    const customParams = new HttpParams()
      .set('parentId', id)
    const url = `Status`
    return this.http.get<InteractionStatus[]>(url, {
      params: customParams
    });
  }

  getCategoryList() { //category list for dropdown
    const url = `Categories/list/0`;
    return this.http.get<InteractionCategory[]>(url);
  }

  getSubCategoryList(id: string) {
    const url = `Categories/list/${id}`;
    return this.http.get<InteractionCategory[]>(url);
  }

  getInteractionsDumpReports(params){
    let param:any = `FromDate=${params?.fromDate}`
    // param = `Skip=${params?.skip.toString()}`
    // param+=`&PageSize=${params?.pageSize.toString()}`
    // param+=`&IsAdmin=${params?.IsAdmin}`
    if(params?.toDate) param+=`&ToDate=${params?.toDate}`
    // if(params?.fromDate) param+=`&FromDate=${params?.fromDate}`
    const url = `Report/GetInteractionMonthRowReportList?${param}`;
    // const url = `Report/GetInteractionReportList?FromDate=2024-05-15&ToDate=2024-05-19`;
    return this.http.get<any[]>(url, {
      observe: 'response',
    });
  }
  getInteractionsReportsList(params){
    let param:any = `FromDate=${params?.fromDate}`
    // param+=`&PageSize=${params?.pageSize.toString()}`
    // param+=`&IsAdmin=${params?.IsAdmin}`
    if(params?.toDate) param+=`&ToDate=${params?.toDate}`
    // if(params?.fromDate) param+=`&FromDate=${params?.fromDate}`
    if(params?.search) param+=`&TransactionNumber=${params?.search}`
    if(params?.type) param+=`&TicketType=${params?.type}`
    if(params?.team) param+=`&TeamId=${params?.team}`
    if(params?.status) param+=`&StatusName=${params?.status}`
    const url = `Report/GetInteractionReportList?${param}`;
    // const url = `Report/GetInteractionReportList?FromDate=2024-05-15&ToDate=2024-05-19`;
    return this.http.get<any[]>(url, {
      observe: 'response',
    });
  }
  
  get187InteractionsReportsList(params){
    let param:any = `ToDate=${params?.toDate}`
    // param+=`&PageSize=${params?.pageSize.toString()}`
    // param+=`&IsAdmin=${params?.IsAdmin}`
    // if(params?.toDate) param+=`&ToDate=${params?.toDate}`
    if(params?.fromDate) param+=`&FromDate=${params?.fromDate}`
    const url = `Report/GetInteraction187ReportList?${param}`;
    return this.http.get<any[]>(url, {
      observe: 'response',
    });
  }
  

  dowanloadReports(data){
    const url = ``
    return this.http.get<any[]>(url, {
      observe: 'response',
    });
  }



}
