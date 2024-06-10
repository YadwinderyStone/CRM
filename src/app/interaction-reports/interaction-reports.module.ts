import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractionReportsRoutingModule } from './interaction-reports-routing.module';
import { InteractionReportListComponent } from './interaction-report-list/interaction-report-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime-ex';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { DumpRepoertComponent } from './dump-repoert/dump-repoert.component';
import { Reports187Component } from './reports187/reports187.component';
import { OpenInteractionsReportComponent } from './open-interactions-report/open-interactions-report.component';
import { PendingInteractionsReportsListComponent } from './pending-interactions-reports-list/pending-interactions-reports-list.component';
import { ClosedInteractionsReportsListComponent } from './closed-interactions-reports-list/closed-interactions-reports-list.component';
import { ResolvedInteractionsReportsListComponent } from './resolved-interactions-reports-list/resolved-interactions-reports-list.component';
import { ReopenInteractionsReportsListComponent } from './reopen-interactions-reports-list/reopen-interactions-reports-list.component';
import { L2L3InteractionsReportsListComponent } from './l2-l3-interactions-reports-list/l2-l3-interactions-reports-list.component';
import { Reports185ListComponent } from './reports185-list/reports185-list.component';
import { AllTeamMonthDumpReportComponent } from './all-team-month-dump-report/all-team-month-dump-report.component';


@NgModule({
  declarations: [
    InteractionReportListComponent,
    DumpRepoertComponent,
    Reports187Component,
    OpenInteractionsReportComponent,
    PendingInteractionsReportsListComponent,
    ClosedInteractionsReportsListComponent,
    ResolvedInteractionsReportsListComponent,
    ReopenInteractionsReportsListComponent,
    L2L3InteractionsReportsListComponent,
    Reports185ListComponent,
    AllTeamMonthDumpReportComponent
  ],
  imports: [
    CommonModule,
    InteractionReportsRoutingModule,
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
    MatCheckboxModule,
    OwlNativeDateTimeModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class InteractionReportsModule { }
