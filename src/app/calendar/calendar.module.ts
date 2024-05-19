import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { AddCalendarComponent } from './add-calendar/add-calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CalendarListComponent,
    AddCalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
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
export class CalendarModule { }
