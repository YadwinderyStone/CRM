import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { LookupService } from '../lookup.service';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { ProductCategoryService } from '@core/services/product-category.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { Lookup } from '@core/domain-classes/lookup.model';
import { AddEditSubLookupComponent } from '../add-edit-sub-lookup/add-edit-sub-lookup.component';

@Component({
  selector: 'app-lookup-list',
  templateUrl: './lookup-list.component.html',
  styleUrls: ['./lookup-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LookupListComponent extends BaseComponent  implements OnInit {
  lookupList: Lookup[] =[];
    columnsToDisplay: string[] = ['substatus','type','action', ];
    subCategoryColumnToDisplay: string[] = ['name', 'value','action',];
    lookupTypes: Lookup[] = [];
    expandedElement: Lookup | null;
    constructor( private dialog: MatDialog,
      private commonDialogService: CommonDialogService,
      private cd: ChangeDetectorRef,
      private toastrService: ToastrService,
      private LookupService: LookupService,
      public translationService: TranslationService
    ) {
      super(translationService);
      this.getLangDir();
    }
  
  
    ngOnInit(): void {
      this.getLookupList()
    }

  getLookupList(): void {
    // FIXME change the product api service with interaction category
    this.LookupService.getLookupList().subscribe(res=>{
      this.lookupList = res
    })
  }


  toggleRow(element: Lookup) {
    this.lookupTypes = [];
    // FIXME add api for get sub category
    this.LookupService.getSubLookUps(element?.lookupType).subscribe(res => {
      this.lookupTypes = res;
      this.expandedElement = this.expandedElement === element ? null : element;
      this.cd.detectChanges();
    });
  }

  deleteLookup(status: Lookup): void {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${status.name}`)
      .subscribe(isTrue => {
        if (isTrue) {
         this.deleteLookupById(status.lookUpId);
        }
      });
  }
  // deleteSubLookup(status: Lookup): void {
  //   this.sub$.sink = this.commonDialogService
  //     .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${status.name}`)
  //     .subscribe(isTrue => {
  //       if (isTrue) {
  //        this.deleteLookupById(status.id);
  //       }
  //     });
  // }

deleteLookupById(id){
  this.LookupService.deleteLookup(id).subscribe(d => {
    // this.toastrService.success(this.translationService.getValue(`CATEGORY_DELETED_SUCCESSFULLY`));
    this.toastrService.success('Lookup deleted successfully');
    this.getLookupList();
  });
}


  manageLookupType(lookupType: Lookup,data?:any): void {
    let LookupData = lookupType
    data?LookupData.parentId = data?.lookupType:''
    const dialogRef = this.dialog.open(AddEditSubLookupComponent, {
      width: '350px',
      direction:this.langDir,
      data: Object.assign({}, LookupData)
    });

    this.sub$.sink = dialogRef.afterClosed()
      .subscribe((result: Lookup) => {
        if (result) {
          this.getLookupList();
        }
      });
  }

  addSublookup(data: Lookup) {
    this.manageLookupType({
      id: '',
      name: '',
      parentId: data?.lookupType
    });
  }


}
