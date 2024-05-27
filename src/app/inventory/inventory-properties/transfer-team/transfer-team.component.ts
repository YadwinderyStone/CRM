import { Component, Inject, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../../inventory.service';
import {InteractionsActionEnums } from '@core/domain-classes/interacctionsAction.enum';

@Component({
  selector: 'app-transfer-team',
  templateUrl: './transfer-team.component.html',
  styleUrls: ['./transfer-team.component.scss']
})
export class TransferTeamComponent extends BaseComponent implements OnInit {
  isLoading: boolean = false;
  teamList: any = [];
  selectedTeam: any
  user:any
  constructor(public dialogRef: MatDialogRef<TransferTeamComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,

    private inventoryService: InventoryService,
    private toastrService: ToastrService,
    public translationService: TranslationService
  ) {
    super(translationService);
    this.getLangDir();
    this.user = JSON.parse(localStorage.getItem('authObj'));
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
      let teamName = this.teamList.filter(team=>team?.assignTeamId== this.selectedTeam)
      let data = {     
          id: this.data?.id,
          teamId:this.selectedTeam,
          teamName: teamName[0]?.assignTeamName
      }
      this.isLoading = true
      this.inventoryService.transferToTeam(data).subscribe(res => {
        this.toastrService.success(`Interaction Transfer to Team ${data?.teamName} successfully`);
        this.createTransferHistory(data);
      }, error => {
        this.toastrService.error(error);
        this.isLoading = false
      })
    } else {
      this.toastrService.error('Please select team')
    }
  }

createTransferHistory(value:any){
  this.isLoading=true
  let data = {
    id: this.data?.id,
    action: InteractionsActionEnums?.TeamChanged,
    message: `Team changed from ${this.data?.teamName} to ${value?.teamName}`
  }
  debugger
  this.inventoryService.createHistory(data).subscribe(res=>{
    if(res){
      this.dialogRef.close(true);
      this.isLoading= false;
    }
  },error=>{
    this.toastrService.error(error);
    this.isLoading=false
  })




}


}

