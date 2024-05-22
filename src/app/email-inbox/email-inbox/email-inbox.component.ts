import { Component, OnInit } from '@angular/core';
import { EmailInboxService } from '../email-inbox.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-inbox',
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.scss']
})
export class EmailInboxComponent implements OnInit {
  inboxList: any[] = []
  constructor(
    private emailInboxService: EmailInboxService,
    public toasterService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getEmailList();
  }
  getEmailList() {
    let data = {
      pageSize: 10,
      skip: 0
    }
    this.emailInboxService.getInboxEmailList(data).subscribe((res: any) => {
      this.inboxList = res?.body;
    },error=>{
      this.toasterService.error(error);
    })
  }

  deleteMail(data){

  }

  checkEnable(event){


  }


}
