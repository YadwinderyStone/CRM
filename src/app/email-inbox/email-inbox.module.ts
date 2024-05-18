import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailInboxRoutingModule } from './email-inbox-routing.module';
import { EmailInboxComponent } from './email-inbox/email-inbox.component';


@NgModule({
  declarations: [
    EmailInboxComponent
  ],
  imports: [
    CommonModule,
    EmailInboxRoutingModule
  ]
})
export class EmailInboxModule { }
