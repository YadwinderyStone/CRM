
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Inventory } from '@core/domain-classes/inventory';
import { InventoryResourceParameter } from '@core/domain-classes/inventory-resource-parameter';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { TranslationService } from '@core/services/translation.service';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { InteractionReportsService } from '../interaction-reports.service';
import { InteractionDataSource } from '../interaction-report-list/interaction-reports-datasource';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dump-report-fcr',
  templateUrl: './dump-report-fcr.component.html',
  styleUrls: ['./dump-report-fcr.component.scss']
})
export class DumpReportFcrComponent extends BaseComponent implements OnInit {
  toDate: any = new Date()
  fromDate: any = new Date();
  currentDate = new Date();
  dataSource: InteractionDataSource;
  isLoading: boolean = false;
  displayedColumns: string[] = ['interactionId', 'createdDate','createdBy', 'ticketType', 'contactName', 'team', 'interactionState',
    'interactionSubState', 'disposition', 'subDisposition','subject', 'problemReported', 'agentRemarks',
    'docketNumber', 'mobile','interactionCreatedThroughMedia','priorityName']
  columnsToDisplay: string[] = ["footer"];
  inventoryResource: InventoryResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort; 'closeDate',
  _productNameFilter: string;
  expandedElement: Inventory = null;

  public filterObservable$: Subject<string> = new Subject<string>();

  public get ProductNameFilter(): string {
    return this._productNameFilter;
  }

  public set ProductNameFilter(v: string) {
    this._productNameFilter = v;
    const nameFilter = `productName##${v}`;
    this.filterObservable$.next(nameFilter);
  }

  constructor(
    private interactionReportsService: InteractionReportsService,
    private cd: ChangeDetectorRef,
    public translationService: TranslationService,
    public toasterService: ToastrService,
    public datepipe: DatePipe
  ) {
    super(translationService);
    this.getLangDir();
    this.inventoryResource = new InventoryResourceParameter();
    this.inventoryResource.pageSize = 10;
    // this.inventoryResource.orderBy = 'productName asc'
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate
  }

  ngOnInit(): void {
    this.dataSource = new InteractionDataSource(this.interactionReportsService);
    this.dataSource.loadFcrDumpData(this.inventoryResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.inventoryResource.skip = 0;
        this.inventoryResource.IsAdmin = true;
        this.paginator.pageIndex = 0;

        const strArray: Array<string> = c.split('##');
        if (strArray[0] === 'productName') {
          this.inventoryResource.productName = escape(strArray[1]);
        }
        this.dataSource.loadFcrDumpData(this.inventoryResource);
      });
  }

  // ngAfterViewInit() {
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //   this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
  //     .pipe(
  //       tap(() => {
  //         this.inventoryResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
  //         this.inventoryResource.pageSize = this.paginator.pageSize;
  //         this.inventoryResource.orderBy = this.sort.active + ' ' + this.sort.direction;
  //         this.dataSource.loadFcrDumpData(this.inventoryResource);
  //       })
  //     )
  //     .subscribe();
  // }


  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.inventoryResource.pageSize = c.pageSize;
          this.inventoryResource.skip = c.skip;
          this.inventoryResource.totalCount = c.totalCount;
        }
      });
  }
  onClear() {
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate
    this.setParams();
    this.dataSource.loadFcrDumpData(this.inventoryResource);
  }
  searchList() {
    this.setParams();
    this.dataSource.loadFcrDumpData(this.inventoryResource);
  }

  setParams() {
    this.paginator.pageIndex = 0;
    this.inventoryResource.skip = 0
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.toDate = toDate
    this.inventoryResource.fromDate = fromDate
  }



  onDownloadReport() {
    this.isLoading = true
    this.interactionReportsService.getInteractionsFcrDumpReports(this.inventoryResource).subscribe(res => {
      let dumpRecords: any = res?.body;
      if (dumpRecords.length) {
        let heading = [['InteractionId',
            'Date',
            'Created By',
            'Ticket Type',
            'Contact Name',
            'Team',
            'Status',
            'Sub State',
            'Disposition',
            'Sub Disposition',
            'Subject',
            'Problem Reported',
            'Agent Remarks',
            'Docket Number',
            'Mobile No.',
            // 'Close Date',
            'Interaction Created Through Media',
            'Priority Name']];

        let dumpReport = [];
        dumpRecords.forEach(data => {
          dumpReport.push({
            'InteractionId': data?.interactionId,
            'Date': data?.createdDate,
            'Created By': data?.createdByName,
            'Ticket Type': data?.ticketType,
            'Contact Name': data?.contactName,
            'Team': data?.team,
            'Status': data?.interactionState,
            'Sub State': data?.interactionSubState,
            'Disposition': data?.disposition,
            'Sub Disposition': data?.subDisposition,
            'Subject': data?.subject,
            'Problem Reported': data?.problemReported,
            'Agent Remarks': data?.agentRemarks,
            'Docket Number': data?.docketNumber,
            'Mobile No.': data?.mobileNo,
            // 'Close Date':data?.lastResolvedAt,
            'Interaction Created Through Media': data?.interactionCreatedThroughMedia,
            'Priority Name': data?.priorityName,
          })
        });
        let workBook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(workBook, heading);
        let workSheet = XLSX.utils.sheet_add_json(workBook, dumpReport, { origin: "A2", skipHeader: true });
        XLSX.utils.book_append_sheet(workBook, workSheet, 'FCR Dump Report');
        XLSX.writeFile(workBook, 'FCR Dump Report' + ".xlsx");
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.toasterService.error('No records to dowanload')
      }
    }, error => {
      this.isLoading = false;
      this.toasterService.error(error)
    })
  }

  dowanloadExcal(){
    let url = `Excel/GetExcelDownloadForForFCRReport`
    this.isLoading = true;
    this.setParams();
    this.interactionReportsService.get187InteractionsReportsExcelDowanload(url,this.inventoryResource).subscribe((res: any) => {
      let emailDocumentList =  res
      let receivedData = new Blob([emailDocumentList], { type:'.xlsx' })
  
      const url = window.URL.createObjectURL(receivedData);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'FcrDumpReports.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.isLoading = false
  
    },error=>{
      this.toasterService.error(error)
    })
  }





}


