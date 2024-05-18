import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/inventory/inventory.service';

@Component({
  selector: 'app-customer-interactions',
  templateUrl: './customer-interactions.component.html',
  styleUrls: ['./customer-interactions.component.scss']
})
export class CustomerInteractionsComponent implements OnInit {
  isLoading = false;
  customerInteractions: any = [];
  pageSize = 10;
  pageIndex;
  totalCount = 0;
  skip: number = 0;
  displayedColumns: string[] = ['interactionid','contant', 'interactiontype','createdteam', 'assignto','status','substatus', 'category', 'subcatagory', 'gstn', 'problemreported1', 'docketno', 'lastresolveat'];
  columnsToDisplay: string[] = ["footer"];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() customerDetail: any;
  
  constructor(
    private inventoryService: InventoryService,
    private commonDialogService: CommonDialogService,
    public toasterService: ToastrService,
    public translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.getInteractions();
  }

  getInteractions() {
    this.isLoading = true
    let params = {
      isAdmin: false,
      name: this.customerDetail?.name,
      contactId:this.customerDetail?.id,
      pageSize: this.pageSize,
      skip: this.skip
    }
    this.inventoryService.getInteractionsListForContact(params).subscribe((res: any) => {
      if (res) {
          this.isLoading = false;
        this.customerInteractions = res?.data;
        this.totalCount = res?.data?.length;       
      }
    }, error => {
      this.toasterService.error(error);
      this.isLoading = false;
    })
  }

  deleteInteraction(data): void {
    this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deleteInteractionById(data.id);
        }
      });
  }

  pageChange(pi, pageSize) {
    this.skip = pi
    this.pageSize = pageSize
    this.getInteractions();
  }

  deleteInteractionById(id) {
    this.isLoading = true;
    this.inventoryService.deleteCustomerInteraction(id).subscribe(res => {
      if (res) {
        this.isLoading = false;
        this.toasterService.success('Interaction deleted successfully.')
        this.getInteractions();
      }
    }, error => {
      this.isLoading = false;
      this.toasterService.error(error)
    })
  }

}
