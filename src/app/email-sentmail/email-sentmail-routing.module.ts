import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { EmailSentItemComponent } from './email-sent-item/email-sent-item.component';
import { EmailSentDetailComponent } from './email-sent-detail/email-sent-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EmailSentItemComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'EMAIL_VIEW_MAIL_OUTBOX' }
  },
  {
    path: 'sentMail-detail/:id',
    component: EmailSentDetailComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'EMAIL_DETAIL_EMAIL_OUTBOX' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailSentmailRoutingModule { }
