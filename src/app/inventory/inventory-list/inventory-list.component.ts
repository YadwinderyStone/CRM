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


  prefix: string = 'G-';
  search: string = '';
  selectedTeam: string = ''
  selectedType: string = ''
  selectedCategory: string = ''
  selectedSubCategory: string = ''
  selectedStatus: string = ''
  selectedSubStatus: string = ''
  catInput: string = '';
  subCatInput: string = ''
  // selectedPriority: string = ''


  dataSource: InventoryDataSource;
  displayedColumns: string[] = ['action', 'interactionid', 'interactiontype', 'status', 'substatus', 'contant', 'createdteam', 'assignto', 'createdat', 'category', 'subcatagory', 'gstn', 'problemreported1', 'docketno'];
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
    private cd: ChangeDetectorRef,
    public translationService: TranslationService,
    public toasterService: ToastrService,
    private commonDialogService: CommonDialogService,
    private datePipe: DatePipe,
    private dialog: MatDialog) {
    super(translationService);
    this.getLangDir();
    this.inventoryResource = new InventoryResourceParameter();
    this.inventoryResource.pageSize = 10;
    this.inventoryResource.IsAdmin = true
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

  toggleRow(element: Inventory) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.cd.detectChanges();
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
      // this.selectedPriority = ''
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
    this.inventoryResource.search = this.search ? this.prefix + this.search : '',
      this.inventoryResource.team = this.selectedTeam,
      this.inventoryResource.category = this.selectedCategory,
      this.inventoryResource.subCategory = this.selectedSubCategory,
      this.inventoryResource.status = this.selectedStatus,
      this.inventoryResource.subStatus = this.selectedSubStatus
    // this.inventoryResource.priority = this.selectedPriority
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
          'Team': data?.teamName,
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
