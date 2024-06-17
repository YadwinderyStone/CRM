import { DatePipe } from '@angular/common'
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports187',
  templateUrl: './reports187.component.html',
  styleUrls: ['./reports187.component.scss']
})
export class Reports187Component extends BaseComponent implements OnInit {

  toDate: any = new Date();
  fromDate: any = new Date();
  currentDate = new Date();
  isLoading: boolean = false;
  dataSource: InteractionDataSource;
  displayedColumns: string[] = ['interactionid', 'interactiontype', 'createdat', 'status', 'substatus',
    'subject', 'category', 'subcatagory', 'contant',
    'createdteam', 'assignto', 'problemId', 'gstn', 'problemreported1', 'docketno', 'mobile',
    'emailId', 'escalationStartDateTime', 'interactionCreatedThroughMedia',
    'interactionThreadLastUpdated', 'lastResolvedAt', 'noOfMessages', 'priorityName', 'reopenFlag', 'ticketAssignedTime', 'uniqueNumber'];
  // displayedColumns: string[] = ['interactionid', 'interactiontype', 'status', 'subject','substatus', 'category', 'subcatagory', 'contant', 'createdteam', 'createdat', 'assignto', 'gstn', 'problemreported1', 'docketno'];
  // displayedColumns: string[] =['interactionid','createdDate', 'ticketType','contactName','team','assignedTo','interactionState',
  // 'interactionSubState','disposition','subDisposition','gstn','subject','problemReported','agentRemarks',
  //   'docketNumber', 'emailId', 'escalationStartDateTime', 'interactionCreatedThroughMedia',
  //    'interactionThreadLastUpdated', 'lastResolvedAt','currentStatus',
  //  'noOfMessages', 'priorityName',  'reopenFlag', 'ticketAssignedTime',
  //   'uniqueNumber']
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
    // this.inventoryResource.IsAdmin = true
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate

  }

  ngOnInit(): void {
    this.dataSource = new InteractionDataSource(this.interactionReportsService);
    this.dataSource.load187Data(this.inventoryResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.inventoryResource.skip = 0;
        this.paginator.pageIndex = 0;

        const strArray: Array<string> = c.split('##');
        if (strArray[0] === 'productName') {
          this.inventoryResource.productName = escape(strArray[1]);
        }
        this.dataSource.load187Data(this.inventoryResource);
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
          this.dataSource.load187Data(this.inventoryResource);
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

  onClear() {
    this.setParams();
    this.fromDate = new Date();
    this.toDate = new Date();
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate
    this.dataSource.load187Data(this.inventoryResource);
  }
  searchList() {
    this.setParams();
    this.dataSource.load187Data(this.inventoryResource);
  }

  setParams() {

    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.paginator.pageIndex = 0;
    this.inventoryResource.skip = 0
    this.inventoryResource.toDate = toDate
    this.inventoryResource.fromDate = fromDate
  }


  downloadList() {
    this.isLoading = true;
    this.setParams();
    this.interactionReportsService.get187InteractionsReportsList(this.inventoryResource).subscribe((res: any) => {
      let InteractionRecods: any = res?.body;
      let heading = [[
        'Interaction Id',
        'Interaction Type',
        'Status',
        'Sub Status',
        'Category',
        'Sub Category',
        'Subject',
        'Contact Name',
        'Mobile No.',
        'Email',
        'Team',
        'Problem Id',
        'GSTN',
        'Problem Reported',
        'Docket no',
        'Assign To',
        'Created At',
        'Email Id',
        'Escalation Start Date Time',
        'Interaction Created Through Media',
        'Interaction Thread Last Updated',
        'Last Resolved At',
        'No Of Messages',
        'Priority Name',
        'Reopen Flag',
        'Ticket Assigned Time',
        'Unique Number'
      ]];

      let interactionsReport = [];
      InteractionRecods.forEach(data => {
        interactionsReport.push({
          'Interaction Id': data?.interactionId,
          'Interaction Type': data?.ticketType,
          'Status': data?.interactionState,
          'Sub Status': data?.interactionSubState,
          'Category': data?.disposition,
          'Sub Category': data?.subDisposition,
          'Subject': data?.subject,
          'Contact Name': data?.contactName || data?.name,
          'Mobile No.': data?.mobileNo,
          'Email ': data?.emailId || data?.email,
          'Team': data?.teamName || data?.team,
          'Problem Id': data?.problemId || data?.problemID,
          'GSTN': data?.gstn,
          'Problem Reported': data?.problemReported,
          'Docket no': data?.docketNumber,
          'Assign To': data?.assignToName || data?.assignedTo,
          'Created At': this.datepipe.transform(data?.createdDate, 'yyyy-MM-dd hh:mm:ss a'),
          'Email Id': data?.emailId,
          'Escalation Start Date Time': data?.escalationStartDateTime,
          'Interaction Created Through Media': data?.interactionCreatedThroughMedia,
          'Interaction Thread Last Updated': data?.interactionThreadLastUpdated,
          'Last Resolved At': data?.lastResolvedAt,
          'No Of Messages': data?.noOfMessages,
          'Priority Name': data?.priorityName,
          'Reopen Flag': data?.reopenFlag,
          'Ticket Assigned Time': this.datepipe.transform(data?.ticketAssignedTime, 'yyyy-MM-dd hh:mm:ss a'),
          'Unique Number': data?.uniqueNumber

        })
      });
      let workBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook, heading);
      let workSheet = XLSX.utils.sheet_add_json(workBook, interactionsReport, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(workBook, workSheet, '187 Interaction Report List');
      XLSX.writeFile(workBook, '187 Interaction Report List' + ".xlsx");
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })

  }

dowanloadExcal(){
  this.isLoading = true;
  this.setParams();
  this.interactionReportsService.get187InteractionsReportsExcelDowanload(this.inventoryResource).subscribe((res: any) => {
    let emailDocumentList =  res
    let receivedData = new Blob([emailDocumentList], { type:'.xlsx' })

    const url = window.URL.createObjectURL(receivedData);
    const a = document.createElement('a');
    a.href = url;
    a.download = '187Reports.xlsx';
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

