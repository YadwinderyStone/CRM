import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';
import { InteractionsActionEnums } from '@core/domain-classes/interacctionsAction.enum';


@Component({
  selector: 'app-email-update-dialog',
  templateUrl: './email-update-dialog.component.html',
  styleUrls: ['./email-update-dialog.component.scss']
})
export class EmailUpdateDialogComponent extends BaseComponent implements OnInit {
  emailForm: UntypedFormGroup;
  isLoading = false;
  user: any
  constructor(public dialogRef: MatDialogRef<EmailUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private fb: UntypedFormBuilder,
    private toastrService: ToastrService,
    private inventoryService: InventoryService,
    public translationService: TranslationService,
  ) {
    super(translationService);
    this.getLangDir();
    this.user = JSON.parse(localStorage.getItem('authObj'));
    this.data
    debugger
  }
  ngOnInit(): void {
    this.createEmailForm();
  }
  createEmailForm() {
    this.emailForm = this.fb.group({
      mobileNo: [this.data?.mobileNo, [Validators.required]],
      emailId: [this.data?.emailId, [Validators.required, Validators.email]],
    });
  }

  update() {
    if (!this.emailForm.valid) {
      this.emailForm.markAllAsTouched();
      return
    }
    let data = {
      mobileNo:this.emailForm.value?.mobileNo,
      emailId:this.emailForm.value?.emailId,
      contactId:this.data?.contactId,
      interactionId:this.data?.id,
      userId:this.user?.id
    }

    this.isLoading = true;
    this.inventoryService.updateEmail(data).subscribe(res => {
      if (res) {
        this.toastrService.success('Email and mobile no. update successfully')
        this.createTransferHistory();
      }
    }, error => {
      this.isLoading = false;
      this.toastrService.error(error);
    })


  }

  createTransferHistory() {
    this.isLoading = true
    let message = ''
    if (this.data?.mobileNo != this.emailForm.value?.mobileNo) message += `MobileNo : ${this.emailForm.value?.mobileNo}  `;
    if (this.data?.emailId != this.emailForm.value?.emailId) message += `EmailId : ${this.emailForm.value?.emailId}`;
    let data = {
      id: this.data?.id,
      action: InteractionsActionEnums?.UpdateHistory,
      message: message
    }
    this.inventoryService.createHistory(data).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
        this.isLoading = false;
      } else {
        this.toastrService.error('error in create history');
        this.isLoading = false;
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false;
    })

  }





}