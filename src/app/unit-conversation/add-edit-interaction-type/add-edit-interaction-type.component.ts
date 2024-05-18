import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InteractionType } from '@core/domain-classes/interactionCatetgory';
import { InteractionCategoryService } from '@core/services/interactionCategory.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-add-edit-interaction-type',
  templateUrl: './add-edit-interaction-type.component.html',
  styleUrls: ['./add-edit-interaction-type.component.scss']
})
export class AddEditInteractionTypeComponent extends BaseComponent implements OnChanges {
  
    isEdit: boolean = false;
    constructor(
      public dialogRef: MatDialogRef<AddEditInteractionTypeComponent>,
      @Inject(MAT_DIALOG_DATA) public data: InteractionType,
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
  
    saveCategory(): void {

delete this.data['isEnabled']
this.data 
      // FIXME change api for interaction category status  data
      if (this.data.id) {
        this.interactionCategoryService.updateType(this.data).subscribe(c => {
          this.toastrService.success('Interaction type Saved Successfully.');
          this.dialogRef.close(this.data);
        });
      } else {
        this.interactionCategoryService.addType(this.data).subscribe(c => {
          this.toastrService.success('Interaction type Saved Successfully.');
          this.dialogRef.close(this.data);
        });
      }
    }
  
  }
  


