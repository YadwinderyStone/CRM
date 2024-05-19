import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { InteractionReportListComponent } from './interaction-report-list/interaction-report-list.component';
import { DumpRepoertComponent } from './dump-repoert/dump-repoert.component';
import { Reports187Component } from './reports187/reports187.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractionReportsRoutingModule { }
