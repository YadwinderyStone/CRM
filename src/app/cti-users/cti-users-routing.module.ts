import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CtiUsersListComponent } from './cti-users-list/cti-users-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { AddCtiUsersComponent } from './add-cti-users/add-cti-users.component';

const routes: Routes = [
  {
    path: '',
    component: CtiUsersListComponent,
    data: { claimType: 'CNT_VIEW_CONTACT' },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddCtiUsersComponent,
    data: { claimType: 'CNT_VIEW_CONTACT' },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: AddCtiUsersComponent,
    data: { claimType: 'CNT_VIEW_CONTACT' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CtiUsersRoutingModule { }
