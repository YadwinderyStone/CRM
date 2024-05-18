import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { EditorConfig } from '@shared/editor.config';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent extends BaseComponent implements OnInit  {
  editorConfig = EditorConfig;
  notesForm: UntypedFormGroup;
  isLoading = false;
    constructor(public dialogRef: MatDialogRef<AddNoteDialogComponent>,
      @Inject(MAT_DIALOG_DATA)
      public data,
      private fb: UntypedFormBuilder,
      private toastrService: ToastrService,
      public translationService: TranslationService
    ) {
      super(translationService);
  
      this.data
      debugger
      this.getLangDir();
    
    }
    
    ngOnInit(): void {
      this.createForm();
    }
    createForm() {
      this.notesForm = this.fb.group({
        body: ['', [Validators.required,Validators.minLength(10)]],
      });
    }


    addNote() {
      if (this.notesForm.invalid) {
        this.notesForm.markAllAsTouched();
        return
      }

    }
}
