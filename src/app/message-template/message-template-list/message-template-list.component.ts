import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { CommonError } from '@core/error-handler/common-error';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { MessageTemplateService } from '../message-template.service';
import { MessageTemplate } from '@core/domain-classes/message-template';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-message-template-list',
  templateUrl: './message-template-list.component.html',
  styleUrls: ['./message-template-list.component.scss']
})
export class MessageTemplateListComponent extends BaseComponent implements OnInit {  
    messageTemplates: MessageTemplate[] = [];
    displayedColumns: string[] = ['action', 'name', 'subject','date','createdBy'];
    constructor(
      private messageTemplateService: MessageTemplateService,
      private toastrService: ToastrService,
      private commonDialogService: CommonDialogService,
      public translationService: TranslationService,
      private sanitizer: DomSanitizer,
    ) {
      super(translationService);
      this.getLangDir();
    }
  
    ngOnInit(): void {
      this.getMessageTemplates();
    }
  
    delteEmailTemplate(data: MessageTemplate) {
      const areU = this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      this.sub$.sink = this.commonDialogService
        .deleteConformationDialog(`${areU}:: ${data.name}`)
        .subscribe((flag: boolean) => {
          if (flag) {
            this.sub$.sink = this.messageTemplateService.deleteMessageTemplate(data)
              .subscribe(() => {
                this.toastrService.success('Message Template Deleted Successfully');
                this.getMessageTemplates();
              });
          }
        });
    }
  
    getMessageTemplates(): void {
      this.sub$.sink = this.messageTemplateService.getMessageTemplates()
        .subscribe((data: any) => {
          this.messageTemplates = data?.smsTemplateList;
        }, (err: CommonError) => {
          err.messages.forEach(msg => {
            this.toastrService.error(msg)
          });
        });
    }
    senitizeContent(data){
      let sanitizedContent:SafeHtml = this.sanitizer.bypassSecurityTrustHtml(data);
     return  sanitizedContent
    }
  
  }
  