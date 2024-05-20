import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { EmailInboxComponent } from './email-inbox/email-inbox.component';
import { EmailInboxDetailComponent } from './email-inbox-detail/email-inbox-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EmailInboxComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'EMAIL_VIEW_MAIL' }
  },
  {
    path: 'inbox-detail/:id',
    component: EmailInboxDetailComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'EMAIL_DETAIL_EMAIL' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailInboxRoutingModule { }


  

