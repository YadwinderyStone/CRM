import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { EscalationListComponent } from './escalation-list/escalation-list.component';

const routes: Routes = [
  {
    path: '',
    component: EscalationListComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_VIEW_QUE' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscalationRoutingModule { }
