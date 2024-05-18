
import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InteractionCategory } from '@core/domain-classes/interactionCatetgory';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-add-edit-interaction-status',
  templateUrl: './add-edit-interaction-status.component.html',
  styleUrls: ['./add-edit-interaction-status.component.scss']
})
export class AddEditInteractionStatusComponent extends BaseComponent implements OnChanges {

  isEdit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddEditInteractionStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InteractionCategory,
    private interactionCategoryService: InteractionCategoryService,
    public translationService:TranslationService,
    private toastrService: ToastrService) {
    super(translationService);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data.id) {
        this.isEdit = true;
      }
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  saveStatus(): void {
    
    if (this.data.id) {
      this.interactionCategoryService.updateStatus(this.data).subscribe(c => {
        this.toastrService.success('Status Saved Successfully.');
        this.dialogRef.close(this.data);
      },error=>{
        this.toastrService.error(error);
      });
    } else {
      this.interactionCategoryService.createStatus(this.data).subscribe(c => {
        this.toastrService.success('Status Saved Successfully.');
        this.dialogRef.close(this.data);
      },error=>{
        this.toastrService.error(error);
      });
    }
  }

  checkEnable(e:any){
this.data.isEnabled = e.checked
  }


}
