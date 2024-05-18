import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lookup } from '@core/domain-classes/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private httpClient: HttpClient){
  }



getLookupList(){
    const url = `LookupParent`;
    return this.httpClient.get<Lookup[]>(url); 
}
getSubLookUps(lookupType:string){
      const url = `Lookup/list/${lookupType}`
    return this.httpClient.get<Lookup[]>(url);

}


updateLookup(data:Lookup){
    // const url = `Status?Id=data.id`;
    const url = `Lookup/${data.id}`;
    return this.httpClient.put<Lookup[]>(url,data);
}

addLookup(data:Lookup){
    const url = `Lookup`;
    return this.httpClient.post<Lookup[]>(url,data);
}

deleteLookup(id:string){
    const url = `Lookup/${id}`;
    return this.httpClient.delete<Lookup[]>(url);
}

getlookupById(id){
  const url = `Lookup/${id}`;
    return this.httpClient.get<Lookup[]>(url);
}

addSubLookUp(data){
  
}
editSubLookUp(data){

}
deleteSubLookUp(id:string){

}



}
