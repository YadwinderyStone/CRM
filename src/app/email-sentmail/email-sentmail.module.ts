import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailSentmailRoutingModule } from './email-sentmail-routing.module';
import { EmailSentItemComponent } from './email-sent-item/email-sent-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '@shared/shared.module';
import { EmailSentDetailComponent } from './email-sent-detail/email-sent-detail.component';


@NgModule({
  declarations: [
    EmailSentItemComponent,
    EmailSentDetailComponent
  ],
  imports: [
    CommonModule,
    EmailSentmailRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmailSentmailModule { }
