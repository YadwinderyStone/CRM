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
  selector: 'app-sla-reports',
  templateUrl: './sla-reports.component.html',
  styleUrls: ['./sla-reports.component.scss']
})
export class SLAReportsComponent  extends BaseComponent implements OnInit {
   toDate: any = new Date();
   fromDate: any = new Date();
   currentDate = new Date();
   dataSource: InteractionDataSource;
   isLoading: boolean = false
   displayedColumns: string[] = ['interactionId','createdTeam','subject','gstn','assignedTo','interactionState','interactionSubState','interactionThreadLastUpdated','disposition','subDisposition','problemReported','docketNumber','interactionCreatedThroughMedia','escalationStartDateTime','ticketAssignedTime','lastResolvedAt','uniqueNumber','reopenFlag','problemId','assignToL2TeamNew']
   columnsToDisplay: string[] = ["footer"];
   inventoryResource: InventoryResourceParameter;
   loading$: Observable<boolean>;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   _productNameFilter: string;
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
     this.dataSource.loadSlaData(this.inventoryResource);
     this.getResourceParameter();
     this.sub$.sink = this.filterObservable$
       .pipe(
         debounceTime(1000),
         distinctUntilChanged())
       .subscribe((c) => {
         this.inventoryResource.skip = 0;
         this.paginator.pageIndex = 0;
         this.dataSource.loadSlaData(this.inventoryResource);
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
           this.dataSource.loadSlaData(this.inventoryResource);
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
     this.dataSource.loadSlaData(this.inventoryResource);
   }
   searchList() {
     this.setParams();
     this.dataSource.loadSlaData(this.inventoryResource);
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
     this.interactionReportsService.getSlaReportsListDowanload(this.inventoryResource).subscribe((res: any) => {
       let InteractionRecods: any = res?.body;
       let heading = [[
        'Interaction ID',
        'Created Team',
        'Subject',
        'GSTN',
        'Assigned To',
        'Interaction State',
        'Interaction Sub State',
        'Interaction Thread Last Updated',
        'Disposition',
        'Sub Disposition',
        'Problem Reported',
        'Docket Number',
        'Interaction Created Through Media',
        'Escalation Start Date Time',
        'Ticket Assigned Time',
        'Last Resolved At',
        'Unique Number',
        'Reopen Flag',
        'Problem Id',
        'Assign To L2 Team New'
      ]];
 
       let interactionsReport = [];
       InteractionRecods.forEach(data => {
         interactionsReport.push({
           'Interaction Id': data?.interactionId,
           'Created Team': data?.createdTeam,
           'Subject':data?.subject,
           'GSTN':data?.gstn,
           'Assigned To':data?.assignToName,
           'Interaction State':data?.interactionState,
           'Interaction Sub State':data?.interactionSubState,
           'Interaction Thread Last Updated':data?.interactionThreadLastUpdated,
           'Disposition':data?.disposition,
           'Sub Disposition':data?.subDisposition,
           'Problem Reported':data?.problemReported,
           'Docket Number':data?.docketNumber,
           'Interaction Created Through Media':data?.interactionCreatedThroughMedia,
           'Escalation Start Date Time':data?.escalationStartDateTime,
           'Ticket Assigned Time':data?.ticketAssignedTime,
           'Last Resolved At':data?.lastResolvedAt,
           'Unique Number':data?.uniqueNumber,
           'Reopen Flag':data?.reopenFlag,
           'Problem Id':data?.problemID,
           'Assign To L2 Team New':data?.assignToL2TeamNew,
         })
       });
       let workBook = XLSX.utils.book_new();
       XLSX.utils.sheet_add_aoa(workBook, heading);
       let workSheet = XLSX.utils.sheet_add_json(workBook, interactionsReport, { origin: "A2", skipHeader: true });
       XLSX.utils.book_append_sheet(workBook, workSheet, 'SLA 14B Report');
       XLSX.writeFile(workBook, 'SLA 14B Report' + ".xlsx");
       this.isLoading = false
 
     }, error => {
       this.isLoading = false
     })
 
   }
 
   dowanloadExcal(){
    // FIXME: need to fix api end points
     let url = `Excel/GetExcelFileForSLA14BReport`
     this.isLoading = true;
     this.setParams();
     this.interactionReportsService.get187InteractionsReportsExcelDowanload(url,this.inventoryResource).subscribe((res: any) => {
       debugger
       let emailDocumentList =  res
       let receivedData = new Blob([emailDocumentList], { type:'.xlsx' })
       const url = window.URL.createObjectURL(receivedData);
       const a = document.createElement('a');
       a.href = url;
       a.download = 'SLA14BReports.xlsx';
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       URL.revokeObjectURL(url);
       this.isLoading = false
      
     },error=>{
       this.toasterService.error(error)
       this.isLoading = false
 
     })
   }
 
 
 }
 
 
 