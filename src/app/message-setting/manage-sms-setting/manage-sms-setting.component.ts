import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { SmsSettingConfigService } from '../sms-setting-config.service';
import { SMSConFigSetting } from '@core/domain-classes/sms-setting';

@Component({
  selector: 'app-manage-sms-setting',
  templateUrl: './manage-sms-setting.component.html',
  styleUrls: ['./manage-sms-setting.component.scss']
})
export class ManageSmsSettingComponent extends BaseComponent implements OnInit {

  isEditMode: boolean = false;
  loading: boolean = false;
  id: string = ''
  smsConfigForm: UntypedFormGroup;
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private activeRoute: ActivatedRoute,
    private smsSettingConfigService: SmsSettingConfigService,
    private toasterService: ToastrService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
    this.activeRoute.params.subscribe(res => {
      if (res?.id) {
        this.isEditMode = true
        this.getSmsSettingById(res?.id);
      }
    })
  }
  
  ngOnInit(): void {
    this.createForm();
  }
  getSmsSettingById(id){
    this.smsSettingConfigService.getSMSConFigSettingById(id).subscribe(res=>{
      this.updateForm(res);
    })
  }
  updateForm(res){
this.smsConfigForm.patchValue(res);
  }
  createForm() {
    this.smsConfigForm = this.fb.group({
      id: [''],
      host: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      apiKey: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isDefault: [false],
    });
  }

  saveSetting() {
    if (this.smsConfigForm.valid) {
      this.loading = true
      const data: SMSConFigSetting = this.smsConfigForm.value
      let userDetail = JSON.parse(localStorage.getItem('authObj'))
      data.userId = userDetail?.id;
      if (this.isEditMode) {
        data.isEdit = 1
        this.sub$.sink = this.smsSettingConfigService.updateSMSConFigSetting(data).subscribe((res: any) => {
          if (res?.success) {
            this.toasterService.success('SMS Setting Updated Successfully');
            this.loading = false
            this.router.navigate(['/sms-Config']);
          }else{
            this.toasterService.error(res?.message) 
             this.loading = false
           }
        }, error => {
          this.loading = false
        });
      } else {
        data.isEdit = 0
        data.id = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        this.sub$.sink = this.smsSettingConfigService.addSMSConFigSetting(data).subscribe((res: any) => {
          if(res?.success){
            this.toasterService.success('SMS Setting Created Successfully');
            this.loading = false
            this.router.navigate(['/sms-Config']);
          }else{
           this.toasterService.error(res?.message) 
            this.loading = false
          }
        }, error => {
          this.loading = false
        });
      }
    } else {
      this.smsConfigForm.markAllAsTouched();
    }
  }

  // createBuildObject(): EmailSMTPSetting {
  //   const id = this.smsConfigForm.get('id').value;
  //   const user: EmailSMTPSetting = {
  //     id: id,
  //     host: this.smsConfigForm.get('host').value,
  //     userName: this.smsConfigForm.get('userName').value,
  //     password: this.smsConfigForm.get('password').value,
  //     isEnableSSL: this.smsConfigForm.get('isEnableSSL').value,
  //     port: this.smsConfigForm.get('port').value,
  //     isDefault: this.smsConfigForm.get('isDefault').value
  //   }
  //   return user;
  // }
}

