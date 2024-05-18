import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ProductCategoryService } from '@core/services/product-category.service';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { InteractionStatus } from '@core/domain-classes/interactionCatetgory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-status-grid',
  templateUrl: './dashboard-status-grid.component.html',
  styleUrls: ['./dashboard-status-grid.component.scss'],
  
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardStatusGridComponent extends BaseComponent implements OnInit {


  


    interactionStatus: InteractionStatus[] = [];
    columnsToDisplay: string[] = ['substatus', 'name', 'status'];
    subCategoryColumnToDisplay: string[] = ['name', 'status'];
    subCategories: InteractionStatus[] = [];
    expandedElement: InteractionStatus | null;
    constructor(private dialog: MatDialog,
      private cd: ChangeDetectorRef,
      private toastrService: ToastrService,
      private InteractionCategoryService: InteractionCategoryService,
      public translationService: TranslationService
    ) {
      super(translationService);
      this.getLangDir();
    }
  
  
    ngOnInit(): void {
      this.getInteractionStatus()
    }
  
    getInteractionStatus(): void {
      this.InteractionCategoryService.getAllStatus().subscribe(res => {
        this.interactionStatus = res
      },error=>{
        this.toastrService.error(error);
      })
    }
    
  
    toggleRow(element: InteractionStatus) {
      this.subCategories = [];
      this.InteractionCategoryService.getSubStatus(element.id).subscribe(subCat => {
        this.subCategories = subCat;
        this.expandedElement = this.expandedElement === element ? null : element;
        this.cd.detectChanges();
      },error=>{
        this.toastrService.error(error);
      });
    }
  
  }
  