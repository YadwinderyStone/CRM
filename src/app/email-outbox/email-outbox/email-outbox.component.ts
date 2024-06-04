import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { EmailOutboxService } from '../email-outbox.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-outbox',
  templateUrl: './email-outbox.component.html',
  styleUrls: ['./email-outbox.component.scss']
})
export class EmailOutboxComponent extends BaseComponent implements OnInit {
  outboxList: any[] = [];
  totalCount: any = 0;
  PageSize: any = 10;
  pageNo: any = 1;
  isLoading:boolean = false
  constructor(
    private emailOutBoxService: EmailOutboxService,
    public toasterService: ToastrService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getEmailOutboxList();
  }
  getEmailOutboxList() {
    this.isLoading = true
    let data = {
      pageSize: this.PageSize,
      PageNumber: this.pageNo
    }
    this.emailOutBoxService.getOutboxEmailList(data).subscribe((res: any) => {
      this.outboxList = res?.body || res
      this.totalCount = this.outboxList[0]?.totalRecords || 0
      this.isLoading = false
    },error=>{
      this.isLoading = false
      this.toasterService.error(error);
    })
  }
  onPageChange(event) {
    this.PageSize = event?.pageSize;
    this.pageNo = event?.pageIndex + 1
    this.getEmailOutboxList();
  }
}
