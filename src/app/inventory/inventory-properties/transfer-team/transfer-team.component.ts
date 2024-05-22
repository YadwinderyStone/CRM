import { Component, Inject, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../../inventory.service';

@Component({
  selector: 'app-transfer-team',
  templateUrl: './transfer-team.component.html',
  styleUrls: ['./transfer-team.component.scss']
})
export class TransferTeamComponent extends BaseComponent implements OnInit {
  isLoading: boolean = false;
  teamList: any = [];
  selectedTeam: any
  constructor(public dialogRef: MatDialogRef<TransferTeamComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,

    private inventoryService: InventoryService,
    private toastrService: ToastrService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
  }

  ngOnInit(): void {
    this.getTeamList();
  }

  getTeamList() {
    this.inventoryService.getTeamListForTransfer(this.data?.teamId).subscribe(res => {
      this.teamList = res?.body || res
    }, error => {
      this.toastrService.error(error);
    })
  }

  transerToTeam() {
    if (this.selectedTeam) {

      let teamName = this.teamList.filter(team=>team?.id== this.selectedTeam)
      let data = {     
          id: this.data?.id,
          teamId:this.selectedTeam,
          teamName: teamName[0]?.name
      }
      this.isLoading = true
      this.inventoryService.transferToTeam(data).subscribe(res => {
        this.toastrService.success(`Interaction Transfer to Team ${data?.teamName} successfully`);
        this.dialogRef.close(true)
      }, error => {
        this.toastrService.error(error);
        this.isLoading = false
      })
    } else {
      this.toastrService.error('Please select team')
    }
  }




}

