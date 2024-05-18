import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { InteractionReportListComponent } from './interaction-report-list/interaction-report-list.component';
import { DumpRepoertComponent } from './dump-repoert/dump-repoert.component';

const routes: Routes = [
  {
    path:'',
    component: InteractionReportListComponent,
    data: { claimType: 'REP_PO_REP' },
    canActivate: [AuthGuard]
  },
  {
    path:'dump-reports',
    component: DumpRepoertComponent,
    data: { claimType: 'REP_PO_REP' },
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InteractionReportsRoutingModule { }
