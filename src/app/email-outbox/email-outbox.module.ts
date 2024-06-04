import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailOutboxRoutingModule } from './email-outbox-routing.module';
import { EmailOutboxComponent } from './email-outbox/email-outbox.component';
import { EmailOutboxDetailComponent } from './email-outbox-detail/email-outbox-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    EmailOutboxComponent,
    EmailOutboxDetailComponent
  ],
  imports: [
    CommonModule,
    EmailOutboxRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmailOutboxModule { }
