import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from '../inventory.service';
import { InteractionsActionEnums } from '@core/domain-classes/interacctionsAction.enum';
@Component({
  selector: 'app-self-assign-dialog',
  templateUrl: './self-assign-dialog.component.html',
  styleUrls: ['./self-assign-dialog.component.scss']
})
export class SelfAssignDialogComponent extends BaseComponent implements OnInit {


  isLoading = false;
  constructor(public dialogRef: MatDialogRef<SelfAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private toastrService: ToastrService,
    private inventoryService: InventoryService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.data;
    this.getLangDir();
  }

  ngOnInit(): void {
  }

  selfAssign() {
    this.isLoading = true
    let data = {
      userId: this.data?.userDetail?.id,
      interactionId: this.data?.interactionData?.id,
      teamId: this.data?.userDetail?.teamId,
      teamName: this.data?.userDetail?.teamName
    }
    this.inventoryService.selfAssign(data).subscribe(res => {
      if (res) {
        this.createHistory();
        this.toastrService.success('Interaction assigned successfully')
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false
    })

  }
  createHistory() {
    this.isLoading = true
    let data = {
      id: this.data?.interactionData?.id,
      action: InteractionsActionEnums?.UserSelfAssign,
      message: `Interaction self assigned to ${this.data?.userDetail?.userName} `
    }
    this.inventoryService.createHistory(data).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
        this.isLoading = false;
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false
    })

  }

}
