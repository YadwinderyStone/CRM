import { Component, OnInit } from '@angular/core';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bulk-transfer-history',
  templateUrl: './bulk-transfer-history.component.html',
  styleUrls: ['./bulk-transfer-history.component.scss']
})
export class BulkTransferHistoryComponent implements OnInit {
  bulkCloserHistoryList: any = [];
  isLoading: boolean = false
  columnsToDisplay = ['name', 'subStatus', 'fileName', 'createdBy', 'createdDate', 'totalRecords', 'updateRecords', 'comment', 'WithCategoryAndSubCategory', 'withProblemId'];
  constructor(
    private interactionCategoryService: InteractionCategoryService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getInteractionBulkHistory();
  }
  getInteractionBulkHistory() {
    this.isLoading = true;
    this.interactionCategoryService.getBulkTransferHistory().subscribe((res: any) => {
      this.bulkCloserHistoryList = res;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.toastrService.error(error);
    })
  }

}


