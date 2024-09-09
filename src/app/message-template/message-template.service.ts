import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageTemplate } from '@core/domain-classes/message-template';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateService {
    constructor(
      private httpClient: HttpClient,
      private commonHttpErrorService: CommonHttpErrorService) { }
  

// FIXME : change api end points to mesage template

    updateMessageTemplate(emailTemplate: any): Observable<MessageTemplate | CommonError> {
      const url = `Message/UpdateSMSTemplate`;
      return this.httpClient.put<MessageTemplate>(url, emailTemplate)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    addMessageTemplate(emailTemplate: any): Observable<MessageTemplate | CommonError> {
      const url = `Message/CreateSMSTemplate`;
      return this.httpClient.post(url, emailTemplate)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    deleteMessageTemplate(emailTemplate: MessageTemplate): Observable<MessageTemplate | CommonError> {
      const url = `Message/DeleteSmsTemplateDataById?id=${emailTemplate.id}`;
      return this.httpClient.delete<MessageTemplate>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    getMessageTemplateById(id: string): Observable<MessageTemplate | CommonError> {
      const url = `Message/GetSmsTemplateDataById?id=${id}`;
      return this.httpClient.get<MessageTemplate>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    getMessageTemplates(): Observable<MessageTemplate[] | CommonError> {
      const url = `Message/GetSmsTemplateList?PageNumber=1&PageSize=20`;
      return this.httpClient.get<MessageTemplate[]>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
  }
  