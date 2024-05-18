import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InteractionType } from '@core/domain-classes/interactionCatetgory';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { LookupService } from '../lookup.service';
import { Lookup } from '@core/domain-classes/lookup.model'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-edit-sub-lookup',
  templateUrl: './add-edit-sub-lookup.component.html',
  styleUrls: ['./add-edit-sub-lookup.component.scss']
})
export class AddEditSubLookupComponent extends BaseComponent implements OnChanges {
  lookupForm: UntypedFormGroup;
  isLoading = false;
    
      isEdit: boolean = false;
      constructor(
        public dialogRef: MatDialogRef<AddEditSubLookupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private LookupService: LookupService,
        public translationService:TranslationService,
        private fb: UntypedFormBuilder,
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
 
        ngOnInit(): void {
          this.createForm();
        }
      
      
        createForm() {
          this.lookupForm = this.fb.group({
            name: [this.data?.name||'', [Validators.required]],
            lookupType: [this.data?.parentId, [Validators.required]],
            value: [this.data?.value ||'', [Validators.required]],
            valueInt: [this.data?.valueInt || 0, ],
            isEnabled: [this.data?.isEnabled || false],
          });
        }
      
        onSubmit() {
          if (this.lookupForm.valid) {
            let data = this.lookupForm.value
            data.valueInt?data.valueInt:0
            this.data?.lookUpId ? this.updateLookup(data) : this.addLookup(data)
          } else {
            this.lookupForm.markAllAsTouched();
          }
        }
      
      
        addLookup(data: Lookup) {
          this.isLoading = true;
          this.LookupService.addLookup(data).subscribe(res => {
            if (res) {
              this.toastrService.success('Lookup Saved Successfully.');
              this.dialogRef.close(true);
              this.isLoading = false;
            }
          }, error => {
            this.toastrService.error(error);
            this.isLoading = false;
      
          })
      
      
        }
      
      
        updateLookup(data) {
          data.id = this.data?.lookUpId;
          this.LookupService.updateLookup(data).subscribe(res => {
            if (res) {
              this.toastrService.success('Lookup Updated Successfully.');
              this.dialogRef.close();
              this.isLoading = false;
            }
          }, error => {
            this.toastrService.error(error);
            this.isLoading = false;
      
          })
      
        }
      
      
      }
      
  
  
  