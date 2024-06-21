import { DataSource } from '@angular/cdk/table';
import { HttpResponse } from '@angular/common/http';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Inventory } from '@core/domain-classes/inventory';
import { InteractionReportsService } from '../interaction-reports.service';
import { InventoryResourceParameter } from '@core/domain-classes/inventory-resource-parameter';

export class InteractionDataSource implements DataSource<Inventory> {
  private _entities$ = new BehaviorSubject<Inventory[]>([]);
  private _responseHeaderSubject$ = new BehaviorSubject<ResponseHeader>(null);
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject$.asObservable();
  private _count: number = 0;
  sub$: Subscription;

  public get count(): number {
    return this._count;
  }
  public responseHeaderSubject$ = this._responseHeaderSubject$.asObservable();

  constructor(private inventoryService: InteractionReportsService) {
    this.sub$ = new Subscription();
  }

  connect(): Observable<Inventory[]> {
    return this._entities$.asObservable();
  }

  disconnect(): void {
    this._entities$.complete();
    this.loadingSubject$.complete();
    this.sub$.unsubscribe();
  }

  loadData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getInteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {

        let paginationParam = new ResponseHeader();
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp?.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadDumpData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getInteractionsDumpReports(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {
        let paginationParam = new ResponseHeader();
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadFcrDumpData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getInteractionsFcrDumpReports(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {
        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  
  load187Data(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.get187InteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {
        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  load185Data(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.get185InteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {
        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadClosedData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getClosedInteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {

        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadReopenData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getReopenInteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {
        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadOpenData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getOpenInteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {

        
        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadResolvedData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getResolvedInteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => { 
        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadPendingData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getPendingInteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {
        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadL2L3Data(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getL2L3InteractionsReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {

        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadSurveyData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getSurveyReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {

        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }
  loadGrpTatData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getGrpTatReportsList(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {
        let paginationParam = new ResponseHeader();
        // if (resp && resp?.headers?.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers?.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp?.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }

  loadAllTeamDumpData(inventoryResource: InventoryResourceParameter) {
    this.loadingSubject$.next(true);
    this.sub$ = this.inventoryService.getInteractionsAllTeamDumpReports(inventoryResource)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject$.next(false)))
      .subscribe((resp: HttpResponse<Inventory[]>) => {
        let paginationParam = new ResponseHeader();
        // if (resp && resp.headers.get('X-Pagination')) {
        //   paginationParam = JSON.parse(
        //     resp.headers.get('X-Pagination')
        //   ) as ResponseHeader;
        // }
        paginationParam.totalCount = resp?.body[0]?.totalRecords
        paginationParam.pageNumber = inventoryResource?.pageNumber
        paginationParam.pageSize = inventoryResource?.pageSize
        this._responseHeaderSubject$.next(paginationParam);
        const entities = [...resp.body];
        this._count = entities.length;
        this._entities$.next(entities);
      });
  }




}
