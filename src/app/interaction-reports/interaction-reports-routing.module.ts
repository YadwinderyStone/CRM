import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { InteractionReportListComponent } from './interaction-report-list/interaction-report-list.component';
import { DumpRepoertComponent } from './dump-repoert/dump-repoert.component';
import { Reports187Component } from './reports187/reports187.component';
import { PendingInteractionListComponent } from '../dashboard/pending-interaction-list/pending-interaction-list.component';
import { ReopenInteractionsReportsListComponent } from './reopen-interactions-reports-list/reopen-interactions-reports-list.component';
import { ResolvedInteractionListComponent } from '../dashboard/resolved-interaction-list/resolved-interaction-list.component';
import { ClosedInteractionListComponent } from '../dashboard/closed-interaction-list/closed-interaction-list.component';
import { OpenInteractionListComponent } from '../dashboard/open-interaction-list/open-interaction-list.component';
import { OpenInteractionsReportComponent } from './open-interactions-report/open-interactions-report.component';
import { ClosedInteractionsReportsListComponent } from './closed-interactions-reports-list/closed-interactions-reports-list.component';
import { PendingInteractionsReportsListComponent } from './pending-interactions-reports-list/pending-interactions-reports-list.component';
import { ResolvedInteractionsReportsListComponent } from './resolved-interactions-reports-list/resolved-interactions-reports-list.component';
import { Reports185ListComponent } from './reports185-list/reports185-list.component';
import { L2L3InteractionsReportsListComponent } from './l2-l3-interactions-reports-list/l2-l3-interactions-reports-list.component';

const routes: Routes = [
  {
    path:'',
    component: InteractionReportListComponent,
    data: { claimType: 'REP_INTERCATION_REPPORT' },
    canActivate: [AuthGuard]
  },
  {
    path:'dump-reports',
    component: DumpRepoertComponent,
    data: { claimType: 'REP_INTERCATION_DUMP_REPORT' },
    canActivate: [AuthGuard]
  },
  {
    path:'187-reports',
    component: Reports187Component,
    data: { claimType: 'REP_INTERCATION_187_REPORT' },
    canActivate: [AuthGuard]
  },
  {
    path:'185-reports',
    component: Reports185ListComponent,
    data: { claimType: 'REP_INTERCATION_185_REPORT' },
    canActivate: [AuthGuard]
  },
  {
    // fixme need to change claim for all
    path:'closed-reports',
    component: ClosedInteractionsReportsListComponent,
    data: { claimType: 'REP_INTERCATION_CLOSED_REPORT' },
    canActivate: [AuthGuard]
  },
  {
    path:'open-reports',
    component: OpenInteractionsReportComponent,
    data: { claimType: 'REP_INTERCATION_OPEN_REPORT' },
    canActivate: [AuthGuard]
  },
  {
    path:'pending-reports',
    component: PendingInteractionsReportsListComponent,
    data: { claimType: 'REP_INTERCATION_PENDING_REPORT' },
    canActivate: [AuthGuard]
  }
  ,
  {
    path:'reopen-reports',
    component: ReopenInteractionsReportsListComponent,
    data: { claimType: 'REP_INTERCATION_REOPEN_REPORT' },
    canActivate: [AuthGuard]
  },
  {
    path:'resolved-reports',
    component: ResolvedInteractionsReportsListComponent,
    data: { claimType: 'REP_INTERCATION_RESOLVED_REPORT' },
    canActivate: [AuthGuard]
  },
  {
    path:'L2-L3-reports',
    component: L2L3InteractionsReportsListComponent,
    data: { claimType: 'REP_INTERCATION_L2L3_REPORT' },
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractionReportsRoutingModule { }
