import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit {
  data = 'fcr'
  @Input() id: string;
  @Input() InteractionDetail: any
  surveyData: any;
  isLoading: boolean = false;
  surveyForm: UntypedFormGroup;
  constructor(
    private inventoryService: InventoryService,
    private toastrService: ToastrService,
    public translationService: TranslationService,
    private fb: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.createForm();
    this.getsurveyQuestions();
  }


  createForm() {

    this.surveyForm = this.fb.group({
      q1: [this.surveyData?.accessibility],
      q2: [this.surveyData?.knowledge],
      q3: [this.surveyData?.resolution],
      q4: [this.surveyData?.experience],
      q5: [this.surveyData?.timeliness],
      q6: [this.surveyData?.overallFeedback],
      q7: [this.surveyData?.additionalFeedback],
      totalSurveyValue: [this.surveyData?.totalServeyValue],
      csatCategory: [this.surveyData?.CSATCategory || this.surveyData?.cSATCategory],

    });
  }

  save() {
    if (!this.surveyForm.valid) {
      this.surveyForm.markAllAsTouched();
      return
    }

  }

  getsurveyQuestions() {
    this.isLoading = true;
    this.inventoryService.getSurveyQuestions(this.id).subscribe(res => {
      this.surveyData = res
      this.isLoading = false;
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false;
    })
  }


}
