import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SentEmailService } from '../sent-email.service';

@Component({
  selector: 'app-email-sent-item',
  templateUrl: './email-sent-item.component.html',
  styleUrls: ['./email-sent-item.component.scss']
})
export class EmailSentItemComponent extends BaseComponent implements OnInit {
    sentItemsList: any[] = [];
    totalCount: any = 0;
    PageSize: any = 10;
    pageNo: any = 1;
    isLoading:boolean = false
    constructor(
      private sentEmailService: SentEmailService,
      public toasterService: ToastrService,
      private sanitizer: DomSanitizer,
    ) {
      super();
    }
  
    ngOnInit(): void {
      this.getSentEmailList();
    }
    getSentEmailList() {
      this.isLoading = true
      let data = {
        pageSize: this.PageSize,
        PageNumber: this.pageNo
      }
      this.sentEmailService.getSentEmailList(data).subscribe((res: any) => {
        this.sentItemsList = res?.body || res
        this.totalCount = this.sentItemsList[0]?.totalRecords || 0
        this.isLoading = false
      },error=>{
        this.isLoading = false
        this.toasterService.error(error);
      })
    }
    onPageChange(event) {
      this.PageSize = event?.pageSize;
      this.pageNo = event?.pageIndex + 1
      this.getSentEmailList();
    }
  
  
    senitizeContent(data){
      let sanitizedContent:SafeHtml = this.sanitizer.bypassSecurityTrustHtml(data);
     return  sanitizedContent
    }
  
  
  }
  