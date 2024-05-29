import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-sub-status-list',
  templateUrl: './sub-status-list.component.html',
  styleUrls: ['./sub-status-list.component.scss']
})
export class SubStatusListComponent extends BaseComponent implements OnInit {
    displayedColumns: string[] = ['total','assignToTechnicalTeam', 'responseReceivedFromEmail',
    'responseReceivedFromGRP','bulkCloser','closed', 'open', 'assignedBacktoL1','iris','eY_EarnstAndYoung',
    'assignedToMMI','assignedToCYGNET', 'assignedToClearTax', 'assignedtoNIC', 'assignedtoGstn', 'reOpen',
    'aciFollowUp', 'aciFollowUp2', 'aciFollowUp3','aciNoResponseReceivedResolved', 'resolved']
     
    
    
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
        isAdmin: this.userDetail?.roleId || true,
        skip: 0
      }
      this.loading = true;
      this.dashboardService.getInteractionsListBySubStatus(data)
        .subscribe((c: any) => {
          this.dataSource = [c?.body];
          this.loading = false;  
        }, (err) => this.loading = false);
    }
  
  }
  
