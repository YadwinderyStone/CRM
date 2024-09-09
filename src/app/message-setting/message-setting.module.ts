import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageSettingRoutingModule } from './message-setting-routing.module';
import { SmsSettingComponent } from './sms-setting/sms-setting.component';
import { ManageSmsSettingComponent } from './manage-sms-setting/manage-sms-setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SmsSettingComponent,
    ManageSmsSettingComponent
  ],
  imports: [
    CommonModule,
    MessageSettingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
  ]
})
export class MessageSettingModule { }
