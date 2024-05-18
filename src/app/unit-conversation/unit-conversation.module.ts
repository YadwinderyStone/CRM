import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitConversationListComponent } from './unit-conversation-list/unit-conversation-list.component';
import { UnitConversationListPresentationComponent } from './unit-conversation-list-presentation/unit-conversation-list-presentation.component';
import { ManageUnitConversationComponent } from './manage-unit-conversation/manage-unit-conversation.component';
import { UnitConversationRoutingModule } from './unit-conversation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InteractionCategoryComponent } from './interaction-category/interaction-category.component';
import { InteractionStatusComponent } from './interaction-status/interaction-status.component';
import { InteractionTypeComponent } from './interaction-type/interaction-type.component';
import { AddEditInteractionTypeComponent } from './add-edit-interaction-type/add-edit-interaction-type.component';
import { AddEditInteractionCategoryComponent } from './add-edit-interaction-category/add-edit-interaction-category.component';
import { AddEditInteractionStatusComponent } from './add-edit-interaction-status/add-edit-interaction-status.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InteractionBulkCloserComponent } from './interaction-bulk-closer/interaction-bulk-closer.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    UnitConversationListComponent,
    UnitConversationListPresentationComponent,
    ManageUnitConversationComponent,
    InteractionCategoryComponent,
    InteractionStatusComponent,
    InteractionTypeComponent,
    AddEditInteractionTypeComponent,
    AddEditInteractionCategoryComponent,
    AddEditInteractionStatusComponent,
    InteractionBulkCloserComponent
  ],
  imports: [
    CommonModule,
    UnitConversationRoutingModule, 
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class UnitConversationModule { }
