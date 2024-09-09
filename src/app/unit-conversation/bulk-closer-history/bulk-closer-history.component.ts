import { Component, OnInit } from '@angular/core';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common'
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bulk-closer-history',
  templateUrl: './bulk-closer-history.component.html',
  styleUrls: ['./bulk-closer-history.component.scss']
})
export class BulkCloserHistoryComponent implements OnInit {
  bulkCloserHistoryList: any = [];
  isLoading: boolean = false
  columnsToDisplay = ['name', 'fileName', 'createdBy', 'createdDate', 'totalRecords', 'updateRecords', 'comment', 'WithCategoryAndSubCategory', 'withProblemId'];
  constructor(
    private interactionCategoryService: InteractionCategoryService,
    private toastrService: ToastrService,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getInteractionBulkHistory();
  }
  getInteractionBulkHistory() {
    this.isLoading = true;
    this.interactionCategoryService.getBulkCloserHistory().subscribe((res: any) => {
      this.bulkCloserHistoryList = res;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.toastrService.error(error);
    })
  }

  downloadExcel() {
    if (this.bulkCloserHistoryList.length == 0) {
      return
    }this.isLoading=true;
    let InteractionRecods: any = this.bulkCloserHistoryList;
    let heading = [[
      'Name',
      'File Name',
      'Created By',
      'Created Date',
      'Total Records',
      'Update Records',
      'With Resolution Comment',
      'With Category And SubCategory',
      'with ProblemId']
    ];

    let interactionsReport = [];
    InteractionRecods.forEach(data => {
      interactionsReport.push({
        'Name': data?.name,
        'File Name': data?.fileName,
        'Created By': data?.createdByName,
        'Created Date': this.datePipe.transform(data?.createdDate, 'yyyy-MM-dd hh:mm:ss a'),
        'Total Records': data?.totalRecords,
        'Update Records': data?.updateRecords,
        'With Resolution Comment': data?.withResolutionComment,
        'With Category And SubCategory': data?.withCategoryAndSubCategory,
        'with ProblemId': data?.withProblemId
      })
    });
    let workBook = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(workBook, heading);
    let workSheet = XLSX.utils.sheet_add_json(workBook, interactionsReport, { origin: "A2", skipHeader: true });
    XLSX.utils.book_append_sheet(workBook, workSheet, 'BulkCloserInteractionReportList');
    XLSX.writeFile(workBook, 'BulkCloserInteractionReportList' + ".xlsx");
    this.isLoading = false;
  }

}

