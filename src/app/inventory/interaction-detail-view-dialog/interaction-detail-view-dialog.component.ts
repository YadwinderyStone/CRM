import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-interaction-detail-view-dialog',
  templateUrl: './interaction-detail-view-dialog.component.html',
  styleUrls: ['./interaction-detail-view-dialog.component.scss']
})
export class InteractionDetailViewDialogComponent implements OnInit {
  statusList = [];
  selectedValue = '';
  isLoading:boolean = false
  isError:boolean = false
  disposeForm: UntypedFormGroup;
  loginUserDetail: any;
  currentDate = new Date();
  constructor(
    public dialogRef: MatDialogRef<InteractionDetailViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private fb: UntypedFormBuilder,
    private inventoryService: InventoryService,
    private toasterService: ToastrService,
  ) {
    this.data
    this.loginUserDetail = JSON.parse(localStorage.getItem('authObj'));
    debugger
  }

  ngOnInit(): void {
    this.getDisPositionList();
    if (this.data?.userData?.direction == "INBOUND") {

      let data = {
        "dispCode": "NONE",
        "isCallback": "0",
        "callBackTime": "",
        "crmid": this.loginUserDetail?.email,
        "lob": "",
        "productCode": "",
        "isPersonalcall": "0",
        "mobileNumber": this.data?.userData?.cli,
        "intercationId": this.data?.id,
        "userId": this.loginUserDetail?.id,
        "contactId": this.data?.userData?.custId,
        "dispositionDesc": "NONE"
      }

      this.inventoryService.callDispose(data).subscribe(res => {
        if (res) {
          // this.toasterService.success('successfully')
          // this.dialogRef.close(true);
        }
      }, error => {
        this.toasterService.error(error)
      })
    }else{
      this.createForm();
    }
  }
  createForm() {
    this.disposeForm = this.fb.group({
      dispositionId: ['', Validators.required],
      date: [''],
    })
  }
  getDisPositionList() {
    this.inventoryService.getDisPositionList().subscribe(res => {
      this.statusList = res;
    }, error => {
      this.toasterService.error(error)
    })
  }

  submit() {
    if (this.disposeForm.valid) {
      this.isLoading = true
let dispodesc =this.statusList.filter(e=> e.dispoCode==this.disposeForm.value?.dispositionId)
let data ={
  "dispCode": this.disposeForm.value?.dispositionId,
        "isCallback": "0",
        "callBackTime":this.disposeForm.value?.date || '',
        "crmid": this.loginUserDetail?.email,
        "lob": "",
        "productCode": "",
        "isPersonalcall": "0",
        "mobileNumber": this.data?.userData?.cli,
        "intercationId": this.data?.id,
        "userId": this.loginUserDetail?.id,
        "contactId": this.data?.userData?.custId,
        "dispositionDesc": dispodesc[0]?.dispoDesc
}
      this.inventoryService.callDispose(data).subscribe(res => {
        if (res) {
          // this.toasterService.success('successfully')
          this.dialogRef.close(true);
          this.isLoading = false
          
        }
      }, error => {
        this.isLoading = false
        // this.dialogRef.close(true);
        this.isError = true
        this.toasterService.error('Error In Cti Close Call Api')
      })
    } else {
      this.disposeForm.markAllAsTouched();
    }
  }

  onChange(event) {
    if (event?.value == 'Call_Back') {
      this.disposeForm.get('date').setValidators([Validators.required]);
      this.disposeForm.get('date').updateValueAndValidity();
    }
    else {
      this.disposeForm.get('date').setValidators([]);
      this.disposeForm.get('date').updateValueAndValidity();
    }
  }





}
