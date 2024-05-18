import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from '@core/services/translation.service';
import { EditorConfig } from '@shared/editor.config';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';
@Component({
  selector: 'app-interaction-notes',
  templateUrl: './interaction-notes.component.html',
  styleUrls: ['./interaction-notes.component.scss']
})
export class InteractionNotesComponent extends BaseComponent implements OnInit {

  @Input() id: string
  editorConfig = EditorConfig;
  notesForm: UntypedFormGroup;
  isLoading = false;
  notesList: any = [];
  constructor(
    private fb: UntypedFormBuilder,
    private toastrService: ToastrService,
    private InteractionServices: InventoryService,
    public translationService: TranslationService) {
    super(translationService);
    this.getLangDir();
    this.createForm();
  }

  ngOnInit(): void {
    this.getNotesList();
  }
  createForm() {
    this.notesForm = this.fb.group({
      body: ['', [Validators.required]],
    });
  }
  getNotesList() {
    this.isLoading = true;
    this.InteractionServices.getInteractionNotes(this.id).subscribe(res => {
      this.notesList = res
      
      this.isLoading = false
    }, error => {
      this.isLoading = false
      this.toastrService.error(error)
    })
  }
  addNote() {
    if (this.notesForm.invalid) {
      this.notesForm.markAllAsTouched();
      return
    }
  }
}
