import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-closed-interaction-list',
  templateUrl: './closed-interaction-list.component.html',
  styleUrls: ['./closed-interaction-list.component.scss']
})
export class ClosedInteractionListComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['interactionid', 'createdat', 'category', 'subcatagory']
  // displayedColumns: string[] = ['interactionid','interactiontype','status','substatus','category','subcatagory','contant','createdteam','createdat','assignto', 'gstn','problemreported1','docketno']
  dataSource: any[] = [];
  loading: boolean = false;
  userDetail: any;
  interval: any;
  constructor(
    private dashboardService: DashboardService,
    private toasterService: ToastrService,
    public translationService: TranslationService


  ) {
    super(translationService);
    this.getLangDir();

    this.userDetail = localStorage.getItem('authObj')
  }

  ngOnInit(): void {
    this.getInteractions();
    this.interval = setInterval(() => {
      this.getInteractions();
    }, 300000);
  }

  getInteractions() {
    let data = {
      pageSize: 5,
      statusName: 'Closed',
      statusId: 2,
      isAdmin: this.userDetail?.roleId || true,
      skip: 0
    }
    this.loading = true;
    this.dashboardService.getInteractionsListForClosed().subscribe((c: any) => {
      if (c.body.data != null) {
        this.loading = false;
        this.dataSource = c?.body.data;
      } else {
        this.loading = false;
        this.dataSource = c?.body.data || [];
      }
    }, (err) => {
      this.loading = false

      this.toasterService.error(err)
    });
  }

}

