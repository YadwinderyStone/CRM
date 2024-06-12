import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common'
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
  selector: 'app-grp-tat-reports',
  templateUrl: './grp-tat-reports.component.html',
  styleUrls: ['./grp-tat-reports.component.scss']
})
export class GrpTatReportsComponent extends BaseComponent implements OnInit {
  toDate: any = new Date();
  fromDate: any = new Date();
  currentDate = new Date();
  dataSource: InteractionDataSource;
  isLoading: boolean = false
  displayedColumns: string[] = ['interactionid','resolvedDate','team','timeTaken' ];
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
    this.dataSource.loadGrpTatData(this.inventoryResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.inventoryResource.skip = 0;
        this.paginator.pageIndex = 0;
        this.dataSource.loadGrpTatData(this.inventoryResource);
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
          this.dataSource.loadGrpTatData(this.inventoryResource);
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
    this.dataSource.loadGrpTatData(this.inventoryResource);
  }
  searchList() {
    this.setParams();
    this.dataSource.loadGrpTatData(this.inventoryResource);
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
    this.isLoading = true
    this.setParams();
    this.interactionReportsService.getGrpTatReportsList(this.inventoryResource).subscribe((res: any) => {
      let InteractionRecods: any = res?.body;
      let heading = [[
        'Interaction Id',
        'Resolved Date and Time',
        'Resolved ByTeam',
        'Time Taken(In Hours)'
      ]];

      let interactionsReport = [];
      InteractionRecods.forEach(data => {
        interactionsReport.push({
          'Interaction Id': data?.interactionId,
          'Resolved Date and Time': this.datepipe.transform(data?.dateLastUpdated, 'yyyy-MM-dd hh:mm:ss a'),
          'Resolved ByTeam': data?.team,
          'Time Taken(In Hours)':data?.team
          
        })
      });
      let workBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook, heading);
      let workSheet = XLSX.utils.sheet_add_json(workBook, interactionsReport, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(workBook, workSheet, 'GRP TAT Report');
      XLSX.writeFile(workBook, 'GRP TAT Report' + ".xlsx");
      this.isLoading = false

    }, error => {
      this.isLoading = false
    })

  }


}


