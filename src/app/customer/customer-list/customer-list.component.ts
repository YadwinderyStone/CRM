import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { CustomerService } from '../customer.service';
import { merge, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CustomerResourceParameter } from '@core/domain-classes/customer-resource-parameter';
import { Customer } from '@core/domain-classes/customer';
import { ResponseHeader } from '@core/domain-classes/response-header';
import { CustomerDataSource } from './customer-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomerListComponent extends BaseComponent implements OnInit {
  dataSource: CustomerDataSource;
  ctiInfo: any = {}
  search: string = ''
  searchListDetail: any = []
  customers: Customer[] = [];
  displayedColumns: string[] = ['action', 'contactid', 'customerName', 'email', 'mobileNo','noofinteractions'];
  columnsToDisplay: string[] = ["footer"];
  isLoadingResults = true;
  isLoading = false;
  customerResource: CustomerResourceParameter;
  loading$: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _nameFilter: string;
  _emailFilter: string;
  _mobileOrPhoneFilter: string;
  _websiteFilter: string;
  _contactPersonFilter: string;
  public filterObservable$: Subject<string> = new Subject<string>();
  expandedElement: Customer | null;

  public get NameFilter(): string {
    return this._nameFilter;
  }

  public set ContactFilter(v: string) {
    this._contactPersonFilter = v;
    const customerNameFilter = `contactPerson##${v}`;
    this.filterObservable$.next(customerNameFilter);
  }

  public set NameFilter(v: string) {
    this._nameFilter = v;
    const nameFilter = `customerName##${v}`;
    this.filterObservable$.next(nameFilter);
  }

  public get WebsiteFilter(): string {
    return this._websiteFilter;
  }

  public set WebsiteFilter(v: string) {
    this._websiteFilter = v;
    const websiteFilter = `website##${v}`;
    this.filterObservable$.next(websiteFilter);
  }

  public get EmailFilter(): string {
    return this._emailFilter;
  }
  public set EmailFilter(v: string) {
    this._emailFilter = v;
    const emailFilter = `email##${v}`;
    this.filterObservable$.next(emailFilter);
  }

  public get MobileOrPhoneFilter(): string {
    return this._mobileOrPhoneFilter;
  }

  public set MobileOrPhoneFilter(v: string) {
    this._mobileOrPhoneFilter = v;
    const mobileOrFilter = `mobileNo##${v}`;
    this.filterObservable$.next(mobileOrFilter);
  }

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private commonDialogService: CommonDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public translationService: TranslationService,
    private cd: ChangeDetectorRef) {
    super(translationService);
    this.getLangDir();
    this.customerResource = new CustomerResourceParameter();
    this.customerResource.pageSize = 10;
    this.customerResource.orderBy = 'customerName asc'
    this.activatedRoute.queryParams.subscribe(res => {
      this.ctiInfo = res;
    })

  }

  ngOnInit(): void {
    this.dataSource = new CustomerDataSource(this.customerService);
    this.getResourceParameter();
    this.sub$.sink = this.filterObservable$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((c) => {
        this.customerResource.skip = 0;
        this.paginator.pageIndex = 0;
        const strArray: Array<string> = c.split('##');
        if (strArray[0] === 'customerName') {
          this.customerResource.customerName = escape(strArray[1]);
        } else if (strArray[0] === 'email') {
          this.customerResource.email = strArray[1];
        } else if (strArray[0] === 'mobileNo') {
          this.customerResource.mobileNo = strArray[1];
        }
        else if (strArray[0] === 'contactPerson') {
          this.customerResource.contactPerson = strArray[1];
        }
        this.dataSource.loadData(this.customerResource);
      });
    if (Object.keys(this.ctiInfo).length && this.ctiInfo?.cli) {
      // this.search = this.ctiInfo?.cli
      // this.searchList();
      this.customerResource.search = this.ctiInfo?.cli;
      this.searchCustomerList();
      // this.dataSource.loadData(this.customerResource);
    } else {
      this.dataSource.loadData(this.customerResource);
    }
  }
  searchCustomerList(): any {
    this.customerService.getCustomers(this.customerResource).subscribe((resp: any) => {
      this.searchListDetail = resp?.body;
      if (resp && resp.headers.get('X-Pagination')) {
        const paginationParam = JSON.parse(
          resp.headers.get('X-Pagination')
        ) as ResponseHeader;
        this.customerResource.totalCount = paginationParam?.totalCount;
        this.customerResource.pageSize = paginationParam?.pageSize;
      }
      if (!this.searchListDetail.length) {
        this.router.navigate(['/customer/addItem'])
      }
    })
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.sub$.sink = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap((c: any) => {
          this.customerResource.skip = this.paginator.pageIndex * this.paginator.pageSize;
          this.customerResource.pageSize = this.paginator.pageSize;
          this.customerResource.orderBy = this.sort.active + ' ' + this.sort.direction;
          this.dataSource.loadData(this.customerResource);
        })
      )
      .subscribe();
  }

  deleteCustomer(customer: Customer) {
    this.sub$.sink = this.commonDialogService
      .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${customer.name ?? customer.name}`)
      .subscribe((isTrue: boolean) => {
        if (isTrue) {
          this.sub$.sink = this.customerService.deleteCustomer(customer.id)
            .subscribe(() => {
              // this.toastrService.success(this.translationService.getValue('CUSTOMER_DELETED_SUCCESSFULLY'));
              this.toastrService.success('Contact delete successfully');
              this.paginator.pageIndex = 0;
              this.dataSource.loadData(this.customerResource);
            });
        }
      });
  }

  getResourceParameter() {
    this.sub$.sink = this.dataSource.responseHeaderSubject$
      .subscribe((c: ResponseHeader) => {
        if (c) {
          this.customerResource.pageSize = c.pageSize;
          this.customerResource.skip = c.skip;
          this.customerResource.totalCount = c.totalCount;
        }
      });
  }

  // downloadExcel(){
  //   // this.isLoadingResults = true;
  //   // this.customerService.getCustomersExcelDownload(this.customerResource).subscribe((res: any) => {
  //   //   this.isLoadingResults = false;
  //   // }, error => {
  //   //   this.isLoadingResults = false;
  //   // })
  //   // this.customerService.generateExcel().subscribe(response => {
  //   //   // handle response
  //   // });
  // }

  downloadExcel(): void {
    this.dataSource = new CustomerDataSource(this.customerService);
    this.dataSource.loadData(this.customerResource);
    const request = {
      // Set the request data here
    };

    this.customerService.generateExcel(this.customerResource).subscribe((response: any) => {
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = 'contacts.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }

  dowanloadList() {
    this.isLoading = true

    this.customerService.getCustomers(this.customerResource).subscribe(res => {
      let customerRecods: any = res?.body;
      let heading = [[
        this.translationService.getValue('Contact Id'),
        this.translationService.getValue('Name'),
        this.translationService.getValue('Last Name'),
        this.translationService.getValue('Email Id'),
        this.translationService.getValue('Mobile'),
      ]];

      let customerReport = [];
      customerRecods.forEach(data => {
        customerReport.push({
          'Contact Id': data?.transactionNumber,
          'Name': data?.name,
          'LastName': data?.lastName,
          'Email': data?.emailId,
          'Mobile': data?.mobileNo,
        })
      });
      let workBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_aoa(workBook, heading);
      let workSheet = XLSX.utils.sheet_add_json(workBook, customerReport, { origin: "A2", skipHeader: true });
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Contact Report');
      XLSX.writeFile(workBook, 'Contact Report' + ".xlsx");

    })

  }




  editCustomer(customerId: string) {
    if(this.ctiInfo?.cli){
      this.router.navigate(['/customer', customerId],{ queryParams:this.ctiInfo });
    }else{
      this.router.navigate(['/customer', customerId]);
    }

  }

  toggleRow(customer: Customer) {
    this.expandedElement = this.expandedElement === customer ? null : customer;
    this.cd.detectChanges();
  }


  searchList() {
    if (this.search) {
      this.customerResource.search = this.search;
      this.paginator.pageIndex = 0;
      this.customerResource.skip = 0
      this.dataSource.loadData(this.customerResource);
    } else {
      this.onClear();
    }

  }
  onClear() {
    this.search = '';
    this.paginator.pageIndex = 0;
    this.customerResource.skip = 0
    this.customerResource.search = this.search;
    this.dataSource.loadData(this.customerResource);
  }

}
