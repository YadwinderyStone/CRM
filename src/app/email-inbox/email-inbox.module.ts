import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailInboxRoutingModule } from './email-inbox-routing.module';
import { EmailInboxComponent } from './email-inbox/email-inbox.component';
import { EmailInboxDetailComponent } from './email-inbox-detail/email-inbox-detail.component';


@NgModule({
  declarations: [
    EmailInboxComponent,
    EmailInboxDetailComponent
  ],
  imports: [
    CommonModule,
    EmailInboxRoutingModule
  ]
})
export class EmailInboxModule { }
