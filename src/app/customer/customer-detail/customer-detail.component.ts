import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '@core/domain-classes/city';
import { Location } from '@angular/common';
import { Country } from '@core/domain-classes/country';
import { Customer } from '@core/domain-classes/customer';
import { CommonService } from '@core/services/common.service';
import { TranslationService } from '@core/services/translation.service';
import { environment } from '@environments/environment';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base.component';
import { CustomerService } from '../customer.service';
import { EditorConfig } from '@shared/editor.config';
import { CustomerResourceParameter } from '@core/domain-classes/customer-resource-parameter';
import { AddInteractionResolverService } from 'src/app/inventory/add-interactions/add-interactions-resolver.service';

export class AlreadyExistValidator {
  static exist(flag: boolean): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (flag) {
        return { exist: true };
      }
      return null;
    };
  }
}

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['interactionid', 'contant', 'interactiontype', 'createdteam', 'assignto', 'status', 'substatus', 'category', 'subcatagory', 'gstn', 'problemreported1', 'docketno', 'lastresolveat',];
  customerForm: UntypedFormGroup;
  imgSrc: any = null;
  ctiInfo:any = {}
  isImageUpload: boolean = false;
  isLoading: boolean = false;
  customer: Customer;
  selectedTicketType: string = '';
  selectedCategory: string = '';
  selectedSubCategory: string = '';
  ticketTypeList: any[] = [];
  catList: [] = [];
  subCatList: [] = [];
  countries: Country[] = [];
  interactionsList: any[] = [];
  cities: City[] = [];
  isLoadingCity: boolean = false;
  editorConfig = EditorConfig;
  tabIndex = 0;
  personTypeList: any = []
  public filterCityObservable$: Subject<string> = new Subject<string>();

  constructor(
    private fb: UntypedFormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    public translationService: TranslationService,
  ) {
    super(translationService);
    this.getLangDir();
    this.route.queryParams.subscribe(res => {
      this.ctiInfo = res;
    })
  }

  ngOnInit(): void {
    this.createCustomerForm();
    this.getTicketTypeList();
    const routeSub$ = this.route.data.subscribe(
      (data: { customer: Customer }) => {
        if (data.customer) {
          this.customer = { ...data.customer };
          this.getTopFiveInteractions();
          if (this.customer.imageUrl) {
            this.imgSrc = `${environment.apiUrl}${this.customer.imageUrl}`;
          }
          this.patchCustomer();
        } else {
          if (this.customer) {
            this.imgSrc = '';
            this.customer = Object.assign({}, null);
          }

        }
      }
    );
    this.sub$.add(routeSub$);
  }

  patchCustomer() {
    this.customerForm.patchValue(this.customer)
  }

  createCustomerForm() {
    this.customerForm = this.fb.group({
      ticketType: ['', [Validators.required]],
      // category: ['', [Validators.required]],
      // subCategory: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(500)]],
      lastName: [''],
      emailId: [''],
      designation: [''],
      department: [''],
      contactPriority: [''],
      noOfInteractions: [0],
      uniqueNumber: [''],
      phoneNo: [''],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      personId: ['']
    });
  }

  onEmailChange(event: any) {
    const email = this.customerForm.get('emailId').value;
    if (!email) {
      return;
    }
    const id =
      this.customer && this.customer.id ? this.customer.id : Guid.create();
    this.sub$.sink = this.customerService
      .checkEmailOrPhoneExist('', email, id)
      .subscribe((c) => {
        const emailControl = this.customerForm.get('emailId');
        if (c) {
          emailControl.setValidators([
            Validators.required,
            Validators.email,
            AlreadyExistValidator.exist(true),
          ]);
        } else {
          emailControl.setValidators([Validators.required, Validators.email]);
        }
        emailControl.updateValueAndValidity();
      });
  }

  onCustomerSubmit() {
    if (this.customerForm.valid) {
      let custData: any = {
        name: this.customerForm.value.name,
        lastName: this.customerForm.value.lastName,
        emailId: this.customerForm.value?.emailId,
        noOfInteractions: 0,
        mobileNo: this.customerForm.value?.mobileNo
      }
      let formValues = this.customerForm.value
      if (this.customer) {
        this.sub$.sink = this.customerService
          .updateCustomer(this.customer.id, custData)
          .subscribe((c: any) => {
            this.toastrService.success('Contact update successfully');
            this.router.navigate(['/customer'])
          }, error => {
            this.toastrService.error(error);
          });
      } else {
        let catname: any = this.catList.filter((e: any) => e.id == formValues?.category)
        let subCatName: any = this.subCatList.filter((e: any) => e.id == formValues?.subCategory)
        let subject = `${catname[0]?.name}-${subCatName[0]?.name}`;
        this.sub$.sink = this.customerService
          .saveCustomer(formValues)
          .subscribe(c => {
            let routeData=
              // { ticketType: formValues?.ticketType, ticketTypeName: this.getTypeName(formValues?.ticketType), transNo: c?.transactionNumber, email: formValues?.emailId, custId: c?.id, custName: c?.name + ' ' + c?.lastName, catId: formValues?.category, subCatId: formValues?.subCategory,subject: subject }
              { ticketType: formValues?.ticketType, ticketTypeName: this.getTypeName(formValues?.ticketType), transNo: c?.transactionNumber, email: formValues?.emailId, custId: c?.id, custName: c?.name + ' ' + c?.lastName,subject: subject,direction:this.ctiInfo?.direction,cli:this.ctiInfo?.cli }
            this.customerService.userData=routeData;
            this.router.navigate(['/interactions/add-interactions']);
            // this.router.navigate(['/interactions/add-interactions'], { queryParams: { ticketType: formValues?.ticketType, ticketTypeName: this.getTypeName(formValues?.ticketType), transNo: c?.transactionNumber, email: formValues?.emailId, custId: c?.id, custName: c?.name + ' ' + c?.lastName,subject: subject,direction:this.ctiInfo?.direction,cli:this.ctiInfo?.cli } });
            this.toastrService.success('Contact save successfully');

          }, error => {
            this.toastrService.error(error);
          });
      }
    } else {
      this.customerForm.markAllAsTouched();
      return
    }
  }




  updateContact() {




  }





  private markFormGroupTouched(formGroup: UntypedFormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  createBuildForm(): Customer {
    const customerObj: Customer = {
      id: this.customer ? this.customer.id : null,
      customerName: this.customerForm.get('customerName').value,
      contactPerson: this.customerForm.get('contactPerson').value,
      mobileNo: this.customerForm.get('mobileNo').value,
      phoneNo: this.customerForm.get('phoneNo').value,
      website: this.customerForm.get('website').value,
      description: this.customerForm.get('description').value,
      url: '',
      isVarified: true,
      isUnsubscribe: false,
      address: this.customerForm.get('address').value,
      email: this.customerForm.get('email').value,
      countryId: this.customerForm.get('countryId').value,
      cityId: this.customerForm.get('cityId').value,
      cityName: this.customerForm.get('cityName').value,
      countryName: this.customerForm.get('countryName').value,
    };
    return customerObj;
  }
  addInteractions() {

      if(this.customerForm.invalid){
        this.customerForm.markAllAsTouched();
        return
      }
  
      let formValues = this.customerForm.value
      let catname: any = this.catList.filter((e: any) => e.id == formValues?.category)
      let subCatName: any = this.subCatList.filter((e: any) => e.id == formValues?.subCategory)
      let subject = `${catname[0]?.name}-${subCatName[0]?.name}`;

      let routeData={
        ticketType: formValues?.ticketType, ticketTypeName: this.getTypeName(formValues?.ticketType),
        transNo: this.customer?.transactionNumber, email: formValues?.emailId,
        custId: this.customer?.id, custName: this.customer?.name + ' ' + this.customer?.lastName, subject: subject,direction:this.ctiInfo?.direction,
        cli:this.ctiInfo?.cli,agentId:this.ctiInfo?.agentId,terminal:this.ctiInfo?.terminal,callId:this.ctiInfo?.callId
      }
    this.customerService.userData=routeData;
      this.router.navigate(['/interactions/add-interactions']);

  }



  getTopFiveInteractions() {
    this.isLoading = true;
    this.customerService.getTopFiveInteractionsForContact(this.customer.id).subscribe((res: any) => {
      this.interactionsList = res?.body.data || res?.body
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.toastrService.error(error)
    })
  }


  onTypeChange(event) {
    this.customerForm.get('category')?.setValue('')
    this.customerForm.get('subCategory')?.setValue('')

if (event?.value == 2){
  this.getCatListForTicket(event.value);
}else{
  this.getCatList(event.value);
}


    if (event?.value == 1) {
      this.customerForm.get('emailId')?.setValidators([]);
      this.customerForm.get('emailId')?.updateValueAndValidity();
    }
    if (event?.value == 2) {
      this.customerForm.get('emailId')?.setValidators([Validators.required, Validators.email]);
      this.customerForm.get('emailId')?.updateValueAndValidity();
    }

  }
  onCatChange(event) {
    this.selectedSubCategory = '';
    this.getSubCatList(event.value)
  }
  getTicketTypeList() {
    this.customerService.getTicketlist().subscribe((res: any) => {
      this.ticketTypeList = res
      // this.ticketTypeList = this.ticketTypeList.filter((e:any)=>e.name ="FCR" || e?.name== "Ticket Created")
      this.setFirstValue(this.ticketTypeList)
    })
  }
  setFirstValue(data: any) {
    let type = data.filter(e => e.name == 'FCR');
    this.customerForm.get('ticketType').setValue(type[0]?.id);
    this.getCatList(type[0]?.id);
  }

  getCatList(id) {
    this.customerService.getCatDroplist(id).subscribe((res: any) => {
      this.catList = res
    })
  }
  getCatListForTicket(id) {
    this.customerService.getCatDroplist(id).subscribe((res: any) => {
      this.catList = res
    })
  }
  getSubCatList(id) {
    this.customerService.getCatDroplist(id).subscribe((res: any) => {
      this.subCatList = res
    })
  }


  getTypeName(id) {
    let value: any = this.ticketTypeList.filter((e: any) => e?.id == id)
    let data = value[0]?.name
    return data
  }

  onMobileSearch($event){
    if(this.customerForm.value?.mobileNo.length == 10){
      let params:CustomerResourceParameter;
      params = new CustomerResourceParameter();
      params.search = this.customerForm.value?.mobileNo
      this.customerService.getCustomers(params).subscribe((resp: any) => {
        if(resp?.body.length){

          this.customerForm.patchValue(resp?.body[0]);
        }else{
          this.toastrService.warning('No data found for this mobile no.')
        }
      })}else{
        this.toastrService.error('Please enter valid mobile')
      }
  }

  onEmailSearch($event){
    if(this.customerForm.value?.emailId){
      let params:CustomerResourceParameter;
      params.search = this.customerForm.value?.emailId
      this.customerService.getCustomers(params).subscribe((resp: any) => {
        if(resp?.body.length){
          this.customerForm.patchValue(resp?.body[0]);
        }else{
          this.toastrService.success('NO data found')
        }
      })
    }else{
      this.toastrService.error('Please enter emailid')
    }
}









}
