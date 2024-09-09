import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailSMTPSetting } from '@core/domain-classes/email-smtp-setting';
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
  smsConfigForm: UntypedFormGroup;
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private activeRoute: ActivatedRoute,
    private smsSettingConfigService: SmsSettingConfigService,
    private toastrService: ToastrService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.smsConfigForm = this.fb.group({
      id: [''],
      host: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isEnableSSL: [false],
      port: ['', [Validators.required]],
      isDefault: [false],
    });
  }

  saveSetting() {
    if (this.smsConfigForm.valid) {
      const data:SMSConFigSetting = this.smsConfigForm.value
      if (this.isEditMode) {
        this.sub$.sink = this.smsSettingConfigService.updateSMSConFigSetting(data).subscribe(() => {
          this.toastrService.success('SMS Setting Updated Successfully');
          this.router.navigate(['/email-smtp']);
        });
      } else {
        this.sub$.sink = this.smsSettingConfigService.addSMSConFigSetting(data).subscribe(() => {
          this.toastrService.success('SMS Setting Created Successfully')
          this.router.navigate(['/']);
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

