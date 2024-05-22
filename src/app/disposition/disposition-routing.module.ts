import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { DispositionListComponent } from './disposition-list/disposition-list.component';

const routes: Routes = [
  {
    path: '',
    component: DispositionListComponent,
    data: { claimType: 'MST_CTI_DISPOSTION' },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispositionRoutingModule { }
