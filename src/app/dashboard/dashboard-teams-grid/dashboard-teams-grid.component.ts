
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { Queue } from '@core/domain-classes/queue.model';
import { DashboardService } from '../dashboard.service';
import { InteractionsByTeam } from './teamsList.model';

@Component({
  selector: 'app-dashboard-teams-grid',
  templateUrl: './dashboard-teams-grid.component.html',
  styleUrls: ['./dashboard-teams-grid.component.scss']
})
export class DashboardTeamsGridComponent extends BaseComponent implements OnInit {
  interval:any;
  teamInteractionsList: InteractionsByTeam[] = [];
  columnsToDisplay: string[] = ['name','total', 'open', 'pending','resolved','closed'];
  constructor(
    private toastrService: ToastrService,
    private dashboardService:DashboardService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
  }


  ngOnInit(): void {
    this.getInteractionsListByTeam();
    this.interval = setInterval(() => {
      this.getInteractionsListByTeam();
    }, 30000);
  }

  getInteractionsListByTeam(): void {
    this.dashboardService.getInteractionListByteam().subscribe((res :any)=> {
      this.teamInteractionsList = res?.body
    },error=>{
      this.toastrService.error(error)
    })
  }

  ngOnDestroy(): void {
    if(this.interval) {
    clearInterval(this.interval);
  }
  }

}