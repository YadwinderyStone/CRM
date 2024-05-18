import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-interaction-list-by-team',
  templateUrl: './interaction-list-by-team.component.html',
  styleUrls: ['./interaction-list-by-team.component.scss']
})
export class InteractionListByTeamComponent extends BaseComponent implements OnInit {

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
// FIXME: change team name to dynamic
  getInteractions() {
    let data = {
      pageSize: 5,
      TeamId: 'L0',
      isAdmin: this.userDetail?.roleId || true,
      skip: 0
    }
    this.loading = true;
    this.dashboardService.getInteractionsListByTeamId(data)
      .subscribe((c: any) => {
        this.dataSource = c?.body;
        // if(c?.body.data !== null)
        // {
        //   this.loading = false;
        // this.dataSource = c?.body.data;
        // } else {
        //   this.loading = false;
        // this.dataSource = c?.body.data ||[];
        // }
        
      }, (err) => this.loading = false);
  }

}
