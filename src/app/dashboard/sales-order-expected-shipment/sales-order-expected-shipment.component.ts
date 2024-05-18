import { Component, OnInit } from '@angular/core';
import { SalesOrderRecentShipmentDate } from '@core/domain-classes/sales-order-recent-shipment-date';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-sales-order-expected-shipment',
  templateUrl: './sales-order-expected-shipment.component.html',
  styleUrls: ['./sales-order-expected-shipment.component.scss']
})
export class SalesOrderExpectedShipmentComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['interactionid','interactiontype','status','substatus','category','subcatagory','contant','createdteam','createdat','assignto', 'gstn','problemreported1']
  // displayedColumns: string[] = ['interactionid','interactiontype','status','substatus','category','subcatagory','contant','createdteam','createdat','assignto', 'gstn','problemreported1','docketno']
  dataSource: any[] = [];
  loading: boolean = false;
  userDetail:any;
  constructor(private dashboardService: DashboardService,public translationService:TranslationService) {
    super(translationService);
    this.getLangDir();

    this.userDetail = localStorage.getItem('authObj')
  }

  ngOnInit(): void {
    this.getInteractions();
  }

  getInteractions() {
    let data = {
      pageSize:5,
      isAdmin:this.userDetail?.roleId || true,
      skip:0
       }
    this.loading = true;
    this.dashboardService.getInteractionsList(data)
      .subscribe((c:any) => {
        this.loading = false;
        this.dataSource = c?.body || c;
      }, (err) => this.loading = false);
  }

}
