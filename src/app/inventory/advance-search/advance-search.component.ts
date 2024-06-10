import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from '../inventory.service';
import { InteractionsActionEnums } from '@core/domain-classes/interacctionsAction.enum';
import { InteractionCategory, InteractionType } from '@core/domain-classes/interactionCatetgory';
import { Queue } from '@core/domain-classes/queue.model';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss']
})
export class AdvanceSearchComponent extends BaseComponent implements OnInit {
  isLoading = false;
  gstn: string = ''
  mobileNo: string = ''
  emailId: string = ''
  selectedTeam: string = ''
  selectedType: string = ''
  selectedCategory: string = ''
  selectedSubCategory: string = ''
  catInput: string = '';
  subCatInput: string = ''
  typeList: InteractionType[] = [];
  teamList: Queue[] = [];
  categoryList: InteractionCategory[] = [];
  subCategoryList: InteractionCategory[] = [];

  constructor(public dialogRef: MatDialogRef<AdvanceSearchComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private toasterService: ToastrService,
    private inventoryService: InventoryService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
    this.gstn = data?.gstn
    this.mobileNo = data?.mobileNo
    this.emailId = data?.emailId
    this.selectedTeam = data?.selectedTeam
    this.selectedType = data?.selectedType
    this.selectedCategory = data?.selectedCategory
    this.selectedSubCategory = data?.selectedSubCategory
  }

  ngOnInit(): void {
    this.getTypeList();
    this.getTeamList();
  }

  getTypeList() {
    this.inventoryService.getCategoryList().subscribe(res => {
      this.typeList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }
  getTeamList() {
    this.inventoryService.getTeamsList().subscribe(res => {
      this.teamList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }


  getCatList(id) {
    this.inventoryService.getSubCategoryList(id).subscribe(res => {
      this.categoryList = res;
    }, error => {
      this.toasterService.error(error);
    })
  }
  getSubCatList(id) {
    this.inventoryService.getSubCategoryList(id).subscribe(res => {
      this.subCategoryList = res;

    }, error => {
      this.toasterService.error(error);
    })

  }

  onTypeChange(event) {
    this.selectedCategory = ''
    this.getCatList(event?.value);
  }

  onCatChange(event) {
    this.selectedSubCategory = ''
    this.getSubCatList(event?.value)
  }


  searchFilter() {
    let data = {
      gstn: this.gstn,
      mobileNo: this.mobileNo,
      emailId: this.emailId,
      selectedTeam: this.selectedTeam,
      selectedType: this.selectedType,
      selectedCategory: this.selectedCategory,
      selectedSubCategory: this.selectedSubCategory
    }
    this.dialogRef.close(data)
  }

  onClear() {
    this.gstn = '',
    this.mobileNo = ''
    this.emailId = '',
    this.selectedTeam = '',
    this.selectedType = '',
    this.selectedCategory = '',
    this.selectedSubCategory = ''

  }

}

