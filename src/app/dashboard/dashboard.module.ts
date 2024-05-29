import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderViewComponent } from './calender-view/calender-view.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { SalesOrderExpectedShipmentComponent } from './sales-order-expected-shipment/sales-order-expected-shipment.component';
import { PurchaseOrderExpectedDeliveryComponent } from './purchase-order-expected-delivery/purchase-order-expected-delivery.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DashboardStatusChartComponent } from './dashboard-status-chart/dashboard-status-chart.component';
import { DashboardTeamsGridComponent } from './dashboard-teams-grid/dashboard-teams-grid.component';
import { DashboardStatusGridComponent } from './dashboard-status-grid/dashboard-status-grid.component';
import { DashboardCategoryGridComponent } from './dashboard-category-grid/dashboard-category-grid.component';
import { InteractionListByTeamComponent } from './interaction-list-by-team/interaction-list-by-team.component';
import { PendingInteractionListComponent } from './pending-interaction-list/pending-interaction-list.component';
import { OpenInteractionListComponent } from './open-interaction-list/open-interaction-list.component';
import { InteractionListBySourceComponent } from './interaction-list-by-source/interaction-list-by-source.component';
import { InteractionByCreatedNameComponent } from './interaction-by-created-name/interaction-by-created-name.component';
import { ResolvedInteractionListComponent } from './resolved-interaction-list/resolved-interaction-list.component';
import { ClosedInteractionListComponent } from './closed-interaction-list/closed-interaction-list.component';
import { SubStatusListComponent } from './sub-status-list/sub-status-list.component';

@NgModule({
  declarations: [DashboardComponent,
    CalenderViewComponent,
    BestSellingProductComponent,
    SalesOrderExpectedShipmentComponent,
    PurchaseOrderExpectedDeliveryComponent,
    StatisticsComponent,
    DashboardStatusChartComponent,
    DashboardTeamsGridComponent,
    DashboardStatusGridComponent,
    DashboardCategoryGridComponent,
    InteractionListByTeamComponent,
    PendingInteractionListComponent,
    OpenInteractionListComponent,
    InteractionListBySourceComponent,
    InteractionByCreatedNameComponent,
    ResolvedInteractionListComponent,
    ClosedInteractionListComponent,
    SubStatusListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    ChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class DashboardModule { }
