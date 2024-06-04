import { Component, OnInit } from '@angular/core';
import { EmailInboxService } from '../email-inbox.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-inbox',
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.scss']
})
export class EmailInboxComponent implements OnInit {
  inboxList: any[] = [];
  totalCount: any = 0;
  PageSize: any = 10;
  pageNo: any = 1;
  isLoading:boolean = false
  constructor(
    private emailInboxService: EmailInboxService,
    public toasterService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getEmailList();
  }
  getEmailList() {
    this.isLoading = true
    let data = {
      pageSize: this.PageSize,
      PageNumber: this.pageNo
    }
    this.emailInboxService.getInboxEmailList(data).subscribe((res: any) => {
      this.inboxList = res?.body;
      this.totalCount = this.inboxList[0]?.totalRecords || 0
      this.isLoading = false
    }, error => {
      this.isLoading = false
      this.toasterService.error(error);
    })
  }
  onPageChange(event) {
    this.PageSize = event?.pageSize;
    this.pageNo = event?.pageIndex + 1
    this.getEmailList();
  }
  deleteMail(data) {

  }

  checkEnable(event) {


  }


}
