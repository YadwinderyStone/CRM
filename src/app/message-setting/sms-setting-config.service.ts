
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SMSConFigSetting } from '@core/domain-classes/sms-setting';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmsSettingConfigService {

  constructor(private httpClient: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  getSMSConFigSettings(): Observable<SMSConFigSetting[] | CommonError> {
    const url = 'SMSConFigSetting';
    return this.httpClient.get<SMSConFigSetting[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getSMSConFigSetting(id: string): Observable<SMSConFigSetting | CommonError> {
    const url = `SMSConFigSetting/${id}`;
    return this.httpClient.get<SMSConFigSetting>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addSMSConFigSetting(setting: SMSConFigSetting): Observable<SMSConFigSetting | CommonError> {
    const url = `SMSConFigSetting`;
    return this.httpClient.post<SMSConFigSetting>(url, setting)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateSMSConFigSetting(setting: SMSConFigSetting): Observable<SMSConFigSetting | CommonError> {
    const url = `SMSConFigSetting/${setting.id}`;
    return this.httpClient.put<SMSConFigSetting>(url, setting)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteSMSConFigSetting(id: string): Observable<SMSConFigSetting | CommonError> {
    const url = `SMSConFigSetting/${id}`;
    return this.httpClient.delete<SMSConFigSetting>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }
}

