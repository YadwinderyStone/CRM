import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupListComponent } from './lookup-list/lookup-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { AddLookupComponent } from './add-lookup/add-lookup.component';

const routes: Routes = [
  {
    path: '',
    component: LookupListComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_VIEW_LOOKUP'},
  },
  {
    path: 'add',
    component: AddLookupComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_ADD_LOOKUP' },
  },
  {
    path: 'edit/:id',
    component: AddLookupComponent,
    canActivate: [AuthGuard],
   data: { claimType: ['MST_UPDATE_LOOKUP','MST_ADD_LOOKUP'] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupRoutingModule { }
