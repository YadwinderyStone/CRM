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

    // this.sourceInteractionsList = [
    //   { source: 'Email', total: 77, open: 12, pending: 15, resolved: 25, closed: 25 },
    //   { source: 'GRP', total: 68, open: 8, pending: 10, resolved: 20, closed: 25 },
    //   { source: 'Voice', total: 182, open: 62, pending: 30, resolved: 40, closed: 50 },
    // ]
  }

  getInteractionsListBySource(): void {
    this.dashboardService.getInteractionsListBySource().subscribe((res: any) => {
      this.sourceInteractionsList = res?.body
    }, error => {
      this.toastrService.error(error)
    })
  }







}
