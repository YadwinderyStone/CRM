import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dispostion } from './disposition.model';
@Injectable({
  providedIn: 'root'
})
export class DispositionService {


    constructor(
      private httpClient: HttpClient,
    ) {
    }
  
    getDispositionList() {
      const url = `CtiDispostionMasters/GetCTIDispostionMastersList`;
      return this.httpClient.get<Dispostion[]>(url);
    }
  
    deleteDispositionById(id: any) {
      const url = `CtiDispostionMasters/DeleteCtiDispostionMastersData?id=${id}`;
      return this.httpClient.delete<Dispostion>(url);
    }
    updateDisposition(data: any) {
      const url = `CtiDispostionMasters/UpdateCtiDispostionMastersData`;
      return this.httpClient.put<Dispostion[]>(url, data);
    }
    addDisposition(data: any) {
      const url = `CtiDispostionMasters/CreateCtiDispostionMastersData`;
      return this.httpClient.post<Dispostion[]>(url, data);
    }
  
  
  }