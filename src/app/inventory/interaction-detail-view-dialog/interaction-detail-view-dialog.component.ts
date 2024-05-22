import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interaction-detail-view-dialog',
  templateUrl: './interaction-detail-view-dialog.component.html',
  styleUrls: ['./interaction-detail-view-dialog.component.scss']
})
export class InteractionDetailViewDialogComponent implements OnInit {
  statusList = [];
  selectedValue = '';
  constructor(
    public dialogRef: MatDialogRef<InteractionDetailViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private inventoryService: InventoryService,
    private toasterService: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.getDisPositionList();
  }

  getDisPositionList() {
    this.inventoryService.getDisPositionList().subscribe(res => {
      this.statusList = res;
    }, error => {
      this.toasterService.error(error)
    })
  }

  submit() {
    if (this.selectedValue) {
      this.dialogRef.close(true);
    // let UserId = localStorage.getItem('authObj')
    //   let data={

    //   }
    //   this.inventoryService.callDispose(data).subscribe(res => {
    //     if (res) {
    //       this.toasterService.success('successfully')
    //       this.dialogRef.close(true);
    //     }
    //   }, error => {
    //     this.toasterService.error(error)
    //   })
    } else {
      this.toasterService.error('please Select value')
    }
  }

}
