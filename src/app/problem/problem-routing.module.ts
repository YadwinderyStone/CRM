import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { RoleProblemlistComponent } from './role-problemlist/role-problemlist.component';
import { AddRoleProblemComponent } from './add-role-problem/add-role-problem.component';
import { ProblemComponent } from './problem/problem.component';

const routes: Routes = [
// FIXME : change the claim type saccording to role
  {
    path: '',
    component: ProblemComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_VIEW_QUE' },
  },
  {
    path: 'add',
    component: AddRoleProblemComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_ADD_QUE' },
  },
  {
    path: 'edit/:id',
    component: AddRoleProblemComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_UPDATE_QUE' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemRoutingModule { }
