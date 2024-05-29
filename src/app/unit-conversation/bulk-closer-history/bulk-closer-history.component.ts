import { Component, OnInit } from '@angular/core';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bulk-closer-history',
  templateUrl: './bulk-closer-history.component.html',
  styleUrls: ['./bulk-closer-history.component.scss']
})
export class BulkCloserHistoryComponent implements OnInit {
  bulkCloserHistoryList: any = [];
  isLoading:boolean = false
  columnsToDisplay = ['name', 'subStatus', 'fileName', 'createdBy', 'createdDate', 'totalRecords', 'updateRecords', 'comment', 'WithCategoryAndSubCategory', 'withProblemId'];
  constructor(
    private interactionCategoryService: InteractionCategoryService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this. getInteractionBulkHistory();
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
}
