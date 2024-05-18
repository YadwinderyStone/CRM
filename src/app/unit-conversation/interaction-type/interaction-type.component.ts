
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ProductCategoryService } from '@core/services/product-category.service';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
//FIXME: add interaction service for api call for interaction category api
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import {InteractionType} from '@core/domain-classes/interactionCatetgory';
import { ToastrService } from 'ngx-toastr';
import { AddEditInteractionTypeComponent } from '../add-edit-interaction-type/add-edit-interaction-type.component';

@Component({
  selector: 'app-interaction-type',
  templateUrl: './interaction-type.component.html',
  styleUrls: ['./interaction-type.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InteractionTypeComponent extends BaseComponent  implements OnInit {

interactionCategories: InteractionType[] =[];
  columnsToDisplay: string[] = ['action', 'name', 'typeFor'];
  subCategoryColumnToDisplay: string[] = ['action', 'name', 'description'];
  subCategories: InteractionType[] = [];
  expandedElement:InteractionType| null;
  constructor( private dialog: MatDialog,
    private commonDialogService: CommonDialogService,
    private cd: ChangeDetectorRef,
    private toastrService: ToastrService,
    private InteractionCategoryService: InteractionCategoryService,
    private ProductCategoryService: ProductCategoryService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
  }


  ngOnInit(): void {
    this.getInteractionTypes()
  }

  getInteractionTypes(): void {
    // FIXME change the product api service with interaction category
    this.InteractionCategoryService.getAllInteractionsTypes().subscribe(res=>{
      this.interactionCategories = res
    })
  }

  deleteType(id: string): void {
    this.InteractionCategoryService.deleteType(id).subscribe(d => {
      this.toastrService.success(this.translationService.getValue(`CATEGORY_DELETED_SUCCESSFULLY`));
      this.getInteractionTypes();
    });
  }


  toggleRow(element: InteractionType) {
    this.subCategories = [];
    // FIXME add api for get sub category
    this.ProductCategoryService.getSubCategories(element.id).subscribe(subCat => {
      this.subCategories = subCat;
      this.expandedElement = this.expandedElement === element ? null : element;
      this.cd.detectChanges();
    });
  }

  deleteInteractionType(type: InteractionType): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${type.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
          // this.deleteCategory(id); add api function for delete category
        this.deleteType(type.id);
        }
      });
  }
  manageType(type: InteractionType): void {
    const dialogRef = this.dialog.open(AddEditInteractionTypeComponent, {
      width: '350px',
      direction:this.langDir,
      data: Object.assign({}, type)
    });

    this.sub$.sink = dialogRef.afterClosed()
      .subscribe((result: InteractionType) => {
        if (result) {
          this.getInteractionTypes();
        }
      });
  }
  addSubCategory(category: InteractionType) {
    this.manageType({
      id: '',
      name: '',
      parentId: category.id,
      enabled:category.enabled
    });
  }

}
