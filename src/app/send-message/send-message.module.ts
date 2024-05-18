import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendMessageRoutingModule } from './send-message-routing.module';
import { SendMessageComponent } from './send-message/send-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '@shared/shared.module';
import { EmailSendRoutingModule } from '../email-send/email-send-routing.module';


@NgModule({
  declarations: [
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    SendMessageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    EmailSendRoutingModule,
    AngularEditorModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class SendMessageModule { }
