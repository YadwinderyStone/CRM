import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ProductCategoryService } from '@core/services/product-category.service';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
//FIXME: add interaction service for api call for interaction category api
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { InteractionCategory } from '@core/domain-classes/interactionCatetgory';
import { ToastrService } from 'ngx-toastr';
import { AddEditInteractionCategoryComponent } from '../add-edit-interaction-category/add-edit-interaction-category.component';
@Component({
  selector: 'app-interaction-category',
  templateUrl: './interaction-category.component.html',
  styleUrls: ['./interaction-category.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InteractionCategoryComponent extends BaseComponent implements OnInit {
  interactionCategories: InteractionCategory[] = [];
  columnsToDisplay: string[] = ['subcategory', 'name', 'description', 'action'];
  subCategoryColumnToDisplay: string[] = ['subcat','name', 'description', 'action'];
  subCategoryColumnToDisplayInner: string[] = ['name', 'description', 'action'];
  subCategories: InteractionCategory[] = [];
  subCategoriesInner: InteractionCategory[] = [];
  expandedElement: InteractionCategory | null;
  expandedElementInner: any | null;
  constructor(private dialog: MatDialog,
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
    this.getCategories()
  }

  getCategories(): void {
    // FIXME change the product api service with interaction category
    this.InteractionCategoryService.getInteractionTypeAndCategories().subscribe(res => {
      this.interactionCategories = res
    })
  }

  deleteInteractionCategory(id: string): void {
    // this.InteractionCategoryService.delete(id).subscribe(d => {
    //   this.toastrService.success(this.translationService.getValue(`CATEGORY_DELETED_SUCCESSFULLY`));
    //   this.getCategories();
    // });
  }


  toggleRow(element: InteractionCategory) {
    this.subCategories = [];
    this.InteractionCategoryService.getAllCategoriesForDropDown(element.id).subscribe(subCat => {
      this.subCategories = subCat;
      this.expandedElement = this.expandedElement === element ? null : element;
      this.cd.detectChanges();
    });
  }
  toggleInnerRow(element: InteractionCategory) {
    this.subCategoriesInner = [];
    this.InteractionCategoryService.getAllCategoriesForDropDown(element.id).subscribe(subCat => {
      this.subCategoriesInner = subCat
      this.expandedElementInner = this.expandedElementInner === element ? null : element;
      this.cd.detectChanges();
    });
  }

  deleteCategory(category: InteractionCategory): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${category.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
           this.deleteCategoryById(category?.id)
        }
      });
  }


  deleteCategoryById(id){
    this.InteractionCategoryService.deleteCategory(id).subscribe(res=>{
      if(res){
        this.toastrService.success('Category deleted Sucessfully')
        this.getCategories();
      }
    },error=>{
      this.toastrService.error(error);
    })
  }



  manageCategory(category: InteractionCategory): void {
    const dialogRef = this.dialog.open(AddEditInteractionCategoryComponent, {
      width: '350px',
      direction: this.langDir,
      data: Object.assign({}, category)
    });

    this.sub$.sink = dialogRef.afterClosed()
      .subscribe((result: InteractionCategory) => {
        if (result) {
          this.getCategories();
        }
      });
  }

  addSubCategory(category: InteractionCategory) {
    this.manageCategory({
      id: '',
      name: '',
      parentId: category?.id,
      isEnabled: category?.isEnabled
    });
  }


}
