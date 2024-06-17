import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionDetailViewDialogComponent } from '../interaction-detail-view-dialog/interaction-detail-view-dialog.component';
import { InteractionsActionEnums } from '@core/domain-classes/interacctionsAction.enum';


@Component({
  selector: 'app-add-interactions',
  templateUrl: './add-interactions.component.html',
  styleUrls: ['./add-interactions.component.scss']
})
export class AddInteractionsComponent extends BaseComponent implements OnInit,AfterViewInit {

  @Input() userData: any
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
  sourceList: any[] = [];
  interactionData: any;
  interactionSubject:any;
  constructor(
    public translationService: TranslationService,
    private inventoryService: InventoryService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
  ) {
    super();
    this.getLangDir();
    this.getTeamList();
    this.getStatusList();
    this.getTicketTypeList();
    this.getPriorityList();
    this.currentDate = new Date();
    this.createForm();
    this.getSourceList();
    // this.getErrorCodeList();
 
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("User Data", this.userData);
    this.getCategoryList(JSON.parse(this.userData?.ticketType));
    // this.getSubCategoryList(JSON.parse(this.userData?.catId));

    this.interactionSubject = this.userData?.subject;
  }
  ngOnInit(): void {
    console.log("User Data", this.userData);
    if (this.userData) {
      this.bindValue(this.userData);
    }






  }
  ngAfterViewInit(){
    let categoryName = this.categoryList.filter(e => e.id == this.userData?.catId);
    let subcategoryName = this.subCategoryList.filter(e => e.id == this.userData?.subCatId);
    this.addInventoryForm.get('subject')?.setValue(`${categoryName[0]?.name}-${subcategoryName[0]?.name}`);
    // this.interactionSubject = `${categoryName[0]?.name}-${subcategoryName[0]?.name}`;
  }

  createForm() {
    this.addInventoryForm = this.fb.group({
      ticketType: ['', Validators.required],
      ticketTypeId: [''],
      statusId: ['',],
      statusName: ['',],
      subStatusId: ['',],
      subStatusName: [],
      priority: ['', Validators.required],
      priorityName: [''],
      endRemarks: [''],
      categoryId: ['', Validators.required],
      categoryName: [''],
      subcategoryId: ['', Validators.required],
      subcategoryName: [''],
      problemReported: ['', [Validators.required]],
      gstn: ['', Validators.required],
      contactId: [this.userData?.custId],
      teamId: [''],
      teamName: [''],
      source: [''],
      errorCode: [''],
      agentRemarks: ['', [Validators.required]],
      subject: [''],
      catInput: [''],
      subCatInput: [''],
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
      if (this.userData && this.userData.ticketTypeName == 'Ticket Created') {
        this.addInventoryForm.get('teamId').setValue(6);
      } else {
        this.addInventoryForm.get('teamId').setValue(5);
      }
    }, error => {
      this.toastrService.error(error);
    })
  }
  // getErrorCodeList() {
  //   this.inventoryService.getErrorCodeList().subscribe(res => {
  //     this.errorCodeList = res;
  //   }, error => {
  //     this.toastrService.error(error);
  //   })
  // }
  getSourceList() {
    this.inventoryService.getSourceList().subscribe(res => {
      this.sourceList = res;
      this.addInventoryForm.get('source')?.setValue(1);
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
      if (this.userData) {
        this.addInventoryForm.get('ticketType').setValue(JSON.parse(this.userData?.ticketType));
      }
    }, error => {
      this.toastrService.error(error);
    })
  }
  getCategoryList(id: string) {
    this.inventoryService.getSubCategoryList(id).subscribe(res => {
      this.categoryList = res;
      if (this.userData) {
        // this.addInventoryForm.get('categoryId')?.setValue(JSON.parse(this.userData?.catId));
        // let categoryName = this.categoryList.filter(e => e.id == this.userData?.catId);
        // let subcategoryName = this.subCategoryList.filter(e => e.id == this.userData?.subCatId);
        // this.addInventoryForm.get('subject')?.setValue(`${categoryName[0]?.name}-${subcategoryName[0]?.name}`);
      }

    }, error => {
      this.toastrService.error(error);
    })
  }
  getSubCategoryList(id: string) {
    this.inventoryService.getSubCategoryList(id).subscribe(res => {
      this.subCategoryList = res;
      let categoryName = this.categoryList.filter(e => e.id == this.userData?.catId);
    let subcategoryName = this.subCategoryList.filter(e => e.id == this.userData?.subCatId);
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
    this.setValuesForFormData();
    let data = this.addInventoryForm.getRawValue();
    data.contactId = JSON.parse(this.userData?.custId);
    data.emailId = this.userData?.email || '';
    let formData = {
      "ticketType": data?.ticketType || '',
      "intercationTypeID": data?.ticketTypeId || '',
      "statusId": data?.statusId,
      "statusName": data?.statusName,
      "subStatusId": data?.subStatusId,
      "subStatusName": data?.subStatusName,
      "priority": data?.priority,
      "priorityName": data?.priorityName,
      "categoryId": data?.categoryId,
      "categoryName": data?.categoryName,
      "subcategoryId": data?.subcategoryId,
      "subcategoryName": data?.subcategoryName,
      "problemReported": data?.problemReported,
      "gstn": data?.gstn,
      "emailId": data?.emailId || '',
      "contactId": data?.contactId,
      "contactName": this.userData?.custName || '',
      "mobileNo": this.userData?.mobileNo || '',
      "teamId": data?.teamId,
      "teamName": data?.teamName || data?.team,
      "source": data?.source || '',
      "agentRemarks": data?.agentRemarks,
      // "subject": data?.subject,
    }
    this.inventoryService.addInteraction(formData).subscribe(res => {
      if (res) {
        this.toastrService.success('Interaction added successfully.');
        this.createHistory(formData,res);
        this.openDialog(res,this.userData);
      }
    }, error => {
      this.toastrService.error(error);
    })
  }

createHistory(values:any,res){
  let data = {
    id: res?.id,
    action: InteractionsActionEnums?.AddHistory,
    message: `Interaction Added -- Ticket Type: (${res?.ticketType}) , Catergory Name: (${values?.categoryName}),  Subcategory Name: (${values?.subcategoryName}) , Status Name :( ${res?.statusName})
    , Sub Status name : (${values?.subStatusName}) , Agent Remarks : (${values?.agentRemarks}) , Problem Reported : (${values?.problemReported}) , Team Name : (${values?.teamName})
   , Priority Name : (${values?.priorityName}) , GSTN : ( ${values?.gstn} ) `  
  }

  this.inventoryService.createHistory(data).subscribe(res => {
  }, error => {
    this.toastrService.error(error);
  })
}

  openDialog(value, data?) {
    let detail = value;
    detail.userData= data
    this.dialog.open(InteractionDetailViewDialogComponent, {
      disableClose: true,
      width: '500px',
      height: 'auto',
      minHeight: '150px',
      data: detail
    }).afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['/interactions'])
      } else {
      }

    })
  }

  async bindValue(userData) {
    await this.getStatusList();
    this.contactSelectedType = this.userData.ticketTypeName;

    if (this.contactSelectedType == 'FCR') {
      let status = await this.statusList.filter((e: any) => e.id == 1 && e.name == 'OPEN')
      this.addInventoryForm.get('gstn').setValidators([]);
      this.addInventoryForm.get('gstn').updateValueAndValidity();

      await this.getSubStatusList(status[0]?.id || 4);

      this.addInventoryForm.get('statusId').setValue(4);
      this.addInventoryForm.get('subStatusId').setValue(11);
    }

    if (this.contactSelectedType == 'Ticket Created') {

      let status = await this.statusList.filter((e: any) => e.id == 1 && e.name == 'OPEN')

      await this.getSubStatusList(status[0]?.id || 1);

      this.addInventoryForm.get('statusId').setValue(1);
      this.addInventoryForm.get('subStatusId').setValue(12);

      this.addInventoryForm.get('gstn').setValidators([Validators.required]);
      this.addInventoryForm.get('gstn').updateValueAndValidity();
    }

  }

  setValuesForFormData() {
    let ticketType = this.ticketTypeList.filter(e => e.id == this.addInventoryForm.value.ticketType);
    let statusName = this.statusList.filter(e => e.id == this.addInventoryForm.value.statusId);
    let subStatusName = this.subStatusList.filter(e => e.id == this.addInventoryForm.value.subStatusId);
    let priorityName = this.priorityList.filter(e => e.id == this.addInventoryForm.value.priority);
    let categoryName = this.categoryList.filter(e => e.id == this.addInventoryForm.value.categoryId);
    let subcategoryName = this.subCategoryList.filter(e => e.id == this.addInventoryForm.value.subcategoryId);
    let teamName = this.teamList.filter(e => e.id == this.addInventoryForm.value.teamId);
    let source = this.sourceList.filter(e => e.id == this.addInventoryForm.value.source);
    
    this.addInventoryForm.get('ticketTypeId')?.setValue(ticketType[0]?.id);
    this.addInventoryForm.get('ticketType')?.setValue(ticketType[0]?.name);
    this.addInventoryForm.get('statusName')?.setValue(statusName[0]?.name);
    this.addInventoryForm.get('subStatusName')?.setValue(subStatusName[0]?.name);
    this.addInventoryForm.get('priorityName')?.setValue(priorityName[0]?.name);
    this.addInventoryForm.get('categoryName')?.setValue(categoryName[0]?.name);
    this.addInventoryForm.get('subcategoryName')?.setValue(subcategoryName[0]?.name);
    this.addInventoryForm.get('teamName')?.setValue(teamName[0]?.name);
    this.addInventoryForm.get('source')?.setValue(source[0]?.name);
  }

}

