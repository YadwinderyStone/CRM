import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { Source } from './source.model';


@Component({
  selector: 'app-interaction-list-by-source',
  templateUrl: './interaction-list-by-source.component.html',
  styleUrls: ['./interaction-list-by-source.component.scss']
})
export class InteractionListBySourceComponent extends BaseComponent implements OnInit {
  interval:any;
  sourceInteractionsList: Source[] = [];
  columnsToDisplay: string[] = ['name', 'total', 'open', 'pending', 'resolved', 'closed'];
  constructor(
    private toastrService: ToastrService,
    private dashboardService: DashboardService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
  }


  ngOnInit(): void {
    this.getInteractionsListBySource()
    this.interval = setInterval(() => {
      this.getInteractionsListBySource()
    }, 30000);
  }

  getInteractionsListBySource(): void {
    this.dashboardService.getInteractionsListBySource().subscribe((res: any) => {
      this.sourceInteractionsList = res?.body
    }, error => {
      this.toastrService.error(error)
    })
  }

  ngOnDestroy(): void {
    if(this.interval) {
    clearInterval(this.interval);
  }
  }
}

