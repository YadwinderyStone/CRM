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
    // this.getInteractionListByCategory()

    this.categoryInteractionsList = [
      { categoryName: 'Amnesty scheme', total: 77, open: 12, pending: 15, resolved: 25, closed: 25 },
      { categoryName: 'Appeal', total: 68, open: 8, pending: 10, resolved: 20, closed: 25 },
      { categoryName: 'Appeals', total: 182, open: 62, pending: 30, resolved: 40, closed: 50 },
      { categoryName: 'Registration', total: 160, open: 50, pending: 30, resolved: 35, closed: 45 },
    ]
  }

  getInteractionListByCategory(): void {
    this.dashboardService.getInteractionListByCategory().subscribe((res: any) => {
      this.categoryInteractionsList = res
    }, error => {
      this.toastrService.error(error)
    })
  }







}

