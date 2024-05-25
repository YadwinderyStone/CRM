import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmailInboxService } from '../email-inbox.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditorConfig } from '@shared/editor.config';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-email-inbox-detail',
  templateUrl: './email-inbox-detail.component.html',
  styleUrls: ['./email-inbox-detail.component.scss']
})
export class EmailInboxDetailComponent extends BaseComponent implements OnInit {
id:string = ''
emailDetail:any=''
editorConfig = EditorConfig;
emailForm: UntypedFormGroup;
isLoading: false;
  constructor(
    private emailInboxService: EmailInboxService,
    public toasterServices: ToastrService,
    private activatedRoute:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fb: UntypedFormBuilder,
    private router:Router,
  ) { 
    super();
    this.activatedRoute.params.subscribe(res=>{
      this.id=res.id
    })
  }

  ngOnInit(): void {
    this.getEmailDetail(this.id);
    this.createEmailForm();
  }

  getEmailDetail(id){
   this.emailInboxService.getEmailDetailById(id).subscribe((res:any)=>{
    this.emailDetail = res?.body ||res
    this.emailForm.get('from').setValue(this.emailDetail[0]?.mailFromName + ' ' + '<'+this.emailDetail[0]?.mailFromEmailId+'>')
    this.emailForm.get('toAddress').setValue(this.emailDetail[0]?.mailTo)
    this.emailForm.get('cCAddress').setValue(this.emailDetail[0]?.mailCC)
    this.emailForm.get('subject').setValue(this.emailDetail[0]?.mailSubject)
    this.emailForm.get('body').setValue(this.emailDetail[0]?.mailMessage)
   })
  }

senitizeContent(data){
  let sanitizedContent:SafeHtml = this.sanitizer.bypassSecurityTrustHtml(data);
 return  sanitizedContent
}


createEmailForm() {
  this.emailForm = this.fb.group({
    id: [''],
    toAddress: [, [Validators.required]],
    from: ['', [Validators.required]],
    cCAddress: [''],
    subject: [, [Validators.required]],
    body: ['', [Validators.required]],
  });
}

}
