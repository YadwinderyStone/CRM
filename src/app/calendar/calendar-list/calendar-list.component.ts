import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { CalendarList } from '../calendar.model'
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent extends BaseComponent implements OnInit {
  calendarList: CalendarList[] = [];
  columnsToDisplay: string[] = ['srNo', 'date', 'day', 'occasion', 'action'];
  currentYear = (new Date()).getFullYear();
  constructor(
    private commonDialogService: CommonDialogService,
    private toastrService: ToastrService,
    private calendarSeverice: CalendarService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
  }


  ngOnInit(): void {
    this.getCalenderList()
  }

  getCalenderList(): void {
    this.calendarSeverice.getCalendarList().subscribe(res => {
      this.calendarList = res
    })
  }

  deleteCalendarEvent(id: string): void {
    this.calendarSeverice.deleteCalendarEvent(id).subscribe(d => {
      this.toastrService.success('calender event deleed successfully');
      this.getCalenderList();
    });
  }

  // FIXME:CHange model for calender 
  deleteEvent(status: CalendarList): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${status.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deleteCalendarEvent(status.id);
        }
      });
  }


}

