import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailInboxRoutingModule } from './email-inbox-routing.module';
import { EmailInboxComponent } from './email-inbox/email-inbox.component';
import { EmailInboxDetailComponent } from './email-inbox-detail/email-inbox-detail.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmailInboxComponent,
    EmailInboxDetailComponent
  ],
  imports: [
    CommonModule,
    EmailInboxRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmailInboxModule { }
