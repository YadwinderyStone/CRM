import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CalenderService } from '../calender.service';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';

@Component({
  selector: 'app-add-calender',
  templateUrl: './add-calender.component.html',
  styleUrls: ['./add-calender.component.scss']
})
export class AddCalenderComponent implements OnInit {
  currentDate = new Date();
  id: string = '';
  calenderForm: UntypedFormGroup;
  isLoading: boolean = false;
  constructor(
    public translationService: TranslationService,
    private toastrService: ToastrService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private calenderSeverice: CalenderService,
    private commonDialogService: CommonDialogService,
  ) {
    this.createForm();
    this.activatedRoute.params.subscribe(res => {
      this.id = res?.id
    })
  }

  ngOnInit(): void {
    if (this.id) {
      this.getCalenderDetail(this.id);
    }
  }

  createForm() {
    this.calenderForm = this.fb.group({
      day: ['', Validators.required],
      date: ['', Validators.required],
      occasion: ['', Validators.required],
    })
  }
  getCalenderDetail(id) {
    this.isLoading = true;
    this.calenderSeverice.getCalenderDetailById(id).subscribe(res => {
      if (res) {
        this.calenderForm.patchValue(res)
        this.isLoading = false;
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false;
    })
  }

  addUpdateCalender() {
    if (this.calenderForm.invalid) {
      this.calenderForm.markAllAsTouched();
      return
    }
    let data = this.calenderForm.value;
    if (this.id) {
      this.calenderSeverice.editCalenderEvent(data, this.id).subscribe(res => {
        if (res) {
          this.toastrService.success('Calender event Updated sucessfully');
          this.router.navigate(['/calender']);
        }
      }, error => {
        this.toastrService.error(error)
      })
      this.router.navigate(['/calender']);
    }else{
      this.calenderSeverice.addCalenderEvent(data).subscribe(res => {
        if (res) {
          this.toastrService.success('Calender event added sucessfully');
          this.router.navigate(['/calender']);
        }
      }, error => {
        this.toastrService.error(error)
      })
      this.router.navigate(['/calender']);
      this.toastrService.success('Calender Updated sucessfully')
    }
  }


}