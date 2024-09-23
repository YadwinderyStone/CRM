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
  messageTemplate: any = '';
  editorConfig = EditorConfig;
loading:boolean = false;
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
    this.route.params.subscribe(res => {
      if (res?.id) {
        this.createMessageTemplateForm();
        this.getEmailDataBy(res?.id)
      }
    })
  }

  ngOnInit(): void {
    if (!this.messageTemplate) {
      this.createMessageTemplateForm();
    }
  }

  getEmailDataBy(id) {
    this.loading=true
    this.messageTemplateService.getMessageTemplateById(id).subscribe(res => {
      this.messageTemplate = res || '';
      this.patchEmailTemplateData();
      this.loading=false
    },error=>{
      this.loading=false
    })

  }

  addUpdateEmailTemplate() {
    if (this.messageTemplateForm.valid) {
      this.loading=true
      if (this.messageTemplate) {
        this.sub$.sink = this.messageTemplateService
          .updateMessageTemplate(this.createBuildObject())
          .subscribe(c => {
            this.toastrService.success('SMS template updated successfully');
            this.loading=false
            this.router.navigate(['/message-template']);
          },error=>{
            this.loading=false
          });
      } else {
        this.sub$.sink = this.messageTemplateService
          .addMessageTemplate(this.createBuildObject())
          .subscribe((c: any) => {
            if (c?.success) {
              this.loading=false
              this.toastrService.success(this.translationService.getValue('SMS template saved successfully'))
              this.router.navigate(['/message-template']);
            } else {
              this.loading=false
              this.toastrService.error(c?.message)
            }
          },error=>{
            this.loading=false
          })
      }
    } else {
      for (let inner in this.messageTemplateForm.controls) {
        this.messageTemplateForm.get(inner).markAsDirty();
        this.messageTemplateForm.get(inner).updateValueAndValidity();
      }
    }
  }

  createBuildObject() {
    const emailTemplate: any = {
      id: this.messageTemplate ? this.messageTemplate.id : null,
      templateDltId:this.messageTemplateForm.get('templateDltId').value,
      name: this.messageTemplateForm.get('name').value,
      subject: this.messageTemplateForm.get('subject').value,
      body: this.messageTemplateForm.get('body').value
    }
    return emailTemplate;
  }

  createMessageTemplateForm() {
    this.messageTemplateForm = this.fb.group({
      name: ['', [Validators.required]],
      templateDltId: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      body: ['', [Validators.required,]]
    })
  }

  patchEmailTemplateData() {
    this.messageTemplateForm.patchValue({
      name: this.messageTemplate.name,
      templateDltId:this.messageTemplate.templateDltId || this.messageTemplate.templateDLTId,
      subject: this.messageTemplate.subject,
      body: this.messageTemplate.body
    })
  }

}
