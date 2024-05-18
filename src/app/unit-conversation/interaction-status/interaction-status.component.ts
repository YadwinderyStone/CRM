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
import { AddEditInteractionStatusComponent } from '../add-edit-interaction-status/add-edit-interaction-status.component';

@Component({
  selector: 'app-interaction-status',
  templateUrl: './interaction-status.component.html',
  styleUrls: ['./interaction-status.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InteractionStatusComponent extends BaseComponent implements OnInit {
  interactionStatus: InteractionStatus[] = [];
  columnsToDisplay: string[] = ['substatus', 'name', 'status', 'action',];
  subCategoryColumnToDisplay: string[] = ['name', 'status', 'action'];
  subCategories: InteractionStatus[] = [];
  expandedElement: InteractionStatus | null;
  constructor(private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
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
    })
  }

  deleteInteractionCategory(id: string): void {
    this.InteractionCategoryService.deleteStatus(id).subscribe(d => {
      this.toastrService.success(this.translationService.getValue(`CATEGORY_DELETED_SUCCESSFULLY`));
      this.getInteractionStatus();
    });
  }


  toggleRow(element: InteractionStatus) {
    this.subCategories = [];
    this.InteractionCategoryService.getSubStatus(element.id).subscribe(subCat => {
      this.subCategories = subCat;
      this.expandedElement = this.expandedElement === element ? null : element;
      this.cd.detectChanges();
    });
  }

  deleteStatus(status: InteractionStatus): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${status.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
          this.deleteStatusById(status.id);
        }
      });
  }

  deleteStatusById(id) {
    this.InteractionCategoryService.deleteStatus(id).subscribe(d => {
      // this.toastrService.success(this.translationService.getValue(`CATEGORY_DELETED_SUCCESSFULLY`));
      this.toastrService.success('Status deleted sucessfully');
      this.getInteractionStatus();
    }, error => {
      this.toastrService.error(error);
    });
  }


  manageStatus(category: InteractionStatus): void {
    const dialogRef = this.dialog.open(AddEditInteractionStatusComponent, {
      width: '350px',
      direction: this.langDir,
      data: Object.assign({}, category)
    });

    this.sub$.sink = dialogRef.afterClosed()
      .subscribe((result: InteractionStatus) => {
        if (result) {
          if (result.parentId == '0') {
            this.getInteractionStatus();
          } else {
            this.getToggleData(category);
          }

        }
      });
  }
  getToggleData(element) {
    this.InteractionCategoryService.getSubStatus(element.parentId).subscribe(subCat => {
      this.subCategories = subCat
    })
  }

  addSubCategory(category: InteractionStatus) {
    this.manageStatus({
      id: '',
      name: '',
      parentId: category.id
    });
  }


}
