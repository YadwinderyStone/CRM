import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageTemplateRoutingModule } from './message-template-routing.module';
import { MessageTemplateListComponent } from './message-template-list/message-template-list.component';
import { AddMessageTemplateComponent } from './add-message-template/add-message-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    MessageTemplateListComponent,
    AddMessageTemplateComponent
  ],
  imports: [
    CommonModule,
    MessageTemplateRoutingModule,
    AngularEditorModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class MessageTemplateModule { }
