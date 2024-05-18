import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { EmailInboxComponent } from './email-inbox/email-inbox.component';

const routes: Routes = [
  {
    path: '',
    component: EmailInboxComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'EMAIL_SEND_EMAIL' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailInboxRoutingModule { }


  

