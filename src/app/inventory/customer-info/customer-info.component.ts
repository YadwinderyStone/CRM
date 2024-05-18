import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnChanges {
@Input() userData:any
@Input() id:any;
isLoading = false
displayedColumns: string[] = ['contactid','customerName','email','mobileNo','noofinteractions','panno'];
dataSource;
userInfo:any;
  constructor(
    private inventoryService: InventoryService,
    private toastrService: ToastrService,
  ) { }

  ngOnChanges(): void {
if(this.id)this.getUserDetail(this.userData?.custId || this.id);
  }

  getUserDetail(id){
    this.isLoading = true
    this.inventoryService.getContactDetail(id).subscribe((res:any)=>{
      this.userInfo = res;
      this.dataSource = [this.userInfo]
      this.isLoading = false
    },error=>{
      this.isLoading = false
      this.toastrService.error(error);
    })
  }


}
