import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { EmailOutboxService } from '../email-outbox.service';

@Component({
  selector: 'app-email-outbox-detail',
  templateUrl: './email-outbox-detail.component.html',
  styleUrls: ['./email-outbox-detail.component.scss']
})
export class EmailOutboxDetailComponent extends BaseComponent implements OnInit {

  id:string = ''
  emailDetail:any=''
    constructor(
      private emailOutBoxService: EmailOutboxService,
      public toasterService: ToastrService,
      public toasterServices: ToastrService,
      private activatedRoute:ActivatedRoute,
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
     this.emailOutBoxService.getEmailDetailById(id).subscribe((res:any)=>{
      this.emailDetail = res
     })
    }
  
  }
  