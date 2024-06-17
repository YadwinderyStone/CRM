import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { EmailServiceComponent } from './email-service/email-service.component';

const routes: Routes = [
  // FIXME: Need to change claim 
  {
    path: '',
    component: EmailServiceComponent,
    canActivate: [AuthGuard],
   data: { claimType: ['MST_VIEW_PROBLEM'] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailServiceRoutingModule { }
