import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMessageComponent } from './send-message/send-message.component';
import { AuthGuard } from '@core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SendMessageComponent,
    canActivate: [AuthGuard],
    data: { claimType: 'MST_SMSSEND' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendMessageRoutingModule { }
