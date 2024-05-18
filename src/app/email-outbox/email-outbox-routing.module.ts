import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailOutboxComponent } from './email-outbox/email-outbox.component';
import { AuthGuard } from '@core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EmailOutboxComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'EMAIL_SEND_EMAIL' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailOutboxRoutingModule { }
