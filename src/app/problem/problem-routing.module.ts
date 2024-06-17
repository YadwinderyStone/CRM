import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { ProblemComponent } from './problem/problem.component';

const routes: Routes = [
  {
    path: '',
    component: ProblemComponent,
    canActivate: [AuthGuard],
   data: { claimType: ['MST_VIEW_PROBLEM'] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemRoutingModule { }
