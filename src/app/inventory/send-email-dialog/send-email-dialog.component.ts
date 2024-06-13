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
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.scss']
})
export class SendEmailDialogComponent extends BaseComponent implements OnInit {
  emailTamplates: EmailTemplate[] = [];
  selectedEmailTamplate: EmailTemplate;
  emailForm: UntypedFormGroup;
  editorConfig = EditorConfig;
  subject: string = ''
  isLoading = false;
  files: any = [];
  fileData: FileInfo[] = [];
  extension: string = '';
  fileType: string = '';
  user: any
  constructor(public dialogRef: MatDialogRef<SendEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private fb: UntypedFormBuilder,
    private emailTemplateService: EmailTemplateService,
    private toastrService: ToastrService,
    private emailSendService: EmailSendService,
    private inventoryService: InventoryService,
    public translationService: TranslationService,
  ) {
    super(translationService);
    this.getLangDir();
    let value = this.data?.transactionNumber;
    value += `-${this.data?.categoryName}`
    value += `-${this.data?.subcategoryName}`

    this.subject = value;
    this.user = JSON.parse(localStorage.getItem('authObj'));
  }



  ngOnInit(): void {
    this.createEmailForm();
    this.getEmailTamplate();
  }
  replacetno(content: string, ticketNumber: string, status: string): string {
    let value = content.replace('&#160; ##TicketNumber##&#160', `&#160; ${ticketNumber}&#160`).replace('##Status##', status);
    value = value.replace('&#160; ##TICKETNUMBER##&#160', `&#160; ${ticketNumber}&#160`).replace('##STATUS##', status);
    return value
  }

  onTempateChange() {
    let data: string = this.selectedEmailTamplate.body

    data = this.replacetno(this.selectedEmailTamplate.body, this.data?.transactionNumber, this.data?.statusName);
    // data = this.replacetStatus(this.selectedEmailTamplate.body , this.data?.statusName);
    this.selectedEmailTamplate.body = data;

    let status = data.replace('&#160; ##Status##&#160', `&#160; ${this.data?.statusName}&#160`);


    this.selectedEmailTamplate.body = status
    this.emailForm.patchValue(this.selectedEmailTamplate);
    this.emailForm.get('subject').setValue(this.subject);
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
      let aciTemplate = this.emailTamplates.filter(e => e.name == 'ACI Template')
      if (this.data?.statusId == 2) {
        this.selectedEmailTamplate = aciTemplate[0];
        this.onTempateChange();
      }
    })
  }

  createEmailForm() {
    this.emailForm = this.fb.group({
      id: [''],
      toAddress: [this.data?.emailId, [Validators.required]],
      from: ['donotreply@gst.gov.in', [Validators.required]],
      cCAddress: [''],
      subject: [this.subject, [Validators.required]],
      body: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9.]*$/)]],
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
    const emailObj = {

      subject: this.subject,
      toAddress: this.emailForm.value.toAddress,
      ccAddress: this.emailForm.value.cCAddress,
      body: this.emailForm.value.body,
      fromAddress: this.emailForm.value.from,
      attechments: this.fileData,
      interactionId: this.data?.id,
      interactionNumber: this.data?.transactionNumber
    }
    this.emailSendService.sendEmail(emailObj)
      .subscribe(res => {
        this.toastrService.success(this.translationService.getValue('EMAIL_SENT_SUCCESSFULLY'));
        this.isLoading = false;
        this.clearForm();
        this.createTransferHistory(emailObj);
        // this.dialogRef.close(true);
      }, error => {
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





  createTransferHistory(value: any) {
    this.isLoading = true
    let data = {
      id: this.data?.id,
      action: 11,
      message: `Email replay ${value?.body} by ${this.user?.firstName}`
    }
    this.inventoryService.createHistory(data).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
        this.isLoading = false;
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false
    })
  }
}
