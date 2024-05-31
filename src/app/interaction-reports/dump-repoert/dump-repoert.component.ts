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
  selector: 'app-dump-repoert',
  templateUrl: './dump-repoert.component.html',
  styleUrls: ['./dump-repoert.component.scss']
})
export class DumpRepoertComponent extends BaseComponent implements OnInit {
  toDate: any = new Date()
  fromDate: any = new Date();
  currentDate = new Date();
  dataSource: InteractionDataSource;
  isLoading: boolean = false;
  displayedColumns: string[] = ['interactionId', 'createdDate', 'ticketType', 'contactName', 'team', 'assignedTo', 'interactionState',
    'interactionSubState', 'disposition', 'subDisposition', 'gstn', 'subject', 'problemReported', 'agentRemarks',
    'docketNumber', 'emailId', 'escalationStartDateTime', 'interactionCreatedThroughMedia',
    'interactionThreadLastUpdated', 'lastResolvedAt', 'currentStatus',
    'noOfMessages', 'priorityName', 'reopenFlag', 'ticketAssignedTime',
    'uniqueNumber']

  columnsToDisplay: string[] = ["footer"];
  inventoryResource: InventoryResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
    this.dataSource.loadDumpData(this.inventoryResource);
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
        this.dataSource.loadDumpData(this.inventoryResource);
      });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.inventoryResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.inventoryResource.pageSize = this.paginator.pageSize;
          this.inventoryResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadDumpData(this.inventoryResource);
        })
      )
      .subscribe();
  }


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

  toggleRow(element: Inventory) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
  }





  onClear() {
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate
    this.setParams();
    this.dataSource.loadDumpData(this.inventoryResource);
  }
  searchList() {
    this.setParams();
    this.dataSource.loadDumpData(this.inventoryResource);
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

    this.interactionReportsService.getInteractionsDumpReports(this.inventoryResource).subscribe(res => {
      let dumpRecords: any = res?.body;
      if(dumpRecords.length){
      let heading = [['InteractionId', 'Date', 'Ticket Type', 'Contact Name', 'Team', 'Assigned To', 'Status',
        'Sub State', 'Disposition', 'Sub Disposition', 'GSTN', 'Subject', 'Problem Reported', 'Agent Remarks',
        'Docket Number', 'EmailId', 'Escalation Start Date Time', 'Interaction Created Through Media',
        'Interaction Thread Last Updated', 'Last Resolved At', 'Current Status',
        'No Of Messages', 'Priority Name', 'Reopen Flag', 'Ticket Assigned Time',
        'Unique Number']];

      let dumpReport = [];
      dumpRecords.forEach(data => {
        dumpReport.push({
          'InteractionId':data?.interactionId,
          'Date':data?.createdDate,
          'Ticket Type':data?.ticketType,
          'Contact Name':data?.contactName,
          'Team':data?.team,
          'Assigned To':data?.assignedTo,
          'Status':data?.interactionState,
          'Sub State':data?.interactionSubState,
          'Disposition':data?.disposition,
          'Sub Disposition':data?.subDisposition,
          'GSTN':data?.gstn,
          'Subject':data?.subject,
          'Problem Reported':data?.problemReported,
          'Agent Remarks':data?.agentRemarks,
          'Docket Number':data?.docketNumber,
          'Email Id':data?.emailId,
          'Escalation Start Date Time':data?.escalationStartDateTime,
          'Interaction Created Through Media':data?.interactionCreatedThroughMedia,
          'Interaction Thread Last Updated':data?.interactionThreadLastUpdated,
          'Last Resolved At':data?.lastResolvedAt,
          'Current Status':data?.currentStatus,
          'No Of Messages':data?.noOfMessages,
          'Priority Name':data?.priorityName,
          'Reopen Flag':data?.reopenFlag,
          'Ticket Assigned Time':data?.ticketAssignedTime,
          'Unique Number':data?.uniqueNumber,
        })
      });
      let workBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook, heading);
      let workSheet = XLSX.utils.sheet_add_json(workBook, dumpReport, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Dump Report');
      XLSX.writeFile(workBook, 'Dump Report' + ".xlsx");

    }else{
      this.toasterService.error('No records to dowanload')
    }
    })
  }
}

