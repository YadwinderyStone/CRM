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
  displayedColumns: string[] = ['interactionid','createdat','category','subcatagory']
  // displayedColumns: string[] = ['interactionid','interactiontype','status','substatus','category','subcatagory','contant','createdteam','createdat','assignto', 'gstn','problemreported1','docketno']
  dataSource: any[] = [];
  loading: boolean = false;
  userDetail: any;
  interval:any;
  constructor(private dashboardService: DashboardService, public translationService: TranslationService) {
    super(translationService);
    this.getLangDir();

    this.userDetail = localStorage.getItem('authObj')
  }

  ngOnInit(): void {
    this.getInteractions();
    this.interval = setInterval(() => {
      this.getInteractions();
    }, 30000);
    
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
    this.dashboardService.getInteractionsListForPending().subscribe((c: any) => {
        if(c.body.data!=null){
          this.loading = false;
        this.dataSource = c?.body.data;
        } else{
          this.loading = false;
          this.dataSource = c?.body.data || [];
        }
      }, (err) => this.loading = false);
  }
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
