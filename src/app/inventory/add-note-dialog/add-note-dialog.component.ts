import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { EditorConfig } from '@shared/editor.config';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';
import { FileInfo } from '@core/domain-classes/file-info';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.scss']
})
export class AddNoteDialogComponent extends BaseComponent implements OnInit {
  editorConfig = EditorConfig;
  notesForm: UntypedFormGroup;
  isLoading = false;
  files: any = [];
  fileData: FileInfo[] = [];
  extension: string = '';
  fileType: string = '';
  currentDate = new Date();
  constructor(public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private fb: UntypedFormBuilder,
    private toastrService: ToastrService,
    private inventoryService: InventoryService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.data;
    this.getLangDir();
    this.editorConfig.height = '100px';
    this.editorConfig.minHeight = '100px';
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.notesForm = this.fb.group({
      body: ['', [Validators.required]],
      nextStatusTime: [this.currentDate, [Validators.required]],
    });
  }


  addNote() {
    if (this.notesForm.invalid) {
      this.notesForm.markAllAsTouched();
      return
    }
    this.isLoading = true
    let userData = JSON.parse(localStorage.getItem('authObj'))
    let crmNoteData = {
      interactionId: this.data?.id,
      noteDescription: this.notesForm.value.body,
      nextStatusTime: this.notesForm.value.nextStatusTime,
      interactionNumber: this.data?.transactionNumber,
      userId: userData?.id,
      createdByName: userData?.firstName + ' ' + userData?.lastName,
      teamName: userData?.teamName,
      attechments: this.fileData,
    }

    this.inventoryService.addCrmNote(crmNoteData).subscribe(res => {
      if (res) {
        this.toastrService.success('Note added successfully');
        this.createTransferHistory(crmNoteData)
        // this.dialogRef.close(true);
        this.isLoading = false
      }
      this.isLoading = false
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false
    })
  }

  createTransferHistory(value:any){
    this.isLoading=true
    let data = {
      id: value?.interactionId,
      action: 'Comments',
      message: `New Comment "${value?.noteDescription}" added by ${value?.createdByName}`
    }
    this.inventoryService.createHistory(data).subscribe(res=>{
      if(res){
        this.isLoading= false;
        this.dialogRef.close(true);
      }
    },error=>{
      this.toastrService.error(error);
      this.isLoading=false
    })
  }

  onFileDropped($event) {
    for (let file of $event) {
      this.files.push(file);
    }
    this.getFileInfo();

  }


  fileBrowseHandler(files: any) {
    for (let file of files) {
      this.files.push(file);
    }
    this.getFileInfo();
  }

  getFileInfo() {
    this.fileData = [];
    for (let i = 0; i < this.files.length; i++) {
      const reader = new FileReader();
      this.extension = this.files[i].name.split('.').pop().toLowerCase();
      this.fileType = this.files[i].type;
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const fileInfo = new FileInfo();
        fileInfo.src = ev.target.result.toString();
        fileInfo.extension = this.extension;
        fileInfo.name = this.files[i].name;
        fileInfo.fileType = this.fileType;
        this.fileData.push(fileInfo);
      }
      reader.readAsDataURL(this.files[i]);
    };
  }



}
