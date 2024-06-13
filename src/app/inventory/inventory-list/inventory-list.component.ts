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
import { InventoryService } from '../inventory.service';
import { InventoryDataSource } from './inventory-datasource';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { InteractionCategory, InteractionStatus, InteractionType } from '@core/domain-classes/interactionCatetgory';
import { Queue } from '@core/domain-classes/queue.model';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdvanceSearchComponent } from '../advance-search/advance-search.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InventoryListComponent extends BaseComponent implements OnInit {

  // priorityList: Queue[] = [];
  typeList: InteractionType[] = [];
  teamList: Queue[] = [];
  statusList: InteractionStatus[] = [];
  subStatusList: InteractionStatus[] = [];
  categoryList: InteractionCategory[] = [];
  subCategoryList: InteractionCategory[] = [];

  toDate: any;
  currentDate: any = new Date();
  fromDate: any;
  prefix: string = 'G-';
  search: string = '';
  gstn: string = ''
  mobileNo: string = ''
  emailId: string = ''
  selectedTeam: string = ''
  selectedType: string = ''
  selectedCategory: string = ''
  selectedSubCategory: string = ''
  selectedStatus: string = ''
  selectedSubStatus: string = ''
  catInput: string = '';
  subCatInput: string = ''
  advanceSearchData: any
  // selectedPriority: string = ''


  dataSource: InventoryDataSource;
  displayedColumns: string[] = ['action', 'interactionid', 'createdat', 'interactiontype', 'status', 'substatus', 'messages', 'contant', 'createdteam', 'assignto', 'reopen', 'category', 'subcatagory', 'gstn', 'problemreported1', 'docketno'];
  // displayedColumns: string[] = ['action', 'interactionid', 'interactiontype', 'status', 'substatus', 'category', 'subcatagory', 'contant', 'createdteam', 'createdat', 'assignto', 'gstn', 'problemreported1', 'docketno'];
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
    private inventoryService: InventoryService,
    public dialog: MatDialog,
    public translationService: TranslationService,
    public toasterService: ToastrService,
    private commonDialogService: CommonDialogService,
    private datePipe: DatePipe,
    private activatedRouter: ActivatedRoute,
    public datepipe: DatePipe
  ) {
    super(translationService);
    this.getLangDir();
    this.inventoryResource = new InventoryResourceParameter();
    this.inventoryResource.pageSize = 10;
    this.inventoryResource.IsAdmin = true
    let toDate = this.datepipe.transform(this.toDate, 'yyyy/MM/dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy/MM/dd');
    this.inventoryResource.toDate = toDate
    this.inventoryResource.fromDate = fromDate
    this.activatedRouter.queryParams.subscribe(res => {
      if (res?.status) {
        let status: any = res?.status
        this.selectedStatus = JSON.parse(status);
        this.inventoryResource.status = this.selectedStatus
      }
    })
  }

  ngOnInit(): void {
    this.dataSource = new InventoryDataSource(this.inventoryService);
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

  deleteInteraction(data) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deleteById(data.id)
        }
      });
  }
  deleteById(id) {
    this.inventoryService.deleteCustomerInteraction(id).subscribe(res => {
      if (!res) { this.dataSource.loadData(this.inventoryResource) }
    }, error => {
      this.toasterService.error(error);
    })
  }


  getTypeList() {
    this.inventoryService.getCategoryList().subscribe(res => {
      this.typeList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }
  getTeamList() {
    this.inventoryService.getTeamsList().subscribe(res => {
      this.teamList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }


  getCatList(id) {
    this.inventoryService.getSubCategoryList(id).subscribe(res => {
      this.categoryList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }
  getSubCatList(id) {
    this.inventoryService.getSubCategoryList(id).subscribe(res => {
      this.subCategoryList = res;

    }, error => {
      this.toasterService.error(error);
    })

  }
  getStatusList() {
    this.inventoryService.getstatusList().subscribe(res => {
      this.statusList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }
  getSubStatusList(id) {
    this.inventoryService.getsubStatusList(id).subscribe(res => {
      this.subStatusList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }

  // getProrityList() {
  //   this.inventoryService.getPriorityList().subscribe(res => {
  //     this.priorityList = res;
  //   }, error => {
  //     this.toasterService.error(error);
  //   })
  // }


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
      this.selectedStatus = '',
      this.selectedSubStatus = '',
      this.inventoryResource.gstn = '',
      this.inventoryResource.mobileNo = '',
      this.inventoryResource.emailId = '';
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.toDate = toDate
    this.inventoryResource.fromDate = fromDate
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
    this.inventoryResource.search = this.search.trim(),
      this.inventoryResource.team = this.selectedTeam,
      this.inventoryResource.type = this.selectedType
    this.inventoryResource.category = this.selectedCategory,
      this.inventoryResource.subCategory = this.selectedSubCategory,
      this.inventoryResource.status = this.selectedStatus,
      this.inventoryResource.subStatus = this.selectedSubStatus
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.toDate = toDate
    this.inventoryResource.fromDate = fromDate
    this.inventoryResource.gstn = this.gstn,
      this.inventoryResource.mobileNo = this.mobileNo
    this.inventoryResource.emailId = this.emailId

    // this.inventoryResource.search = this.search ? this.prefix + this.search : '',
  }


  searchInteractionList() {
    if (this.search) {
      this.inventoryResource.search = this.search.trim();
      this.paginator.pageIndex = 0;
      this.inventoryResource.skip = 0
      this.dataSource.loadData(this.inventoryResource);
    } else {
      this.onClear();
    }
  }

  OpenAdvanceSearch() {
    this.dialog.open(AdvanceSearchComponent, {
      disableClose: false,
      width: '900px',
      maxHeight: '500px',
      height: 'auto',
      data: this.advanceSearchData
    }).afterClosed().subscribe(res => {
      if (res) {
        this.gstn = res?.gstn,
        this.mobileNo = res?.mobileNo,
        this.emailId = res?.emailId,
        this.selectedType = res?.selectedType
        this.selectedCategory = res?.selectedCategory,
        this.selectedTeam = res?.selectedTeam,
        this.selectedSubCategory = res?.selectedSubCategory,
        this.toDate = res?.toDate,
        this.fromDate = res?.fromDate,
        this.advanceSearchData = res
        this.setParams();
        this.dataSource.loadData(this.inventoryResource);
      } else {
        // this.onClear();
      }
    })
  }


  dowanloadList() {
    this.setParams();
    this.inventoryService.getInteractionsList(this.inventoryResource).subscribe((res: any) => {
      let InteractionRecods: any = res?.body;
      let heading = [[
        this.translationService.getValue('Interaction Id'),
        this.translationService.getValue('Interaction Type'),
        this.translationService.getValue('Status'),
        this.translationService.getValue('Sub Status'),
        this.translationService.getValue('Category'),
        this.translationService.getValue('Sub Category'),
        this.translationService.getValue('Subject'),
        this.translationService.getValue('Contact Name'),
        this.translationService.getValue('Email'),
        this.translationService.getValue('Team'),
        this.translationService.getValue('GSTN'),
        this.translationService.getValue('Problem Reported'),
        this.translationService.getValue('Docket no'),
        this.translationService.getValue('Assign To'),
        this.translationService.getValue('Created At'),
        this.translationService.getValue('Agent Remarks'),
      ]];

      let interactionsReport = [];
      InteractionRecods.forEach(data => {
        interactionsReport.push({
          'Interaction Id': data?.transactionNumber,
          'Interaction Type': data?.ticketType,
          'Status': data?.statusName,
          'Sub Status': data?.subStatusName,
          'Category': data?.categoryName,
          'Sub Category': data?.subcategoryName,
          'Subject': data?.subject,
          'Contact Name': data?.contactName,
          'Email ': data?.emailId,
          'Team': data?.teamName || data?.team,
          'GSTN': data?.gstn,
          'Problem Reported': data?.problemReported,
          'Docket no': data?.docketNumber,
          'Assign To': data?.assignToName,
          'Created At': this.datePipe.transform(data?.createDateTime, 'yyyy-MM-dd hh:mm:ss a'),
          'Agent Remarks': data?.agentRemarks,
        })
      });
      let workBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook, heading);
      let workSheet = XLSX.utils.sheet_add_json(workBook, interactionsReport, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Interaction Report');
      XLSX.writeFile(workBook, 'Interaction Report' + ".xlsx");
    })

  }





}
