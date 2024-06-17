import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailServiceRoutingModule } from './email-service-routing.module';
import { EmailServiceComponent } from './email-service/email-service.component';


@NgModule({
  declarations: [
    EmailServiceComponent
  ],
  imports: [
    CommonModule,
    EmailServiceRoutingModule
  ]
})
export class EmailServiceModule { }
