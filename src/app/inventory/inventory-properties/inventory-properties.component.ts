import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';
import { InteractionsActionEnums } from '@core/domain-classes/interacctionsAction.enum';
@Component({
  selector: 'app-inventory-properties',
  templateUrl: './inventory-properties.component.html',
  styleUrls: ['./inventory-properties.component.scss']
})
export class InventoryPropertiesComponent extends BaseComponent implements OnInit {
  @Input() userData: any
  @Input() id: boolean
  @Output() userId = new EventEmitter<string>();
  @Output() interactionDetail = new EventEmitter<string>();
  isLoading: boolean = false
  addInventoryForm: UntypedFormGroup;
  teamList: any = [];
  teamMemberList: any = [];
  contactSelectedType: string = ''
  statusList: any = [];
  subStatusList: any = [];
  priorityList: any = [];
  problemList: any = [];
  ticketTypeList: any = [{ id: 1, name: "FCR" },
  { id: 2, name: "Ticket Created" }];
  categoryList: any = [];
  errorCodeList: any = [];
  subCategoryList: any = [];
  currentDate: any
  @ViewChild(MatAccordion) accordion: MatAccordion;
  interactionData: any;
  resValue: any
  constructor(
    public translationService: TranslationService,
    private inventoryService: InventoryService,
    private toastrService: ToastrService,
    private fb: UntypedFormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
    super();
    this.getTicketTypeList();
    this.createForm();
    this.getLangDir();
    this.getTeamList();
    this.getStatusList();
    this.getPriorityList();
    this.getProblemList();
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
      clarificationFilled: ['',],
      compositionDate: ['',],
      subStatusId: [this.interactionData?.subStatusId,],
      subCatInput:[''],
      catInput:[''],
      categoryId: [],
      subcategoryId: [],
      subject: [''],
      problemReported: ['', Validators.required],
      problemId: [''],
      resolutionComments: [''],
      teamId: [],
      noOfMessages: [],
      reopenCount: [],
      assignToId: [],
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
      errorCode: [{ value: '', disabled: true }],
      reopenflag: [''],
      created: [''],
      agentRemarks: [''],
      dateLastUpdate: [''],
      reservedFor: [''],
      arn: [''],
      timeFromCreatedToUpdateInHrs: [''],
      timeFromLastUpdateToCurrentInHrs: [''],
      timeFromCreatedToCurrentInHrs: [0],
      panNo: [''],
      previousDocket: [''],
      currentStatus: [''],
      cpin: [''],
      errorMessage: [''],
      formName: [''],
      refundPeriod: [''],
      typeName: [''],
      isTaxpayer: [''],
      stateID: [''],
      lastSuccessfulReturn: [''],
      registrationType: [''],
      registrationForm: [''],
      returnForm: [''],
      returnType: [''],
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

  subStatusChange(event) {
    if (event?.value == 28) {
      this.addInventoryForm.get('resolutionComments')?.setValue('Your issue has been resolved, Kindly check the email for further information');
      this.addInventoryForm.get('resolutionComments')?.setValidators([Validators?.required]);
      this.addInventoryForm.get('resolutionComments')?.updateValueAndValidity();
    } else {
      this.addInventoryForm.get('resolutionComments')?.setValidators([]);
      this.addInventoryForm.get('resolutionComments')?.updateValueAndValidity();
    }
  }

  getTeamList() {
    this.inventoryService.getTeamsList().subscribe(res => {
      this.teamList = res;
    }, error => {
      this.toastrService.error(error);
    })
  }
  getTeamMemberList(id) {
    this.inventoryService.getTeamMembers(id).subscribe(res => {
      this.teamMemberList = res;
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
  getProblemList() {
    this.inventoryService.getProblemList().subscribe(res => {
      this.problemList = res;
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
      this.toastrService.error('Please enter the required fields');
      return
    }

    let data = this.addInventoryForm.getRawValue();
    let ticketType = this.ticketTypeList.filter(e => e.id == this.addInventoryForm.value.ticketType);
    let statusName = this.statusList.filter(e => e.id == this.addInventoryForm.value.statusId);
    let subStatusName = this.subStatusList.filter(e => e.id == this.addInventoryForm.value.subStatusId);
    let priorityName = this.priorityList.filter(e => e.id == this.addInventoryForm.value.priority);
    let categoryName = this.categoryList.filter(e => e.id == this.addInventoryForm.value.categoryId);
    let subcategoryName = this.subCategoryList.filter(e => e.id == this.addInventoryForm.value.subcategoryId);
    let teamName = this.teamList.filter(e => e.id == this.addInventoryForm.value.teamId);
    let value = {
      id: this.id,
      agentRemarks: data?.agentRemarks,
      categoryId: data?.categoryId,
      categoryName: categoryName[0]?.name,
      docketNumber: data?.docketNumber,
      errorCode: data?.errorCode,
      panCardNo: data?.panCardNo,
      resolutionComments: data?.resolutionComments,
      statusId: data?.statusId,
      statusName: data?.statusName,
      subStatusName: subStatusName[0]?.name,
      subStatusId: data?.subStatusId,
      subcategoryId: data?.subcategoryId,
      subcategoryName: subcategoryName[0]?.name,
      uniqueNumber: data?.uniqueNumber,
      cpin: data?.cpin,
      errorMessage: data?.errorMessage,
      formName: data?.formName,
      refundPeriod: data?.refundPeriod,
      lastSuccessfulReturn: data?.lastSuccessfulReturn,
      registrationType: data?.registrationType,
      registrationForm: data?.registrationForm,
      returnForm: data?.returnForm,
      returnType: data?.returnType,
      subject: this.resValue?.subject
    }
    // data.contactId = this.interactionData?.contactId
    // data.contactName = this.interactionData?.contactName
    // data.transactionNumber = this.resValue?.transactionNumber
    if (this.checkChanges()) {
      this.createTransferHistory(value);
    }
    // else {
    //   this.getInteractionDetailById(this.id);
    // }
    if (this.id) {
      this.isLoading = true
      this.inventoryService.updateInteraction(this.id, value).subscribe(res => {
        if (res) {
          // if (res?.statusId == 2 || res?.statusId == 3) {
            //   this.openSendEmailDialog(res);
            // }
            this.getInteractionDetailById(this.id);
              this.isLoading = false

          this.toastrService.success('Interaction update succcessfully');
          // this.router.navigate(['/interactions'])

        }
      }, error => {
        this.toastrService.error(error);
        this.isLoading = true
      })


    } else {

      this.inventoryService.addInteraction(data).subscribe(res => {
        if (res) {
          this.toastrService.success('Interaction added successfully')
        }
      }, error => {
        this.toastrService.error(error);
      })
    }

  }

  checkChanges(): boolean {
    let data: boolean = false;
    if (this.resValue?.categoryId != this.addInventoryForm.value?.categoryId || this.resValue?.statusId != this.addInventoryForm.value?.statusId) {
      data = true;
    }
    return data
  }


  createTransferHistory(updatedData) {
    this.isLoading = true
    let message = ''
    if (this.resValue?.categoryId != updatedData?.categoryId) message += `Catergory Name: ${updatedData?.categoryName}`;
    if (this.resValue?.subcategoryId != updatedData?.subcategoryId) message += `Subcategory Name: ${updatedData?.subcategoryName}`;
    if (this.resValue?.statusId != updatedData?.statusId) message += `Status Name : ${updatedData?.statusName}`;
    if (this.resValue?.subStatusId != updatedData?.subStatusId) message += `Sub Status name : ${updatedData?.subStatusName}`;
    if (this.resValue?.agentRemarks != updatedData?.agentRemarks) message += `Agent Remarks : ${updatedData?.agentRemarks}`;
    if (this.resValue?.problemReported != updatedData?.problemReported) message += `Problem Reported : ${updatedData?.problemReported}`;
    if (this.resValue?.teamName != updatedData?.teamName) message += `Team Name : ${updatedData?.teamName}`;
    if (this.resValue?.priorityName != updatedData?.priorityName) message += `Priority Name : ${updatedData?.priorityName}`;
    let data = {
      id: this.id,
      action: InteractionsActionEnums?.UpdateHistory,
      message: message
    }
    this.inventoryService.createHistory(data).subscribe(res => {
      if (res) {

        this.getInteractionDetailById(this.id);
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false;
    })

  }






  getInteractionDetailById(id) {
    this.isLoading = true;
    this.inventoryService.getInteractionById(id).subscribe((res: any) => {
      this.interactionData = res;
      this.resValue = { ...res };
      this.getTeamMemberList(res?.teamId);
      this.userId.emit(res?.contactId);
      this.interactionDetail.emit(res);
      if (typeof this.interactionData?.ticketType == 'string' && this.interactionData?.ticketType.length > 2) {
        let value = this.ticketTypeList.filter(e => e.name == this.interactionData?.ticketType)
        this.addInventoryForm.get('ticketType').setValue(value[0]?.id);
        this.getCategoryList(value[0]?.id);
        this.interactionData.ticketType = value[0]?.id
      } else {
        if (typeof this.interactionData?.ticketType == 'string' && this.interactionData?.ticketType.length == 1) {
          this.addInventoryForm.get('ticketType').setValue(JSON.parse(this.interactionData?.ticketType));
          this.getCategoryList(JSON.parse(this.interactionData?.ticketType));
        } else {
          this.addInventoryForm.get('ticketType').setValue(this.interactionData?.ticketType);
          this.getCategoryList(this.interactionData?.ticketType);
        }
      }
      this.getSubCategoryList(this.interactionData?.categoryId);
      this.getSubStatusList(this.interactionData?.statusId);
      this.updateForm(res);
      this.isLoading = false;
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false;
    })
  }

  updateForm(res) {
    res.ticketType = JSON.parse(res.ticketType);
    this.addInventoryForm.patchValue(res);
    // this.addInventoryForm.get('subject').setValue(this.resValue?.);
    this.addInventoryForm.get('docketNumber').setValue(this.interactionData?.transactionNumber);
  }

  addNote() {

    this.dialog.open(AddNoteDialogComponent, {
      disableClose: false,
      width: '800px',
      maxHeight: '800px',
      height: 'auto',
      data: this.interactionData
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getInteractionDetailById(this.id)
      }
    })

  }

  openSendEmailDialog(resData?: any) {
    this.dialog.open(SendEmailDialogComponent, {
      disableClose: true,
      width: '80vw',
      height: 'auto',
      data: resData || this.interactionData
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getInteractionDetailById(this.id);
      }
    })

  }

  openTransfer() {
    if (this.interactionData?.statusName == 'Open' ||
      this.interactionData?.statusName == 'Pending') {

      this.dialog.open(TransferTeamComponent, {
        disableClose: true,
        width: '650px',
        height: 'auto',
        data: this.interactionData
      }).afterClosed().subscribe(res => {
        if (res) {
          this.getInteractionDetailById(this.id)
        }
      })
    } else {
      this.toastrService.warning('Interaction already Closed Or resolved we cant transfer it')
    }
  }


}
