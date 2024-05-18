import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailTemplate } from '@core/domain-classes/email-template';
import { TranslationService } from '@core/services/translation.service';
import { EditorConfig } from '@shared/editor.config';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { MessageTemplateService } from '../message-template.service';
@Component({
  selector: 'app-add-message-template',
  templateUrl: './add-message-template.component.html',
  styleUrls: ['./add-message-template.component.scss']
})
export class AddMessageTemplateComponent extends BaseComponent implements OnInit {
  
    messageTemplateForm: UntypedFormGroup;
    messageTemplate: EmailTemplate;
    editorConfig = EditorConfig;
  
    constructor(
      private fb: UntypedFormBuilder,
      private route: ActivatedRoute,
      private messageTemplateService: MessageTemplateService,
      private router: Router,
      private toastrService: ToastrService,
      public translationService: TranslationService
    ) {
      super(translationService);
      this.getLangDir();
    }
  
    ngOnInit(): void {
      this.createMessageTemplateForm();
      
    }
  
    getEmailResolverData() {
      this.sub$.sink = this.route.data.subscribe(
        (data: { emailTemplate: EmailTemplate }) => {
          if (data.emailTemplate) {
            this.messageTemplate = data.emailTemplate;
            this.patchEmailTemplateData();
          }
        });
    }
  
    addUpdateEmailTemplate() {
      if (this.messageTemplateForm.valid) {
        if (this.messageTemplate) {
          this.sub$.sink = this.messageTemplateService
            .updateMessageTemplate(this.createBuildObject())
            .subscribe(c => {
              this.toastrService.success('SMS template saved successfully');
              this.router.navigate(['/message-template']);
            });
        } else {
          this.sub$.sink = this.messageTemplateService
            .addMessageTemplate(this.createBuildObject())
            .subscribe(c => {
              this.toastrService.success(this.translationService.getValue('SMS template saved successfully'))
              this.router.navigate(['/message-template']);
            })
        }
      } else {
        for (let inner in this.messageTemplateForm.controls) {
          this.messageTemplateForm.get(inner).markAsDirty();
          this.messageTemplateForm.get(inner).updateValueAndValidity();
        }
      }
    }
  
    createBuildObject(): EmailTemplate {
      const emailTemplate: EmailTemplate = {
        id: this.messageTemplate ? this.messageTemplate.id : null,
        name: this.messageTemplateForm.get('name').value,
        subject: this.messageTemplateForm.get('subject').value,
        body: this.messageTemplateForm.get('body').value
      }
      return emailTemplate;
    }
  
    createMessageTemplateForm() {
      this.messageTemplateForm = this.fb.group({
        name: ['', [Validators.required]],
        subject: ['', [Validators.required]],
        body: ['', [Validators.required]]
      })
    }
  
    patchEmailTemplateData() {
      this.messageTemplateForm.patchValue({
        name: this.messageTemplate.name,
        subject: this.messageTemplate.subject,
        body: this.messageTemplate.body
      })
    }
  
  }
  