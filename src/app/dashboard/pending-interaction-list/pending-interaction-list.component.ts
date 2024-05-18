import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-pending-interaction-list',
  templateUrl: './pending-interaction-list.component.html',
  styleUrls: ['./pending-interaction-list.component.scss']
})
export class PendingInteractionListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['interactionid', 'interactiontype', 'status', 'substatus', 'category', 'subcatagory', 'contant', 'createdteam', 'createdat', 'assignto', 'gstn', 'problemreported1']
  // displayedColumns: string[] = ['interactionid','interactiontype','status','substatus','category','subcatagory','contant','createdteam','createdat','assignto', 'gstn','problemreported1','docketno']
  dataSource: any[] = [];
  loading: boolean = false;
  userDetail: any;
  constructor(private dashboardService: DashboardService, public translationService: TranslationService) {
    super(translationService);
    this.getLangDir();

    this.userDetail = localStorage.getItem('authObj')
  }

  ngOnInit(): void {
    this.getInteractions();
  }

  getInteractions() {
    let data = {
      pageSize: 5,
      statusName: 'PENDING',
      statusId: 2,
      isAdmin: this.userDetail?.roleId || true,
      skip: 0
    }
    this.loading = true;
    this.dashboardService.getInteractionsListForPending()
      .subscribe((c: any) => {
        this.loading = false;
        this.dataSource = c?.body || c;
      }, (err) => this.loading = false);
  }

}
