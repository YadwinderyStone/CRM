import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { Dispostion } from '../disposition.model';
import { DispositionService } from '../disposition.service';
import { AddDispositionComponent } from '../add-disposition/add-disposition.component';

@Component({
  selector: 'app-disposition-list',
  templateUrl: './disposition-list.component.html',
  styleUrls: ['./disposition-list.component.scss']
})
export class DispositionListComponent extends BaseComponent implements OnInit {
     dispositionList: Dispostion[] = [];
    columnsToDisplay: string[] = ['name','desc','status','action',];
    constructor(private dialog: MatDialog,
      private commonDialogService: CommonDialogService,
      private dispositionService:DispositionService,
      private toastrService: ToastrService,
      public translationService: TranslationService
    ) {
      super(translationService);
      this.getLangDir();
    }
  
  
    ngOnInit(): void {
      this.getDispositionList();
    }
  
    getDispositionList(): void {
      this.dispositionService.getDispositionList().subscribe(res => {
        this.dispositionList = res;
      })
    }
  
  
    deleteDisposition(data: Dispostion): void {
      this.sub$.sink = this.commonDialogService
        .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')}`)
        .subscribe(isTrue => {
          if (isTrue) {
            this.deleteDispositionById(data.id);
          }
        });
    }
  
    deleteDispositionById(id) {
      this.dispositionService.deleteDispositionById(id).subscribe(d => {
        this.toastrService.success('Disposition deleted sucessfully');
        this.getDispositionList();
      }, error => {
        this.toastrService.error(error);
      });
    }
  
  
    manageDisposition(data: Dispostion): void {
      const dialogRef = this.dialog.open(AddDispositionComponent, {
        width: '550px',
        direction: this.langDir,
        data: Object.assign({}, data)
      });
  
      this.sub$.sink = dialogRef.afterClosed()
        .subscribe((result: any) => {
          if (result) {  
              this.getDispositionList()
          }
        });
    }
  
  
  
  }
  