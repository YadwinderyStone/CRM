import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailOutboxRoutingModule } from './email-outbox-routing.module';
import { EmailOutboxComponent } from './email-outbox/email-outbox.component';
import { EmailOutboxDetailComponent } from './email-outbox-detail/email-outbox-detail.component';


@NgModule({
  declarations: [
    EmailOutboxComponent,
    EmailOutboxDetailComponent
  ],
  imports: [
    CommonModule,
    EmailOutboxRoutingModule
  ]
})
export class EmailOutboxModule { }
