
import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { Problem } from '../problem.model';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-add-edit-problem-dialog',
  templateUrl: './add-edit-problem-dialog.component.html',
  styleUrls: ['./add-edit-problem-dialog.component.scss']
})
export class AddEditProblemDialogComponent extends BaseComponent implements OnChanges {
  
    isEdit: boolean = false;
    constructor(
      public dialogRef: MatDialogRef<AddEditProblemDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Problem,
      public translationService:TranslationService,
      private problemService:ProblemService,
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
  
    addProblem(): void {
     
      if (this.data.id) {
        this.problemService.updateProblem (this.data).subscribe(c => {
          this.toastrService.success('Problem updated Successfully.');
          this.dialogRef.close(this.data);
        },error=>{
          this.toastrService.error(error);
        });
      } else {
        this.problemService.addProblem(this.data).subscribe(c => {
          this.toastrService.success('Problem Saved Successfully.');
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
  
