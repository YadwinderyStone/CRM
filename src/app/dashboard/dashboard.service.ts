import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { catchError } from 'rxjs/operators';
import { DashboardStaticatics } from '@core/domain-classes/dashboard-staticatics';
import { CalenderReminderDto } from '@core/domain-classes/calender-reminder';
import { BestSellingProudct } from '@core/domain-classes/bast-selling-product';
import { PurchaseOrderRecentDeliverySchedule } from '@core/domain-classes/purchase-order-recent-delivery-schedule';
import { SalesOrderRecentShipmentDate } from '@core/domain-classes/sales-order-recent-shipment-date';
import { Inventory } from '@core/domain-classes/inventory';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private httpClient: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  getDashboardStaticatics(): Observable<DashboardStaticatics | CommonError> {
    const url = `dashboard/statistics`;
    return this.httpClient.get<DashboardStaticatics>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getDailyReminders(month, year): Observable<CalenderReminderDto[] | CommonError> {
    const url = `dashboard/dailyreminder/${month}/${year}`;
    return this.httpClient.get<CalenderReminderDto[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getWeeklyReminders(month, year): Observable<CalenderReminderDto[] | CommonError> {
    const url = `dashboard/weeklyreminder/${month}/${year}`;
    return this.httpClient.get<CalenderReminderDto[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getMonthlyReminders(month, year): Observable<CalenderReminderDto[] | CommonError> {
    const url = `dashboard/monthlyreminder/${month}/${year}`;
    return this.httpClient.get<CalenderReminderDto[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getQuarterlyReminders(month, year): Observable<CalenderReminderDto[] | CommonError> {
    const url = `dashboard/quarterlyreminder/${month}/${year}`;
    return this.httpClient.get<CalenderReminderDto[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getHalfYearlyReminders(month, year): Observable<CalenderReminderDto[] | CommonError> {
    const url = `dashboard/halfyearlyreminder/${month}/${year}`;
    return this.httpClient.get<CalenderReminderDto[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getYearlyReminders(month, year): Observable<CalenderReminderDto[] | CommonError> {
    const url = `dashboard/yearlyreminder/${month}/${year}`;
    return this.httpClient.get<CalenderReminderDto[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getOneTimeReminders(month, year): Observable<CalenderReminderDto[] | CommonError> {
    const url = `dashboard/onetime/${month}/${year}`;
    return this.httpClient.get<CalenderReminderDto[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getBestSellingProducts(month, year): Observable<BestSellingProudct[] | CommonError> {
    const url = `dashboard/bestsellingproduct/${month}/${year}`;
    return this.httpClient.get<BestSellingProudct[]>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getPurchaseOrderRecentDeliverySchedule(): Observable<PurchaseOrderRecentDeliverySchedule[]> {
    const url = `purchaseOrder/recent/expecteddate`;
    return this.httpClient.get<PurchaseOrderRecentDeliverySchedule[]>(url);
  }

  getInteractionsList(params) {
    const url = 'Interaction';
    const customParams = new HttpParams()
      .set('IsAdmin', params.isAdmin)
      .set('PageSize', params.pageSize.toString())
      .set('Skip', params.skip.toString())
    return this.httpClient.get<Inventory[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }
  getInteractionsListByStatus(params) {
    const url = 'Dashboard/GetInteractionOpenStatus';
    const customParams = new HttpParams()
      // .set('IsAdmin', params.isAdmin)
      // .set('StatusName', params?.statusName)
      .set('PageSize', params.pageSize.toString())
      .set('Skip', params.skip.toString())
    return this.httpClient.get<Inventory[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }
  getInteractionsListForPending() {
    const url = 'Dashboard/GetInteractionPendingStatus';
    
    return this.httpClient.get<Inventory[]>(url, {
      observe: 'response',
    });
  }
  getInteractionsListByTeamId(params) {
    const url = 'Interaction';
    const customParams = new HttpParams()
      .set('IsAdmin', params.isAdmin)
      .set('TeamName', params?.TeamId)
      .set('PageSize', params.pageSize.toString())
      .set('Skip', params.skip.toString())
    return this.httpClient.get<Inventory[]>(url, {
      params: customParams,
      observe: 'response',
    });
  }
  
}
