import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InteractionCategory, InteractionStatus } from '@core/domain-classes/interactionCatetgory';
import { Inventory } from '@core/domain-classes/inventory';
import { InventoryHistory } from '@core/domain-classes/inventory-history';
import { InventoryHistoryResourceParameter } from '@core/domain-classes/inventory-history-resource-parameter';
import { InventoryResourceParameter } from '@core/domain-classes/inventory-resource-parameter';
import { Lookup } from '@core/domain-classes/lookup.model';
import { Queue } from '@core/domain-classes/queue.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventories(
    resourceParams: InventoryResourceParameter
  ): Observable<HttpResponse<Inventory[]>> {
    const url = 'Interaction';
    const customParams = new HttpParams()

      .set('IsAdmin', resourceParams.fields)
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('productName', resourceParams.productName ? resourceParams.productName : '')

    return this.http.get<Inventory[]>(url, {
      params: customParams,
      observe: 'response',
    });

  }

  getInventoriesReport(
    resourceParams: InventoryResourceParameter
  ): Observable<HttpResponse<Inventory[]>> {
    const url = 'inventory';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', 0)
      .set('Skip', 0)
      .set('SearchQuery', resourceParams.searchQuery)
      .set('productName', resourceParams.productName ? resourceParams.productName : '')

    return this.http.get<Inventory[]>(url, {
      params: customParams,
      observe: 'response',
    });

  }

  addInventory(inventory: Inventory): Observable<Inventory> {
    const url = 'inventory';
    return this.http.post<Inventory>(url, inventory);
  }

  getInventoryHistories(
    resourceParams: InventoryHistoryResourceParameter
  ): Observable<HttpResponse<InventoryHistory[]>> {
    const url = 'inventory/history';
    const customParams = new HttpParams()
      .set('Fields', resourceParams.fields)
      .set('OrderBy', resourceParams.orderBy)
      .set('PageSize', resourceParams.pageSize.toString())
      .set('Skip', resourceParams.skip.toString())
      .set('SearchQuery', resourceParams.searchQuery)
      .set('productId', resourceParams.productId)

    return this.http.get<InventoryHistory[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }




  // new apis start 

  getInteractionsList(params) {
    let param:any = `Skip=${params?.skip.toString()}`
    param+=`&PageSize=${params?.pageSize.toString()}`
   if(params?.IsAdmin)param+=`&IsAdmin=${params?.IsAdmin}`
    if(params?.search) param+=`&TransactionNumber=${params?.search}`
    if(params?.type) param+=`&TicketType=${params?.type}`
    if(params?.team) param+=`&TeamId=${params?.team}`
    if(params?.teamId) param+=`&TeamName=${params?.teamId}`
    if(params?.priority) param+=`&PriorityName=${params?.priority}`
    if(params?.status) param+=`&statusId=${params?.status}`
    if(params?.subStatus) param+=`&subStatusId=${params?.subStatus}`
    if(params?.category) param+=`&categoryId=${params?.category}`
    if(params?.category) param+=`&categoryId=${params?.category}`
    if(params?.subCategory) param+=`&subCategoryId=${params?.subCategory}`
    const url = `Interaction?${param}`;
    return this.http.get<Inventory[]>(url, {
      observe: 'response',
    });
  } 
  getInteractionsListForL0Email(params) {
    let param:any = `Skip=${params?.skip.toString()}`
    if(params?.team) param+=`&TeamId=${params?.team}`
    param+=`&PageSize=${params?.pageSize.toString()}`
   if(params?.IsAdmin)param+=`&IsAdmin=${params?.IsAdmin}`
    if(params?.search) param+=`&TransactionNumber=${params?.search}`
    if(params?.type) param+=`&TicketType=${params?.type}`
    // if(params?.teamId) param+=`&TeamName=${params?.teamId}`
    if(params?.priority) param+=`&PriorityName=${params?.priority}`
    if(params?.status) param+=`&statusId=${params?.status}`
    if(params?.subStatus) param+=`&subStatusId=${params?.subStatus}`
    if(params?.category) param+=`&categoryId=${params?.category}`
    if(params?.category) param+=`&categoryId=${params?.category}`
    if(params?.subCategory) param+=`&subCategoryId=${params?.subCategory}`
    // const url = `Interaction?${param}`;
    let name = 'Email L0'
    // const url = `Interaction?TeamName=${name}`;
    const url = `Interaction/GetInteractionsRecord?TeamId=25&Skip=${params?.skip.toString()}&PageSize=${params?.pageSize.toString()}`;
    return this.http.get<Inventory[]>(url, {
      observe: 'response',
    });
  } 
  getInteractionsListForContact(params) {
    const url = `Interaction/GetAllInteractionsRecordsByContactId?contactId=${params.contactId}&skip=${params.skip}&pageSize=${params.pageSize}`;
    //const customParams = new HttpParams()
      //.set('IsAdmin', false)
      //.set('PageSize', params.pageSize.toString())
      //.set('Skip', params.skip.toString())
    return this.http.get<Inventory[]>(url, {
      // params: customParams,
      // observe: 'response',
    });
  }
  deleteCustomerInteraction(id) {
    const url = `Interaction/${id}`;
    return this.http.delete<any[]>(url);
  }

  addInteraction(data) {
    const url = 'Interaction';
    return this.http.post<any>(url, data);

  }
  updateInteraction(id,data) {
    const url = `Interaction/${id}`;
    return this.http.put<any>(url, data);

  }
  getTeamsList() { //team list for dropdown
    const url = 'Queues';
    return this.http.get<Queue[]>(url);
  }
  getPriorityList() { //proirty list for dropdown
    const url = `Lookup/list/priority`
    return this.http.get<Lookup[]>(url);

  }
  getErrorCodeList() { //error code list for dropdown
    const url = `Lookup/list/errorCode`
    return this.http.get<Lookup[]>(url);

  }
  getSourceList() { //error code list for dropdown
    const url = `Lookup/list/SOURCE`
    return this.http.get<Lookup[]>(url);

  }
  getstatusList() { //status list for dropdown
    const url = `Status`;
    return this.http.get<InteractionStatus[]>(url);
  }
  getsubStatusList(id: string) { //status list for dropdown
    const customParams = new HttpParams()
      .set('parentId', id)
    const url = `Status`
    // const url = `Status/list`
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

  getInteractionById(id){
    const url = `Interaction/${id}`;
    
    return this.http.get<Inventory[]>(url);
  }
  getContactDetail(id){
    const url = `Contact/${id}`;
    return this.http.get<any[]>(url);
  }
  getDocumentDetail(id){
    const url = `Document/GetDocumentDetailByInteractionId?interactionId=${id}`;
    return this.http.get<any[]>(url);
  }
  downloadDocument(id): Observable<Blob> {
      const url = `Document/GetViewDocumentDataById?id=${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  // downloadDocument(id){
  //   const url = `Document/GetViewDocumentDataById?id=${id}`;
  //   return this.http.get<any>(url);
  // }
  getInteractionHistory(id){
    // FIXME:need to change api end point for history
    const url = `Interaction/GetInteractionHistory?interactionId=${id}`;
    return this.http.get<any[]>(url);
  }
  getInteractionHistoryDetail(id){
    const url = `Interaction/GetInteractionHistory?interactionId=${id}`;
    return this.http.get<any[]>(url);
  }
  getInteractionHistoryDetailBYType(id){
    // FIXME:need to change api end point for history
    const url = `Interaction/${id}`;
    return this.http.get<any[]>(url);
  }
  getInteractionNotes(id){
    // FIXME:need to change api end point for history
    const url = `CrmNotes/GetCrmNotesDataById/${id}`;
    return this.http.get<any[]>(url);
  }
  getInteractionLogs(id){
    // FIXME:need to change api end point for history
    const url = `Interaction/${id}`;
    return this.http.get<any[]>(url);
  }
  addInteractionNotes(id){
    // FIXME:need to change api end point for history
    const url = `Interaction/${id}`;
    return this.http.get<any[]>(url);
  }
  getInteractionLastActions(id){
    // FIXME:need to change api end point for history
    const url = `Interaction/${id}`;
    return this.http.get<any[]>(url);
  }


  // need api change to dropdown

  getDisPositionList() {
    const url = `CtiDispostionMasters/GetCTIDispostionMastersList`;
    return this.http.get<any[]>(url);
  }
  callDispose(data) { 
    const url = `Categories/list/0`;
    return this.http.post<any[]>(url,data);
  }


  getTeamListForTransfer(id){
    const url = `Queues`;
    // const url = `Queues/${id}`;
    return this.http.get<any>(url);
  }

  transferToTeam(data) { 
    // const url = `Interaction/UpdateInteractionTeam?id=${data?.id}`;
    const url = `Interaction/UpdateInteractionTeam?id=${data?.id}`;
    return this.http.post<any[]>(url,data);
  }

  
// Api list for sidebar interactions 


getMyInteractionsList(params) {
  let param:any = `Skip=${params?.skip.toString()}`
  param+=`&PageSize=${params?.pageSize.toString()}`
 if(params?.IsAdmin)param+=`&IsAdmin=${params?.IsAdmin}`
  if(params?.search) param+=`&TransactionNumber=${params?.search}`
  if(params?.type) param+=`&TicketType=${params?.type}`
  if(params?.team) param+=`&TeamId=${params?.team}`
  if(params?.teamId) param+=`&TeamName=${params?.teamId}`
  if(params?.priority) param+=`&PriorityName=${params?.priority}`
  if(params?.status) param+=`&statusId=${params?.status}`
  if(params?.subStatus) param+=`&subStatusId=${params?.subStatus}`
  if(params?.category) param+=`&categoryId=${params?.category}`
  if(params?.category) param+=`&categoryId=${params?.category}`
  if(params?.subCategory) param+=`&subCategoryId=${params?.subCategory}`
  const url = `Interaction?${param}`;
  return this.http.get<Inventory[]>(url, {
    observe: 'response',
  });
} 

getTeamWiseInteractionsList(params) {
  let param:any = `Skip=${params?.skip.toString()}`
  param+=`&PageSize=${params?.pageSize.toString()}`
 if(params?.IsAdmin)param+=`&IsAdmin=${params?.IsAdmin}`
  if(params?.search) param+=`&TransactionNumber=${params?.search}`
  if(params?.type) param+=`&TicketType=${params?.type}`
  if(params?.team) param+=`&TeamName=${params?.team}`
  if(params?.teamId) param+=`&TeamId=${params?.teamId}`
  if(params?.priority) param+=`&PriorityName=${params?.priority}`
  if(params?.status) param+=`&statusId=${params?.status}`
  if(params?.subStatus) param+=`&subStatusId=${params?.subStatus}`
  if(params?.category) param+=`&categoryId=${params?.category}`
  if(params?.category) param+=`&categoryId=${params?.category}`
  if(params?.subCategory) param+=`&subCategoryId=${params?.subCategory}`
  const url = `Interaction?${param}`;
  return this.http.get<Inventory[]>(url, {
    observe: 'response',
  });
} 


// notes api starts

addCrmNote(data){
  const url = `CrmNotes/AddCrmNotes`;
  return this.http.post<any[]>(url,data);
  

}






// notes api end 




}
