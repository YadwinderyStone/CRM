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
  selector: 'app-open-interactions-report',
  templateUrl: './open-interactions-report.component.html',
  styleUrls: ['./open-interactions-report.component.scss']
})
export class OpenInteractionsReportComponent extends BaseComponent implements OnInit {
  toDate: any = new Date();
  fromDate: any = new Date();
  currentDate = new Date();
  dataSource: InteractionDataSource;
  displayedColumns: string[] = ['interactionid', 'interactiontype', 'status', 'substatus', 'category','subject','subcatagory', 'contant', 'createdteam', 'createdat', 'assignto', 'gstn', 'problemreported1', 'docketno',
    'agentRemarks', 'currentStatus', 'emailId', 'escalationStartDateTime', 'interactionCreatedThroughMedia', 'interactionThreadLastUpdated', 'lastResolvedAt', 'noOfMessages',
    'priorityName', 'reopenFlag', 'ticketAssignedTime', 'uniqueNumber'];
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
    public translationService: TranslationService,
    public toasterService: ToastrService,
    public datepipe: DatePipe
  ) {
    super(translationService);
    this.getLangDir();
    this.inventoryResource = new InventoryResourceParameter();
    this.inventoryResource.pageSize = 10;
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate

  }

  ngOnInit(): void {
    this.dataSource = new InteractionDataSource(this.interactionReportsService);
    this.dataSource.loadOpenData(this.inventoryResource);
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
        this.dataSource.loadOpenData(this.inventoryResource);
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
          this.dataSource.loadOpenData(this.inventoryResource);
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
    this.dataSource.loadOpenData(this.inventoryResource);
  }
  searchList() {
    this.setParams();
    this.dataSource.loadOpenData(this.inventoryResource);
  }

  setParams() {

    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.paginator.pageIndex = 0;
    this.inventoryResource.skip = 0
    this.inventoryResource.toDate = toDate
    this.inventoryResource.fromDate = fromDate
  }


  dowanloadList() {
    this.setParams();
    this.interactionReportsService.getOpenInteractionsReportsList(this.inventoryResource).subscribe((res: any) => {
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
        'Email',
        'Team',
        'GSTN',
        'Problem Reported',
        'Docket no',
        'Assign To',
        'Created At',
        'Agent Remarks',
        'Current Status',
        'Escalation Start Date Time',
        'Interaction Created Through Media',
        'Interaction Thread Last Updated',
        'Last Resolved At',
        'No Of Messages',
        'priority Name',
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
          'Contact Name': data?.contactName,
          'Email ': data?.emailId,
          'Team': data?.teamName,
          'GSTN': data?.gstn,
          'Problem Reported': data?.problemReported,
          'Docket no': data?.docketNumber,
          'Assign To': data?.assignedTo,
          'Created At': this.datepipe.transform(data?.createdDate, 'yyyy-MM-dd hh:mm:ss a'),
          'Agent Remarks': data?.agentRemarks,
          'Current Status': data?.currentStatus,
          'Escalation Start Date Time': this.datepipe.transform(data?.escalationStartDateTime, 'yyyy-MM-dd hh:mm:ss a'),
          'Interaction Created Through Media': data?.interactionCreatedThroughMedia,
          'Interaction Thread Last Updated': this.datepipe.transform(data?.interactionThreadLastUpdated, 'yyyy-MM-dd hh:mm:ss a'),
          'Last Resolved At': this.datepipe.transform(data?.lastResolvedAt, 'yyyy-MM-dd hh:mm:ss a'),
          'No Of Messages': data?.noOfMessages,
          'priority Name': data?.priorityName,
          'Reopen Flag': data?.reopenFlag,
          'Ticket Assigned Time': this.datepipe.transform(data?.ticketAssignedTime, 'yyyy-MM-dd hh:mm:ss a'),
          'Unique Number': data?.uniqueNumber
        })
      });
      let workBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook, heading);
      let workSheet = XLSX.utils.sheet_add_json(workBook, interactionsReport, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Open Interaction Report List');
      XLSX.writeFile(workBook, 'Open Interaction Report List' + ".xlsx");
    })

  }


}


