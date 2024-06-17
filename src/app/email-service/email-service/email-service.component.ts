import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { emailStatusModel } from '../status.model';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-email-service',
  templateUrl: './email-service.component.html',
  styleUrls: ['./email-service.component.scss']
})
export class EmailServiceComponent extends BaseComponent implements OnInit {
  list: emailStatusModel[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['appName','threadName','appStatus','machineName', 'appLastUpdated'];

  columnsToDisplay: string[] = ["footer"];
  constructor(
    private emailservices: EmailService,
    private toasterService: ToastrService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.emailservices.getEmailStatus().subscribe((res: any) => {
      this.list = res
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.toasterService.error(error)
    })



  }

}