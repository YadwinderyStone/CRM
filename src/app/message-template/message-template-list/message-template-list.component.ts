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
    loading:boolean = false
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
  
    deleteEmailTemplate(data: MessageTemplate) {
      const areU = this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')
      this.sub$.sink = this.commonDialogService
        .deleteConformationDialog(`${areU}:: ${data.name}`)
        .subscribe((flag: boolean) => {
          if (flag) {
            this.loading = true
            this.sub$.sink = this.messageTemplateService.deleteMessageTemplate(data)
            .subscribe(() => {
                this.loading = false
                this.toastrService.success('Message Template Deleted Successfully');
                this.getMessageTemplates();
              },error=>{
                this.loading = false
              });
          }
        });
    }
  
    getMessageTemplates(): void {
      this.loading = true
      this.sub$.sink = this.messageTemplateService.getMessageTemplates()
        .subscribe((data: any) => {
          this.messageTemplates = data?.smsTemplateList;
          this.loading = false
        }, (err: CommonError) => {
          this.loading = false
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
  