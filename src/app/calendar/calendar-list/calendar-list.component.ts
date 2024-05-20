import {Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { CalendarList } from '../calendar.model'
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from '../calendar.service';
import { AddCalendarComponent } from '../add-calendar/add-calendar.component';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent extends BaseComponent implements OnInit {
  calendarList: CalendarList[] = [];
  columnsToDisplay: string[] = ['calenderId','srNo', 'date', 'occasion', 'action'];
  currentYear = (new Date()).getFullYear();
  selectedYear:any = 2024
  yearsDropdown:number[] = [];
  constructor(
    private commonDialogService: CommonDialogService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private calendarSeverice: CalendarService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
    for(let i=2024; i<=2030;i++){
      this.yearsDropdown.push(i);
    }
  }

  ngOnInit(): void {
    this.getCalenderList()
  }

  getCalenderList(): void {
    this.calendarSeverice.getCalendarList(this.selectedYear).subscribe(res => {
      this.calendarList = res
    })
  }

  updateCalendar(data: CalendarList): void {
    const dialogRef = this.dialog.open(AddCalendarComponent, {
      width: '450px',
      direction: this.langDir,
      data: data
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
         this.getCalenderList();
        }
      });



  // deleteCalendarEvent(id: string): void {
  //   this.calendarSeverice.deleteCalendarEvent(id).subscribe(d => {
  //     this.toastrService.success('calender event deleed successfully');
  //     this.getCalenderList();
  //   });
  // }


  
  // FIXME:CHange model for calender 
  // deleteEvent(status: CalendarList): void {
  //   this.sub$.sink = this.commonDialogService
  //     .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${status.name}`)
  //     .subscribe(isTrue => {
  //       if (isTrue) {
  //         this.deleteCalendarEvent(status.id);
  //       }
  //     });
  // }


}

}

