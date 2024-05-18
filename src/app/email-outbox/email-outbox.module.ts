import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailOutboxRoutingModule } from './email-outbox-routing.module';
import { EmailOutboxComponent } from './email-outbox/email-outbox.component';


@NgModule({
  declarations: [
    EmailOutboxComponent
  ],
  imports: [
    CommonModule,
    EmailOutboxRoutingModule
  ]
})
export class EmailOutboxModule { }
