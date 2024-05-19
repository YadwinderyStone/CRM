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


@NgModule({
  declarations: [
    InteractionReportListComponent,
    DumpRepoertComponent,
    Reports187Component
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
