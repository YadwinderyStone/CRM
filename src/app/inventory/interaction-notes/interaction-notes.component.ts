import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PatternValidator, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  @Input() InteractionDetail: any
  currentDate = new Date();
  editorConfig = EditorConfig;
  notesForm: UntypedFormGroup;
  loginUserDetail:any
  isLoading = false;
  notesList: any = [];
  columnsToDisplay: string[] = ['transactionNo','name','teamName','noteDesc','nextStatusTime','date'];
  constructor(
    private fb: UntypedFormBuilder,
    private toastrService: ToastrService,
    private InteractionServices: InventoryService,
    public translationService: TranslationService) {
    super(translationService);
    this.getLangDir();
    this.createForm();
    this.editorConfig.height='100px';
    this.editorConfig.minHeight='100px';
    this.loginUserDetail =JSON.parse(localStorage.getItem('authObj'))
  }

//   ngOnChanges(changes: SimpleChanges): void {
    
// this.transactionNo
//   }
  ngOnInit(): void {
    this.getNotesList();
  }
  createForm() {
    this.notesForm = this.fb.group({
      body: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9.]*$/)]],
      nextStatusTime: [this.currentDate, [Validators.required]],
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

  this.isLoading = true
    let userData = JSON.parse(localStorage.getItem('authObj'))
    let crmNoteData = {
      interactionId: this.id,
      noteDescription: this.notesForm.value.body,
      nextStatusTime: this.notesForm.value.nextStatusTime,
      interactionNumber: this.InteractionDetail?.transactionNumber,
      userId: userData?.id,
      createdByName: userData?.firstName + ' ' + userData?.lastName,
      teamName: userData?.teamName
    }
    this.InteractionServices.addCrmNote(crmNoteData).subscribe(res => {
      if (res) {
        this.toastrService.success('Comment added successfully');
        this.isLoading = false;
        this.getNotesList();
        this.createTransferHistory(crmNoteData,userData);
      }
      this.isLoading = false
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false
    })
  }


  createTransferHistory(value:any,user){
    this.isLoading=true
    let data = {
      id: value?.interactionId,
      action: 'Comments',
      message: `New Comment "${value?.noteDescription}" added by ${user?.firstName}`
    }
    this.InteractionServices.createHistory(data).subscribe(res=>{
      if(res){
        this.isLoading= false;
      }
    },error=>{
      this.toastrService.error(error);
      this.isLoading=false
    })
  }






}
