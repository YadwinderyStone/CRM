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

    updateMessageTemplate(emailTemplate: MessageTemplate): Observable<MessageTemplate | CommonError> {
      const url = `emailTemplate/${emailTemplate.id}`;
      return this.httpClient.put<MessageTemplate>(url, emailTemplate)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    addMessageTemplate(emailTemplate: MessageTemplate): Observable<MessageTemplate | CommonError> {
      const url = `emailTemplate`;
      return this.httpClient.post<MessageTemplate>(url, emailTemplate)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    deleteMessageTemplate(emailTemplate: MessageTemplate): Observable<MessageTemplate | CommonError> {
      const url = `emailTemplate/${emailTemplate.id}`;
      return this.httpClient.delete<MessageTemplate>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    getMessageTemplate(id: string): Observable<MessageTemplate | CommonError> {
      const url = `emailTemplate/${id}`;
      return this.httpClient.get<MessageTemplate>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    getMessageTemplates(): Observable<MessageTemplate[] | CommonError> {
      const url = `emailTemplate`;
      return this.httpClient.get<MessageTemplate[]>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
  }
  