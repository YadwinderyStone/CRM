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
// import { AddInteractionResolverService } from 'src/app/inventory/add-interactions/add-interactions-resolver.service';

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
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    // private addInteractionResolverService: AddInteractionResolverService,
    private toastrService: ToastrService,
    public translationService: TranslationService,
    private location: Location
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
    this.getCountry();
    this.getCityByName();
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

  getCityByName() {
    this.isLoadingCity = true;
    this.sub$.sink = this.filterCityObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((c: string) => {
          var strArray = c.split(':');
          return this.commonService.getCityByName(strArray[0], strArray[1]);
        })
      )
      .subscribe(
        (c: City[]) => {
          this.cities = [...c];
          this.isLoadingCity = false;
        },
        (err) => (this.isLoadingCity = false)
      );
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

  onMobileNoChange(event: any) {
    const mobileno = this.customerForm.get('mobileNo').value;
    if (!mobileno) {
      return;
    }
    const id =
      this.customer && this.customer.id ? this.customer.id : Guid.create();
    this.sub$.sink = this.customerService
      .checkEmailOrPhoneExist('', mobileno, id)
      .subscribe((c) => {
        const mobileNoControl = this.customerForm.get('mobileNo');
        if (c) {
          mobileNoControl.setValidators([
            Validators.required,
            , Validators.pattern(/^[0-9]\d*$/),
            AlreadyExistValidator.exist(true),
          ]);
        } else {
          mobileNoControl.setValidators([Validators.required, , Validators.pattern(/^[0-9]\d*$/)]);
        }
        mobileNoControl.updateValueAndValidity();
      });
  }


  onFileSelect($event) {
    const fileSelected = $event.target.files[0];
    if (!fileSelected) {
      return;
    }
    const mimeType = fileSelected.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileSelected);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgSrc = reader.result;
      this.isImageUpload = true;
      $event.target.value = '';
    }
  }

  onRemoveImage() {
    this.imgSrc = '';
    this.isImageUpload = true;
  }

  getCountry() {
    const CountrySub$ = this.commonService.getCountry().subscribe((data) => {
      this.countries = data;
    });
    this.sub$.add(CountrySub$);
  }

  handleFilterCity(cityName: string) {
    const country = this.customerForm.get('countryName').value;
    if (cityName && country) {
      const strCountryCity = country + ':' + cityName;
      this.filterCityObservable$.next(strCountryCity);
    }
  }

  onCountryChange(country: any) {
    this.customerForm.patchValue({
      cityName: '',
    });
    if (country.value) {
      const strCountry = country.value + ':' + '';
      this.filterCityObservable$.next(strCountry);
    } else {
      this.cities = [];
    }
  }

  onCustomerList() {
    this.location.back();
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
            // this.router.navigate(['/interactions/add-interactions'], { queryParams: 
            //   { ticketType: formValues?.ticketType, ticketTypeName: this.getTypeName(formValues?.ticketType), 
            //     transNo: c?.transactionNumber, catId: formValues?.category, 
            //     subCatId: formValues?.subCategory,email:formValues?.emailId,custId: c?.id,custName:c?.name} });
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
            // let AddInteractionResolverService=
            //   { ticketType: formValues?.ticketType, ticketTypeName: this.getTypeName(formValues?.ticketType), transNo: c?.transactionNumber, email: formValues?.emailId, custId: c?.id, custName: c?.name + ' ' + c?.lastName, catId: formValues?.category, subCatId: formValues?.subCategory,subject: subject }
            
            // this.addInteractionResolverService.userData = AddInteractionResolverService
            // this.router.navigate(['/interactions/add-interactions']);
            this.router.navigate(['/interactions/add-interactions'], { queryParams: { ticketType: formValues?.ticketType, ticketTypeName: this.getTypeName(formValues?.ticketType), transNo: c?.transactionNumber, email: formValues?.emailId, custId: c?.id, custName: c?.name + ' ' + c?.lastName,subject: subject,direction:this.ctiInfo?.direction,cli:this.ctiInfo?.cli } });
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
      this.router.navigate(['/interactions/add-interactions'],
        {
          queryParams: {
            ticketType: formValues?.ticketType, ticketTypeName: this.getTypeName(formValues?.ticketType),
            transNo: this.customer?.transactionNumber, email: formValues?.emailId,
            custId: this.customer?.id, custName: this.customer?.name + ' ' + this.customer?.lastName, subject: subject,direction:this.ctiInfo?.direction,cli:this.ctiInfo?.cli
            
          }
        });

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

}
