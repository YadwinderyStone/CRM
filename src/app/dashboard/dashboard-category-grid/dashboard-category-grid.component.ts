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
@Component({
  selector: 'app-dashboard-category-grid',
  templateUrl: './dashboard-category-grid.component.html',
  styleUrls: ['./dashboard-category-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardCategoryGridComponent extends BaseComponent implements OnInit {
    interactionCategories: InteractionCategory[] = [];
    columnsToDisplay: string[] = ['subcategory', 'name', 'description'];
    subCategoryColumnToDisplay: string[] = ['subcat','name', 'description'];
    subCategoryColumnToDisplayInner: string[] = ['name', 'description'];
    subCategories: InteractionCategory[] = [];
    subCategoriesInner: InteractionCategory[] = [];
    expandedElement: InteractionCategory | null;
    expandedElementInner: any | null;
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
      this.getCategories()
    }
  
    getCategories(): void {
      // FIXME change the product api service with interaction category
      this.InteractionCategoryService.getInteractionTypeAndCategories().subscribe(res => {
        this.interactionCategories = res
      },error=>{
        this.toastrService.error(error);
      })
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
  
  }
  
