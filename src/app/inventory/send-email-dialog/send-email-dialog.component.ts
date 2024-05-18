import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmailTemplate } from '@core/domain-classes/email-template';
import { FileInfo } from '@core/domain-classes/file-info';
import { TranslationService } from '@core/services/translation.service';
import { EditorConfig } from '@shared/editor.config';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base.component';
import { EmailSendService } from 'src/app/email-send/email-send.service';
import { EmailTemplateService } from 'src/app/email-template/email-template.service';

@Component({
  selector: 'app-send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.scss']
})
export class SendEmailDialogComponent  extends BaseComponent implements OnInit  {
  emailTamplates: EmailTemplate[] = [];
  selectedEmailTamplate: EmailTemplate;
  emailForm: UntypedFormGroup;
  editorConfig= EditorConfig;
  subject:string = ''
  isLoading = false;
  files: any = [];
  fileData: FileInfo[] = [];
  extension: string = '';
  fileType: string = '';
  constructor(public dialogRef: MatDialogRef<SendEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,

    private fb: UntypedFormBuilder,
    private emailTemplateService: EmailTemplateService,
    private toastrService: ToastrService,
    private emailSendService: EmailSendService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
  let value = this.data?.transactionNumber;
  value+= `-${this.data?.categoryName}`
  value+= `-${this.data?.subcategoryName}`

  this.subject = value;

  }
  

 
    ngOnInit(): void {
      this.createEmailForm();
      this.getEmailTamplate();
    }
  
    onTempateChange() {
      this.emailForm.patchValue(this.selectedEmailTamplate);
    }
  
    newParameter(parameter): UntypedFormGroup {
      return this.fb.group({
        parameter: [parameter, [Validators.required]],
        value: ['', [Validators.required]]
      })
    }
  
    getEmailTamplate() {
      this.sub$.sink = this.emailTemplateService.getEmailTemplates().subscribe((emailTamplats: EmailTemplate[]) => {
        this.emailTamplates = emailTamplats;
      })
    }
  
    createEmailForm() {
      this.emailForm = this.fb.group({
        id: [''],
        toAddress: [this.data?.emailId, [Validators.required]],
        cCAddress: [''],
        subject: [this.subject, [Validators.required]],
        body: ['', [Validators.required]],
      });
    }
  
    fileBrowseHandler(files: any) {
      for (let file of files) {
        this.files.push(file);
      }
      this.getFileInfo();
    }
  
    getFileInfo() {
      this.fileData = [];
      for (let i = 0; i < this.files.length; i++) {
        const reader = new FileReader();
        this.extension = this.files[i].name.split('.').pop().toLowerCase();
        this.fileType = this.files[i].type;
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          const fileInfo = new FileInfo();
          fileInfo.src = ev.target.result.toString();
          fileInfo.extension = this.extension;
          fileInfo.name = this.files[i].name;
          fileInfo.fileType = this.fileType;
          this.fileData.push(fileInfo);
        }
        reader.readAsDataURL(this.files[i]);
      };
    }
  
    sendEmail() {
      if (!this.emailForm.valid) {
        this.emailForm.markAllAsTouched();
        return;
      }
      this.isLoading = true;
      const emailObj = this.emailForm.value;
      emailObj.attechments = this.fileData;
      this.emailSendService.sendEmail(emailObj)
        .subscribe(res => {
          this.toastrService.success(this.translationService.getValue('EMAIL_SENT_SUCCESSFULLY'));
          this.isLoading = false;
          this.clearForm();
          this.dialogRef.close(true);
        }, error=> {
          this.toastrService.error(error);
          this.isLoading = false;
        });
    }
  
    clearForm() {
      this.files = [];
      this.selectedEmailTamplate = {
        name: '',
        id: '',
        body: '',
        subject: '',
      };
      this.emailForm.patchValue({
        id: [''],
        toAddress: [''],
        cCAddress: [''],
        subject: ['']
      });
      this.emailForm.get('body').setValue("");
  
    }
  
    formatBytes(bytes: number) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return 'n/a'
      const value = Math.floor(Math.log(bytes) / Math.log(1024));
      const i = parseInt(value.toString(), 10)
      if (i === 0) return `${bytes} ${sizes[i]})`
      return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
    }
    onDeleteFile(index: number) {
      this.files.splice(index, 1);
    }
  
    onFileDropped($event) {
      for (let file of $event) {
        this.files.push(file);
      }
      this.getFileInfo();
  
    }
  }
  