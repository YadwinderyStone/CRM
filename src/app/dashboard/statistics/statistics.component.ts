import { Component, OnInit } from '@angular/core';
import { DashboardStaticatics } from '@core/domain-classes/dashboard-staticatics';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  dashboardStaticatics: any;
  dashboardStaticaticsForUser:any = {
      "teamCount": 0,
      "userCount": 0,
      "contactCount": 0
    
  }
  constructor(private dashboardService: DashboardService) {
    this.dashboardStaticatics = {
      totalPurchase: 0,
      totalSales: 0,
      totalSalesReturn: 0,
      totalPurchaseReturn: 0,
      totalwarehouseReturn: 0,
      totaluserReturn: 0,
      totalvenderReturn: 0,
      totalInventotyReturn: 0,
      totalProductReturn: 0, 
    };
  }

  ngOnInit(): void {
    this.getDashboardStaticatics();
    this.getDashboardCountForUserTeam();
  }

  getDashboardStaticatics() {
    this.dashboardService.getDashboardStaticatics()
      .subscribe((c: DashboardStaticatics) => {
        this.dashboardStaticatics = c;
      })
  }
  getDashboardCountForUserTeam() {
    this.dashboardService.getDashboardStaticaticsForUserTeam()
      .subscribe((c: any) => {
        this.dashboardStaticaticsForUser = c;
      })
  }

}
