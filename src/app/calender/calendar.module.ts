import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarListComponent } from './calendar-list/calendar-list.component';


@NgModule({
  declarations: [
  
    CalendarListComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ]
})
export class CalenderModule { }
