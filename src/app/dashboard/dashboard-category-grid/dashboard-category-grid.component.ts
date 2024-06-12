import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { InteractionsByCategory } from './interactionCategory.model';
@Component({
  selector: 'app-dashboard-category-grid',
  templateUrl: './dashboard-category-grid.component.html',
  styleUrls: ['./dashboard-category-grid.component.scss']
})

export class DashboardCategoryGridComponent extends BaseComponent implements OnInit {
  categoryInteractionsList: InteractionsByCategory[] = [];
  columnsToDisplay: string[] = ['name', 'open', 'pending', 'resolved', 'closed'];
  interval:any;
  constructor(
    private toastrService: ToastrService,
    private dashboardService: DashboardService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
  }

  ngOnInit(): void {
    this.getInteractionListByCategory()
    this.interval = setInterval(() => {
      this.getInteractionListByCategory()
    }, 300000);
  }

  getInteractionListByCategory(): void {
    this.dashboardService.getInteractionListByCategory().subscribe((res: any) => {
      this.categoryInteractionsList = res?.body
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





