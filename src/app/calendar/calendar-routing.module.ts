import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { AddCalendarComponent } from './add-calendar/add-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarListComponent,
    canActivate: [AuthGuard],
   data: { claimType: ['MST_VIEW_CALENDER'] },
  },
  {
    path: 'add',
    component: AddCalendarComponent,
    canActivate: [AuthGuard],
   data: { claimType: ['MST_ADD_CALENDER'] },
  },
  {
    path: 'edit/:id',
    component: AddCalendarComponent,
    canActivate: [AuthGuard],
   data: { claimType: ['MST_EDIT_CALENDER'] },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
