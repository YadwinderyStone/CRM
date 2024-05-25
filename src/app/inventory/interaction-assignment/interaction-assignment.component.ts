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
import { ManageInventoryComponent } from '../manage-inventory/manage-inventory.component';
import { InventoryDataSource } from '../inventory-list/inventory-datasource';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { InteractionCategory, InteractionStatus, InteractionType } from '@core/domain-classes/interactionCatetgory';
import { Queue } from '@core/domain-classes/queue.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-interaction-assignment',
  templateUrl: './interaction-assignment.component.html',
  styleUrls: ['./interaction-assignment.component.scss']
})
export class InteractionAssignmentComponent extends BaseComponent implements OnInit {

  typeList: InteractionType[] = [];
  teamList: Queue[] = [];
  statusList: InteractionStatus[] = [];
  subStatusList: InteractionStatus[] = [];
  categoryList: InteractionCategory[] = [];
  subCategoryList: InteractionCategory[] = [];
  AssignToTeamList: any = [];

  selectedAssignTeam: string = ''
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
  fromDate: any = new Date();
  currentDate = new Date();
  interactionIds = [];
  selectedTeamsIds = [];
  dataSource: InventoryDataSource;
  displayedColumns: string[] = ['action', 'interactionid', 'interactiontype', 'status', 'substatus', 'category', 'subcatagory', 'contant', 'createdteam', 'createdat', 'assignto', 'gstn', 'problemreported1', 'docketno'];
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
    public datepipe: DatePipe,
    public translationService: TranslationService,
    public toasterService: ToastrService,
  ) {
    super(translationService);
    this.getLangDir();
    this.inventoryResource = new InventoryResourceParameter();
    this.inventoryResource.pageSize = 10;
    this.inventoryResource.orderBy = 'productName asc'
    this.inventoryResource.IsAdmin = true
    let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
    let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
    this.inventoryResource.fromDate = toDate
    this.inventoryResource.toDate = fromDate
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
    this.getTypeList();
    this.getStatusList();
    this.getTeamList();
    this.getCatList(2);
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


  onAssignTeamChange(event) {
    this.AssignToTeamList = [];
    let teamName = event?.value?.name
    if (teamName == 'L0') {
      this.AssignToTeamList = this.teamList.filter(e => e.name == 'L1');
    }
    if (teamName == 'L1') {
      this.AssignToTeamList = this.teamList.filter(e => (e.name == 'L2' || e.name == 'GSTN' || e.name == 'NIC' || e.name == 'IRIS' || e.name == 'EY' || e.name == 'CYGNET' || e.name == 'CLEAR' || e.name == 'E-Connect'));
    }
    if (teamName == 'L2') {
      this.AssignToTeamList = this.teamList.filter(e => (e.name == 'L1' || e.name == 'L2' || e.name == 'L3' ||
      e.name == 'GSTN' || e.name == 'NIC' || e.name == 'IRIS' || e.name == 'EY' || e.name == 'CYGNET' || 
      e.name == 'CLEAR' || e.name == 'E-Connect' || e.name == 'E-Connect' || e.name == 'MMI' || e.name == 'RE' 
      || e.name == 'NIC-L3-EINVAPI' || e.name == 'NIC-L3-EINVWEB' || e.name == 'NIC-L3-EWBAPI' || e.name == 'NIC-L3-EWBWEB'));
    }
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
  onChange(id) {
    let index = this.interactionIds.indexOf(id);    // <-- Not supported in <IE9
    if (index !== -1) {
      this.interactionIds.splice(index, 1);
    } else {
      this.interactionIds.push(id)
    }
  }

  assigntoTeam() {
    if (this.interactionIds.length && this.selectedTeamsIds.length) {

    }
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
      this.setParams();
      this.fromDate = new Date();
      this.toDate = new Date();
      let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
      let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
      this.inventoryResource.fromDate = toDate
      this.inventoryResource.toDate = fromDate
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
    this.inventoryResource.search = this.search? this.prefix+this.search:'',
      this.inventoryResource.team = this.selectedTeam,
      this.inventoryResource.category = this.selectedCategory,
      this.inventoryResource.subCategory = this.selectedSubCategory,
      this.inventoryResource.status = this.selectedStatus,
      this.inventoryResource.subStatus = this.selectedSubStatus
      let toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
      let fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
      this.inventoryResource.toDate = toDate
      this.inventoryResource.fromDate = fromDate
  }

  onSelectAll(event){
// FIXME : NEED to add select all functionality
  }


}
