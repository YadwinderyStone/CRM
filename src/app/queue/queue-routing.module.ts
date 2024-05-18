import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { QueueComponent } from './queue/queue.component';
import { AddQueueComponent } from './add-queue/add-queue.component';

const routes: Routes = [
  {
    path: '',
    component: QueueComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_VIEW_QUE' },
  },
  {
    path: 'add',
    component: AddQueueComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_ADD_QUE' },
  },
  {
    path: 'edit/:id',
    component: AddQueueComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_UPDATE_QUE' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueRoutingModule { }
