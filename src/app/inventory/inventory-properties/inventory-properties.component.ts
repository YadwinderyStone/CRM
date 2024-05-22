import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SendEmailDialogComponent } from '../send-email-dialog/send-email-dialog.component';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { TransferTeamComponent } from './transfer-team/transfer-team.component';
@Component({
  selector: 'app-inventory-properties',
  templateUrl: './inventory-properties.component.html',
  styleUrls: ['./inventory-properties.component.scss']
})
export class InventoryPropertiesComponent extends BaseComponent implements OnInit {
  @Input() userData: any
  @Input() id: boolean
  @Output() userId = new EventEmitter<string>();

  addInventoryForm: UntypedFormGroup;
  teamList: any = [];
  contactSelectedType: string = ''
  statusList: any = [];
  subStatusList: any = [];
  priorityList: any = [];
  ticketTypeList: any = [];
  categoryList: any = [];
  errorCodeList: any = [];
  subCategoryList: any = [];
  currentDate: any
  @ViewChild(MatAccordion) accordion: MatAccordion;
  interactionData: any;
  constructor(
    public translationService: TranslationService,
    private inventoryService: InventoryService,
    private toastrService: ToastrService,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog
  ) {
    super();
    this.createForm();
    this.getLangDir();
    this.getTeamList();
    this.getStatusList();
    this.getTicketTypeList();
    this.getPriorityList();
    this.currentDate = new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) {
      this.getInteractionDetailById(this.id)
    }
  }
  ngOnInit(): void {
  }

  createForm() {
    this.addInventoryForm = this.fb.group({
      ticketType: ['', Validators.required],
      priority: ['',],
      statusId: ['',],
      contactName: ['',],
      subStatusId: [this.interactionData?.subStatusId,],
      categoryId: [0],
      subcategoryId: [this.interactionData?.subCategoryId],
      subject: [''],
      problemReported: ['', Validators.required],
      resolutionComments: [''],
      teamId: [],
      assignToTeamId: [],
      gstn: [''],
      assignedToInteractionStatus: ['',],
      statusName: [''],
      interactionThread: ['',],
      categoryName: ['',],
      lastUpdated: ['',],
      docketNumber: ['',],
      interactionCreatedThroughMedia: ['',],
      escalationStartDateTime: ['',],
      ticketAssignedTime: ['',],
      lastResolvedAt: [this.currentDate,],
      uniqueNumber: ['',],
      IntegrationAgeTime: [''],
      errorCode: [''],
      reopenflag: [''],
      created: [''],
      agentRemarks:[''],
      dateLastUpdate: [''],
      reservedFor: [''],
      arn: [''],
      timeFromCreatedToUpdateInHrs: [''],
      timeFromLastUpdateToCurrentInHrs: [''],
      timeFromCreatedToCurrentInHrs: [0],
      panCardNo: [''],
      currentStatus: [''],
    });
  }

  setStatusName(e: any) {

    let statusData = this.statusList.filter(data => e.value == data.id)
    this.addInventoryForm.get('statusName').setValue(statusData[0].name);

    this.getSubStatusList(e.value);

  }
  setCatName(e: any) {

    let catData = this.categoryList.filter(data => e.value == data.id)
    this.addInventoryForm.get('categoryName').setValue(catData[0].name);
    this.addInventoryForm.get('subcategoryId').setValue('');


  }

  getTeamList() {
    this.inventoryService.getTeamsList().subscribe(res => {
      this.teamList = res;
      // if (this.userData && this.userData.ticketTypeName == 'Ticket Created') {
      // } else {
      //   this.addInventoryForm.get('createdTeam').setValue(5);
      // }
    }, error => {
      this.toastrService.error(error);
    })
  }
  getErrorCodeList() {
    this.inventoryService.getErrorCodeList().subscribe(res => {
      this.errorCodeList = res;
    }, error => {
      this.toastrService.error(error);
    })
  }
  getPriorityList() {
    this.inventoryService.getPriorityList().subscribe(res => {
      this.priorityList = res;
      if (this.userData) {
        this.addInventoryForm.get('priority').setValue(3);
      }
    }, error => {
      this.toastrService.error(error);
    })
  }

  getStatusList() {
    this.inventoryService.getstatusList().subscribe(res => {
      this.statusList = res;
    }, error => {
      this.toastrService.error(error);
    })
  }
  getSubStatusList(id: string) {
    this.inventoryService.getsubStatusList(id).subscribe(res => {
      this.subStatusList = res;
    }, error => {
      this.toastrService.error(error);
    })
  }
  getTicketTypeList() {
    this.inventoryService.getCategoryList().subscribe(res => {  
      this.ticketTypeList = res;
    }, error => {
      this.toastrService.error(error);
    })
  }
  getCategoryList(id: string) {
    this.inventoryService.getSubCategoryList(id).subscribe(res => {
      this.categoryList = res;
      this.addInventoryForm.get('categoryId')?.setValue(JSON.parse(this.interactionData?.categoryId))
    }, error => {
      this.toastrService.error(error);
    })
  }
  getSubCategoryList(id: string) {
    this.inventoryService.getSubCategoryList(id).subscribe(res => {
      this.subCategoryList = res;
      if (this.userData) {
        this.addInventoryForm.get('subcategoryId')?.setValue(JSON.parse(this.userData?.subCatId));
      }
    }, error => {
      this.toastrService.error(error);
    })
  }


  onticketTypeChange(event: any) {
    let id = event?.value ? event.value : event;
    this.getCategoryList(id);
    this.addInventoryForm.get('categoryId').setValue('');
    this.addInventoryForm.get('subcategoryId').setValue('');
    this.subCategoryList = [];
  }

  onCatChange(event) {
    let id = event?.value ? event.value : event;
    this.getSubCategoryList(id);
  }


  onSubmit() {
    if (this.addInventoryForm.invalid) {
      this.addInventoryForm.markAllAsTouched();
      return
    }

    let data = this.addInventoryForm.getRawValue();

    data.contactId = this.interactionData?.contactId
    data.contactName = this.interactionData?.contactName
    if (this.id) {
      this.inventoryService.updateInteraction(this.id, data).subscribe(res => {
        if (res) {
          this.toastrService.success('Interact')
        }
      }, error => {
        this.toastrService.error(error);
      })


    } else {

      this.inventoryService.addInteraction(data).subscribe(res => {
        if (res) {
          this.toastrService.success('Interact')
        }
      }, error => {
        this.toastrService.error(error);
      })
    }

  }

  getInteractionDetailById(id) {
    this.inventoryService.getInteractionById(id).subscribe((res: any) => {
      this.interactionData = res;
      this.userId.emit(this.interactionData?.contactId);
      if(typeof this.interactionData?.ticketType == 'string'){
        let value = this.ticketTypeList.filter(e => e.name == this.interactionData?.ticketType)
        this.addInventoryForm.get('ticketType').setValue(value[0]?.id);
        this.getCategoryList(value[0]?.id);
        this.interactionData.ticketType = value[0]?.id
      }else{
        this.addInventoryForm.get('ticketType').setValue(this.interactionData?.ticketType);
        this.getCategoryList(this.interactionData?.ticketType);
      }
      this.getSubCategoryList(this.interactionData?.categoryId);
      this.getSubStatusList(this.interactionData?.statusId);
      this.updateForm();
    }, error => {
      this.toastrService.error(error);
    })
  }

  updateForm() {
    this.addInventoryForm.patchValue(this.interactionData);
  }

  addNote(){

   this.dialog.open(AddNoteDialogComponent, {
        disableClose: false,
        width: '800px',
        maxHeight: '800px',
        height: '80vh',
        data: this.interactionData
      }).afterClosed().subscribe(res=>{
    
      })

  }

openSendEmailDialog(){
  this.dialog.open(SendEmailDialogComponent, {
    disableClose: true,
    width: '650px',
    height: 'auto',
    data: this.interactionData
  }).afterClosed().subscribe(res=>{

  })

}

openTransfer(){
  if(this.interactionData?.statusName=='Open' || 
  this.interactionData?.statusName=='Pending'){

    this.dialog.open(TransferTeamComponent, {
      disableClose: true,
      width: '650px',
      height: 'auto',
      data: this.interactionData
    }).afterClosed().subscribe(res=>{
      if(res){
        this.getInteractionDetailById(this.id)
      }
    })
  }else{
    this.toastrService.warning('Interaction already Closed Or resolved we cant transfer it')
  }
}


}
