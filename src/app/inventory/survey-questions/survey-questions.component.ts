import { Component, OnInit } from '@angular/core';
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
  surveyForm: UntypedFormGroup;
  constructor(
    private inventoryService: InventoryService,
    private toastrService: ToastrService,
    public translationService: TranslationService,
    private fb: UntypedFormBuilder,){}

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {

    this.surveyForm = this.fb.group({
      q1: ['',[Validators.required]],
      q2: [''],
      q3: [''],
      q4: [''],
      q5: [''],
      q6: [''],
      q7: [''],
      totalSurveyValue: [''],
      csatCategory: [''],
      
    });
  }

  save(){
    if(!this.surveyForm.valid){
      this.surveyForm.markAllAsTouched();
      return
    }
// API for add survey 


  }


}
