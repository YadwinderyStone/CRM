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
  outboxList: any[] = []
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
    let data = {
      pageSize: 10,
      skip: 0
    }
    this.emailOutBoxService.getOutboxEmailList(data).subscribe((res: any) => {
      this.outboxList = res?.body || res
    },error=>{
      this.toasterService.error(error);
    })
  }

}
