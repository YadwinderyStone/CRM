import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmailInboxService } from '../email-inbox.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-email-inbox-detail',
  templateUrl: './email-inbox-detail.component.html',
  styleUrls: ['./email-inbox-detail.component.scss']
})
export class EmailInboxDetailComponent extends BaseComponent implements OnInit {
id:string = ''
emailDetail:any=''
  constructor(
    private emailInboxService: EmailInboxService,
    public toasterServices: ToastrService,
    private activatedRoute:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router:Router,
  ) { 
    super();
    this.activatedRoute.params.subscribe(res=>{
      this.id=res.id
    })
  }

  ngOnInit(): void {
    this.getEmailDetail(this.id);

  }

  getEmailDetail(id){
   this.emailInboxService.getEmailDetailById(id).subscribe((res:any)=>{
    this.emailDetail = res?.body ||res
   })
  }

senitizeContent(data){
  let sanitizedContent:SafeHtml = this.sanitizer.bypassSecurityTrustHtml(data);
 return  sanitizedContent
}


}
