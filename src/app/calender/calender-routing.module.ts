import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { AddCalenderComponent } from './add-calender/add-calender.component';
import { CalenderListComponent } from './calender-list/calender-list.component';

const routes: Routes = [
  {
    path: '',
    component: CalenderListComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_VIEW_QUE' },
  },
  {
    path: 'add',
    component: AddCalenderComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_ADD_QUE' },
  },
  {
    path: 'edit/:id',
    component: AddCalenderComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_UPDATE_QUE' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
