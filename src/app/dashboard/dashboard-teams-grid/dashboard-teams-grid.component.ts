
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
    this.getInteractionsListByTeam()

    // this.teamInteractionsList = [
    //   {teamName:'L0',total:77,open:12,pending:15,resolved:25,closed:25},
    //   {teamName:'L1',total:68,open:8,pending:10,resolved:20,closed:25},
    //   {teamName:'L2',total:182,open:62,pending:30,resolved:40,closed:50},
    //   {teamName:'L3',total:160,open:50,pending:30,resolved:35,closed:45},
    // ]
  }

  getInteractionsListByTeam(): void {
    this.dashboardService.getInteractionListByteam().subscribe((res :any)=> {
      this.teamInteractionsList = res?.body
    },error=>{
      this.toastrService.error(error)
    })
  }







}