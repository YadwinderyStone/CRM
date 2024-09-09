import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { SMSConFigSetting } from '@core/domain-classes/sms-setting';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { SmsSettingConfigService } from '../sms-setting-config.service';

@Component({
  selector: 'app-sms-setting',
  templateUrl: './sms-setting.component.html',
  styleUrls: ['./sms-setting.component.scss']
})
export class SmsSettingComponent extends BaseComponent implements OnInit {

  SmsSettings: SMSConFigSetting[] = [];
  displayedColumns: string[] = ['action', 'userName', 'host', 'port', 'isDefault'];

  constructor(private SMSConFigSettingService: SmsSettingConfigService,
    private commonDialogService: CommonDialogService,
    private toasterService: ToastrService,
    public translationService: TranslationService) {
    super(translationService);
    this.getLangDir();
  }

  ngOnInit(): void {
    this.getSMSConFigSettings();
  }

  getSMSConFigSettings() {
    this.sub$.sink = this.SMSConFigSettingService.getSMSConFigSettings().subscribe((settings: any) => {
      this.SmsSettings = settings?.smsSettingList;
    })
  }

  deleteSMSConFigSetting(setting: SMSConFigSetting) {
    const areU = this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE');
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${areU} ${setting.host}`)
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.SMSConFigSettingService.deleteSMSConFigSetting(setting.id).subscribe(() => {
            this.toasterService.success('Setting Deleted Successfully');
            this.getSMSConFigSettings();
          });
        }
      });
  }
}

