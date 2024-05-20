import { Component, OnInit } from '@angular/core';
import { EmailInboxService } from '../email-inbox.service';

@Component({
  selector: 'app-email-inbox',
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.scss']
})
export class EmailInboxComponent implements OnInit {
  constructor(
    private emailInboxService:EmailInboxService
  ) { }

  ngOnInit(): void {
    this.getEmailList();
  }
  getEmailList(){
    let data ={
      pageSize:10,
      skip:0
    }
    this.emailInboxService.getInboxEmailList(data).subscribe(res=>{

    })
  }

}
