
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { CalenderList } from '../calender.model'
import { ToastrService } from 'ngx-toastr';
import { CalenderService } from '../calender.service';


@Component({
  selector: 'app-calender-list',
  templateUrl: './calender-list.component.html',
  styleUrls: ['./calender-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CalenderListComponent extends BaseComponent implements OnInit{

    calenderList: CalenderList[] = [];
    columnsToDisplay: string[] = ['srNo','date', 'day','occasion', 'action'];
    currentYear = (new Date()).getFullYear();
    constructor(
      private commonDialogService: CommonDialogService,
      private toastrService: ToastrService,
      private calenderSeverice:CalenderService,
      public translationService: TranslationService
    ) {
      super(translationService);
      this.getLangDir();
    }
  
  
    ngOnInit(): void {
      this.getCalenderList()
    }
  
    getCalenderList(): void {
      this.calenderSeverice.getCalenderList().subscribe(res => {
        this.calenderList = res
      })
    }
  
    deleteCalenderEvent(id: string): void {
      this.calenderSeverice.deleteCalenderEvent(id).subscribe(d => {
        this.toastrService.success('calender event deleed successfully');
        this.getCalenderList();
      });
    }
  
    // FIXME:CHange model for calender 
    deleteEvent(status: CalenderList): void {
      this.sub$.sink = this.commonDialogService
        .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${status.name}`)
        .subscribe(isTrue => {
          if (isTrue) {
            this.deleteCalenderEvent(status.id);
          }
        });
    }
  

  }
  