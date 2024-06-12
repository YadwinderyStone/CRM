import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-resolved-interaction-list',
  templateUrl: './resolved-interaction-list.component.html',
  styleUrls: ['./resolved-interaction-list.component.scss']
})
export class ResolvedInteractionListComponent extends BaseComponent implements OnInit {


    displayedColumns: string[] = ['interactionid','createdat','category','subcatagory']
    // displayedColumns: string[] = ['interactionid','interactiontype','status','substatus','category','subcatagory','contant','createdteam','createdat','assignto', 'gstn','problemreported1','docketno']
    dataSource: any[] = [];
    loading: boolean = false;
    userDetail: any;
    interval: any;
    constructor(private dashboardService: DashboardService, public translationService: TranslationService) {
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
        isAdmin: this.userDetail?.roleId || true,
        skip: 0
      }
      this.loading = true;
      this.dashboardService.getInteractionsListForResolved().subscribe((c: any) => {
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
      if(this.interval) {
      clearInterval(this.interval);
    }
    }
  }