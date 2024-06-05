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
import { InteractionDataSource } from './interaction-reports-datasource';
import { ToastrService } from 'ngx-toastr';
import { InteractionCategory, InteractionStatus, InteractionType } from '@core/domain-classes/interactionCatetgory';
import { Queue } from '@core/domain-classes/queue.model';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-interaction-report-list',
  templateUrl: './interaction-report-list.component.html',
  styleUrls: ['./interaction-report-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InteractionReportListComponent extends BaseComponent implements OnInit {
  typeList: InteractionType[] = [];
  teamList: Queue[] = [];
  statusList: InteractionStatus[] = [];
  subStatusList: InteractionStatus[] = [];
  categoryList: InteractionCategory[] = [];
  subCategoryList: InteractionCategory[] = [];

  prefix = 'G-'
  search: string = '';
  selectedTeam: string = ''
  selectedType: string = ''
  selectedCategory: string = ''
  selectedSubCategory: string = ''
  selectedStatus: string = ''
  selectedSubStatus: string = ''
  catInput: string = '';
  subCatInput: string = ''
  toDate: any = new Date();
  currentDate: any = new Date();
  fromDate: any = new Date();


  dataSource: InteractionDataSource;
  displayedColumns: string[] = ['interactionid', 'interactiontype', 'createdat', 'status', 'substatus',
    'subject', 'category', 'subcatagory', 'contant',
    'createdteam', 'assignto', 'gstn', 'problemreported1', 'docketno', 'currentStatus',
    'emailId', 'escalationStartDateTime', 'interactionCreatedThroughMedia',
    'interactionThreadLastUpdated', 'lastResolvedAt', 'noOfMessages', 'priorityName', 'reopenFlag', 'ticketAssignedTime', 'uniqueNumber'];
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
    let toDate = this.datepipe.transform(this.toDate, 'yyyy/MM/dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy/MM/dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate
  }

  ngOnInit(): void {
    this.dataSource = new InteractionDataSource(this.interactionReportsService);
    this.dataSource.loadData(this.inventoryResource);
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
        this.dataSource.loadData(this.inventoryResource);
      });

    // this.getProrityList();
    this.getTypeList();
    this.getStatusList();
    this.getTeamList();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.inventoryResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.inventoryResource.pageSize = this.paginator.pageSize;
          this.inventoryResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.inventoryResource);
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

  getTypeList() {
    this.interactionReportsService.getCategoryList().subscribe(res => {
      this.typeList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }
  getTeamList() {
    this.interactionReportsService.getTeamsList().subscribe(res => {
      this.teamList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }


  getCatList(id) {
    this.interactionReportsService.getSubCategoryList(id).subscribe(res => {
      this.categoryList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }
  getSubCatList(id) {
    this.interactionReportsService.getSubCategoryList(id).subscribe(res => {
      this.subCategoryList = res;

    }, error => {
      this.toasterService.error(error);
    })

  }
  getStatusList() {
    this.interactionReportsService.getstatusList().subscribe(res => {
      this.statusList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }
  getSubStatusList(id) {
    this.interactionReportsService.getsubStatusList(id).subscribe(res => {
      this.subStatusList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }


  onStatusChange(event) {
    this.selectedSubStatus = ''
    this.getSubStatusList(event?.value);
  }


  onTypeChange(event) {
    this.selectedCategory = ''
    this.getCatList(event?.value);
  }

  onCatChange(event) {
    this.selectedSubCategory = ''
    this.getSubCatList(event?.value)
  }

  onClear() {
    this.search = '',
      this.selectedTeam = '',
      this.selectedType = '',
      this.selectedCategory = '',
      this.selectedSubCategory = '',
      this.selectedStatus = '';
    this.selectedSubStatus = '';
    // this.selectedPriority = '';
    this.fromDate = new Date();
    this.toDate = new Date();
    let toDate = this.datepipe.transform(this.toDate, 'yyyy/MM/dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy/MM/dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate
    this.setParams();
    this.dataSource.loadData(this.inventoryResource);
  }
  searchList() {
    this.setParams();
    this.dataSource.loadData(this.inventoryResource);
  }

  setParams() {
    this.paginator.pageIndex = 0;
    this.inventoryResource.skip = 0
    this.inventoryResource.type = this.selectedType
    // this.inventoryResource.search = this.search? this.prefix+this.search.trim():'',
    this.inventoryResource.search = this.search.trim(),
      this.inventoryResource.team = this.selectedTeam,
      this.inventoryResource.category = this.selectedCategory,
      this.inventoryResource.subCategory = this.selectedSubCategory,
      this.inventoryResource.status = this.selectedStatus,
      this.inventoryResource.subStatus = this.selectedSubStatus;
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.toDate = toDate
    this.inventoryResource.fromDate = fromDate
  }


  dowanloadList() {
    this.setParams();
    this.interactionReportsService.getInteractionsReportsList(this.inventoryResource).subscribe((res: any) => {
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
          'Contact Name': data?.contactName,
          'Email ': data?.emailId,
          'Team': data?.team,
          'GSTN': data?.gstn,
          'Problem Reported': data?.problemReported,
          'Docket no': data?.docketNumber,
          'Assign To': data?.assignToName || data?.assignedTo,
          'Created At': this.datepipe.transform(data?.createdDate, 'yyyy-MM-dd hh:mm:ss a'),
          'Agent Remarks': data?.agentRemarks,
          'Current Status': data?.currentStatus,
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
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Interaction Report List');
      XLSX.writeFile(workBook, 'Interaction Report List' + ".xlsx");
    })

  }




}
