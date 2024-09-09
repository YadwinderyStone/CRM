import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { SmsSettingComponent } from './sms-setting/sms-setting.component';
import { ManageSmsSettingComponent } from './manage-sms-setting/manage-sms-setting.component';

const routes: Routes = [
  {
    path: '',
    component: SmsSettingComponent,
    data: { claimType: 'MST_VIEW_SMSTEMPLATE' },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: ManageSmsSettingComponent,
    data: { claimType: 'MST_VIEW_SMSTEMPLATE' },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: ManageSmsSettingComponent,
    data: { claimType: 'MST_VIEW_SMSTEMPLATE' },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageSettingRoutingModule { }
