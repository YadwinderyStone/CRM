import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from '../calendar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.scss']
})
export class AddCalendarComponent extends BaseComponent implements OnInit {
  currentDate = new Date();
  id: string = '';
  calendarForm: UntypedFormGroup;
  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translationService: TranslationService,
    private toastrService: ToastrService,
    private fb: UntypedFormBuilder,
    private calendarSeverice: CalendarService,

  ) {
    super(translationService)
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.calendarForm = this.fb.group({
      calenderDateType: [this.data?.calenderDateType, Validators.required],
      calenderDateRemarks: [this.data?.calenderDateRemarks, Validators.required],
    })
  }


  updateCalendar() {
    if (this.calendarForm.invalid) {
      this.calendarForm.markAllAsTouched();
      return
    }
    let userDetail = JSON.parse(localStorage.getItem('authObj'))
    let data = this.calendarForm.value;
    data.userId = userDetail?.id;
    data.calenderDate = this.data?.calenderDate
    data.calenderId = this.data?.calenderId
    this.calendarSeverice.editCalendarEvent(data).subscribe(res => {
      if (res) {
        this.toastrService.success('Calendar event Updated sucessfully');
        this.dialogRef.close(true);
      }
    }, error => {
      this.toastrService.error(error)
    })

    // else{
    //   this.calendarSeverice.addCalendarEvent(data).subscribe(res => {
    //     if (res) {
    //       this.toastrService.success('Calendar event added sucessfully');
    //       this.router.navigate(['/calendar']);
    //     }
    //   }, error => {
    //     this.toastrService.error(error)
    //   })
    //   this.router.navigate(['/calendar']);
    //   this.toastrService.success('Calendar Updated sucessfully')
    // }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}
