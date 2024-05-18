import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InteractionCategory, InteractionStatus, InteractionType } from '@core/domain-classes/interactionCatetgory';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class InteractionCategoryService  {

  constructor(
    private httpClient: HttpClient,
    // serviceElementsFactory: EntityCollectionServiceElementsFactory,
) {
        // super('Category', serviceElementsFactory);
  }

getInteractionTypeAndCategories(){
  // FIXME add dynamic parent id variable
    const url = `Categories?ParentId=0`;
    return this.httpClient.get<InteractionCategory[]>(url);
}


getInteractionSubCategories(id: string) {
    const customParams = new HttpParams()
      .set('Id', id)
    const url = `Categories`;
    return this.httpClient.get<InteractionCategory[]>(url, {
      params: customParams
    });
  }

  getAllCategoriesForDropDown(id:string) {
    const url = `Categories/list/${id}`;
    return this.httpClient.get<InteractionCategory[]>(url);
  }

deleteCategory(id:any){
  const url = `Category/${id}`;
  return this.httpClient.delete<InteractionCategory[]>(url);
}
updateCategory(data:any){
  const url = `Category/${data.id}`;
  return this.httpClient.put<InteractionCategory[]>(url,data);
}
addCategory(data:any){
  const url = `Category`;
  return this.httpClient.post<InteractionCategory[]>(url,data);
}

UpdateSubCategory(data:any){
  const url = `Category/${data.id}`;
  return this.httpClient.put<InteractionCategory[]>(url,data);
}
addSubCategory(data:any){
  const url = `Category`;
  return this.httpClient.put<InteractionCategory[]>(url,data);
}


// interaction category apis end



// Interaction type apis start

getBulkCloserHistory(){
    const url = `Interaction/GetBulkCloserHistory`;
    return this.httpClient.get<any[]>(url);
}
getAllInteractionsTypes(){
    const url = `Types`;
    return this.httpClient.get<InteractionType[]>(url);
}


createType(data:InteractionType){
    const url = `Type`;
    return this.httpClient.post<InteractionType[]>(url,data);
}

updateType(data:InteractionType){
    const url = `Type/${data.id}`;
    return this.httpClient.put<InteractionType[]>(url,data);
}

addType(data:InteractionType){
    const url = `Type`;
    return this.httpClient.post<InteractionType[]>(url,data);
}

deleteType(id:string){
    const url = `Type/${id}`;
    return this.httpClient.delete<InteractionType[]>(url);
}

// Interaction type apis end



// interaction status all apis start

getAllStatus(){
    const url = `Status`;
    return this.httpClient.get<InteractionStatus[]>(url); 
}
getSubStatus(id:string){
const customParams = new HttpParams()
      .set('parentId', id)
      const url = `Status`
      // const url = `Status/list`
    return this.httpClient.get<InteractionStatus[]>(url, {
      params: customParams
    });

}
createStatus(data:InteractionStatus){
    const url = `Status`;
    return this.httpClient.post<InteractionStatus[]>(url,data);
}

updateStatus(data:InteractionStatus){
    // const url = `Status?Id=data.id`;
    const url = `Status/${data.id}`;
    return this.httpClient.put<InteractionStatus[]>(url,data);
}

addStatus(data:InteractionStatus){
    const url = `Status`;
    return this.httpClient.post<InteractionStatus[]>(url,data);
}

deleteStatus(id:string){
    const url = `Status/${id}`;
    return this.httpClient.delete<InteractionStatus[]>(url);
}






// interaction status all apis end 

// bulk upload service api start

bulkUpload(data,formData){
  const url = `Interaction/bulkCloser?WithResolutionComment=${data?.WithResolutionComment}&WithCategoryAndSubCategory=${data?.WithCategoryAndSubCategory}&WithProblemId=${data?.WithProblemId}`;
  return this.httpClient.post<any[]>(url,formData);
}



// bulk upload service api end




}
