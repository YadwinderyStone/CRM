import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { ManageInventoryComponent } from './manage-inventory/manage-inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InventoryHistoryListComponent } from './inventory-list/inventory-history-list/inventory-history-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import {MatTabsModule} from '@angular/material/tabs';
import { InventoryPropertiesComponent } from './inventory-properties/inventory-properties.component'
import {MatExpansionModule} from '@angular/material/expansion';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { AddInteractionsComponent } from './add-interactions/add-interactions.component';
import { InteractionAssignmentComponent } from './interaction-assignment/interaction-assignment.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { InteractionHistoryComponent } from './interaction-history/interaction-history.component';
import { InteractionLogsComponent } from './interaction-logs/interaction-logs.component';
import { InteractionNotesComponent } from './interaction-notes/interaction-notes.component';
import { InteractionLastActionTakenComponent } from './interaction-last-action-taken/interaction-last-action-taken.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { L0EmailComponent } from './l0-email/l0-email.component';
import { SendEmailDialogComponent } from './send-email-dialog/send-email-dialog.component';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { InteractionDetailViewDialogComponent } from './interaction-detail-view-dialog/interaction-detail-view-dialog.component';
import { TransferTeamComponent } from './inventory-properties/transfer-team/transfer-team.component';
import { MyInteractionsListComponent } from './my-interactions-list/my-interactions-list.component';
import { TeamInteractionsListComponent } from './team-interactions-list/team-interactions-list.component';
import { InteractionAttachmentsListComponent } from './interaction-attachments-list/interaction-attachments-list.component';
import { InteractionEmailComponent } from './interaction-email/interaction-email.component';
@NgModule({
  declarations: [
    InventoryListComponent,
    ManageInventoryComponent,
    InventoryHistoryListComponent,
    AddInventoryComponent,
    InventoryPropertiesComponent,
    SurveyQuestionsComponent,
    CustomerInfoComponent,
    AddInteractionsComponent,
    InteractionAssignmentComponent,
    InteractionHistoryComponent,
    InteractionLogsComponent,
    InteractionNotesComponent,
    InteractionLastActionTakenComponent,
    L0EmailComponent,
    SendEmailDialogComponent,
    AddNoteDialogComponent,
    InteractionDetailViewDialogComponent,
    TransferTeamComponent,
    MyInteractionsListComponent,
    TeamInteractionsListComponent,
    InteractionAttachmentsListComponent,
    InteractionEmailComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SearchFilterPipe,
    FormsModule,
    MatTabsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatMenuModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    AngularEditorModule,
  ]
})
export class InventoryModule { }
