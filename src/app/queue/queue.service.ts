import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Queue, QueueMember } from '@core/domain-classes/queue.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private httpClient: HttpClient){
  }



getQueueList(){
    const url = `Queues`;
    return this.httpClient.get<Queue[]>(url); 
}
getUsersList(){
    const url = `User/GetAllUsers`;
    return this.httpClient.get<any[]>(url); 
}

// generateExcel(request: any): Observable<any> {
//   const jsonString = JSON.stringify(request); // convert JavaScript object to JSON string
// const parsedObject = JSON.parse(jsonString); // parse JSON string
//   const url = 'Contact/GenerateExcelFileData';
//   return this.httpClient.post(url, parsedObject, {
//     responseType: 'arraybuffer'
//   });
// }

generateExcel(request: any[]): Observable<any> {
  const jsonObject = { Data: request }; // wrap array in a JSON object
  const jsonString = JSON.stringify(jsonObject); // convert JavaScript object to JSON string
  const url = 'Contact/GenerateExcelFileData';
  return this.httpClient.post(url, jsonString, {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'arraybuffer'
  });
}

updateQueue(data:Queue){
    // const url = `Status?Id=data.id`;
    const url = `Queue/${data.id}`;
    return this.httpClient.put<Queue[]>(url,data);
}

addQueue(data:Queue){
    const url = `Queue`;
    return this.httpClient.post<Queue[]>(url,data);
}

deleteQueue(id:string){
    const url = `Queue/${id}`;
    return this.httpClient.delete<Queue[]>(url);
}

getQueueById(id){
  const url = `Queue/${id}`;
    return this.httpClient.get<any[]>(url);
}
getQueueMembers(id){
  const url = `QueueMembers?queueId=${id}`;
    return this.httpClient.get<any[]>(url);
}


AddQueueMember(data:QueueMember){
  const url = `QueueMemberAdd`;
  return this.httpClient.post<Queue[]>(url,data);
}
updateQueueMember(data:QueueMember){
  const url = `QueueMember/${data?.id}`;
  return this.httpClient.put<Queue[]>(url,data);
}
deleteQueueMember(data){
  const url = `QueueMemberDelete`;
  return this.httpClient.delete<any>(url,data);
}
// getQueueMembers(){
//   const url = `QueueMemberAdd`;
//   return this.httpClient.get<Queue[]>(url);
// }
// getQueueMemberById(id:string){
//   const url = `QueueMember/${id}`;
//   return this.httpClient.get<Queue[]>(url);
// }


}




// // getSubStatus(id:string){
// const customParams = new HttpParams()
// .set('parentId', id)
// const url = `Status`
// // const url = `Status/list`
// return this.httpClient.get<Queue[]>(url, {
// params: customParams
// });

// }