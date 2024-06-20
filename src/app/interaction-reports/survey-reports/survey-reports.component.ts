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
  selector: 'app-survey-reports',
  templateUrl: './survey-reports.component.html',
  styleUrls: ['./survey-reports.component.scss']
})
export class SurveyReportsComponent extends BaseComponent implements OnInit {
  toDate: any = new Date();
  fromDate: any = new Date();
  currentDate = new Date();
  dataSource: InteractionDataSource;
  isLoading:boolean = false
  displayedColumns: string[] = ['interactionid', 'createdteam', 'createdat', 'dateLastUpdate', 'category', 'subcatagory',
    'csatCategory', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'totalSurveyValue', 'assignedTo', 'gstn', 'name', 'mobile'];
  // displayedColumns: string[] = ['interactionid', 'interactiontype', 'status', 'substatus', 'category', 'subcatagory', 'contant', 'createdteam', 'createdat', 'assignto', 'gstn', 'problemreported1', 'docketno'];
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
    this.dataSource.loadSurveyData(this.inventoryResource);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.inventoryResource.skip = 0;
        this.paginator.pageIndex = 0;
        this.dataSource.loadSurveyData(this.inventoryResource);
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
          this.dataSource.loadSurveyData(this.inventoryResource);
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
    this.dataSource.loadSurveyData(this.inventoryResource);
  }
  searchList() {
    this.setParams();
    this.dataSource.loadSurveyData(this.inventoryResource);
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
    this.interactionReportsService.getSurveyReportsList(this.inventoryResource).subscribe((res: any) => {
      let InteractionRecods: any = res?.body;
      let heading = [[
        'Interaction Id',
        'Team',
        'Created',
        'Date Last Update',
        'Disposition',
        'Sub Disposition',
        'CSAT Category',
        'Q1',
        'Q2',
        'Q3',
        'Q4',
        'Q5',
        'Q6',
        'Q7',
        'Total Survey Value',
        'Assigned To',
        'GSTN',
        'Name',
        'Mobile'
      ]];

      let interactionsReport = [];
      InteractionRecods.forEach(data => {
        interactionsReport.push({
          'Interaction Id': data?.interactionId,
          'Team': data?.team,
          'Created': this.datepipe.transform(data?.created, 'yyyy-MM-dd hh:mm:ss a'),
          'Date Last Update': this.datepipe.transform(data?.dateLastUpdated, 'yyyy-MM-dd hh:mm:ss a'),
          'Disposition': data?.disposition,
          'Sub Disposition': data?.subDisposition,
          'CSAT Category': data?.csatCategory,
          'Q1': data?.q1,
          'Q2': data?.q2,
          'Q3': data?.q3,
          'Q4': data?.q4,
          'Q5': data?.q5,
          'Q6': data?.q6,
          'Q7': data?.q7,
          'Total Survey Value': data?.totalSurveyValue,
          'Assign To': data?.assignedTo,
          'GSTN': data?.gstn,
          'Name': data?.name,
          'Mobile No.': data?.mobileNo,
        })
      });
      let workBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook, heading);
      let workSheet = XLSX.utils.sheet_add_json(workBook, interactionsReport, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Survey Report List');
      XLSX.writeFile(workBook, 'Survey Report List' + ".xlsx");
    this.isLoading = false
    
    },error=>{
      this.isLoading = false
    })

  }
  dowanloadExcal(){
    let url = `Excel/GetExcelFileForSurveyDayReport`
    this.isLoading = true;
    this.setParams();
    this.interactionReportsService.get187InteractionsReportsExcelDowanload(url,this.inventoryResource).subscribe((res: any) => {
      if(res){
      let emailDocumentList =  res
      let receivedData = new Blob([emailDocumentList], { type:'.xlsx' })
      const url = window.URL.createObjectURL(receivedData);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SurveyReports.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.isLoading = false
    }else{
     this.toasterService.warning('No data found for this date')
    }
    },error=>{
      this.toasterService.error(error)
    })
  }

}


