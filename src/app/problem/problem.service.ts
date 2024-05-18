import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Problem } from './problem.model';


@Injectable({
  providedIn: 'root'
})
export class ProblemService {



  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getProblemList() {
    const url = `Problem/GetProblemMasterList`;
    return this.httpClient.get<Problem[]>(url);
  }

  deleteProblemById(id: any) {
    const url = `Problem/Problem/${id}`;
    return this.httpClient.delete<Problem[]>(url);
  }
  updateProblem(data: any) {
    const url = `Problem/Problem/${data.id}`;
    return this.httpClient.put<Problem[]>(url, data);
  }
  addProblem(data: any) {
    const url = `Problem/CreateProblem`;
    return this.httpClient.post<Problem[]>(url, data);
  }


}