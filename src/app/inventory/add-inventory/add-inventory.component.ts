import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  addInventoryForm: UntypedFormGroup;
  interationId:string= '';
  contactId:any;
  InteractionDetail:any;
  isEdit:boolean = false
  userData:any
  tabIndex = 0
  constructor(
    public translationService: TranslationService,
    public activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
  ) {
    this.interationId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.interationId) {
      this.isEdit = true
    }else{
      this.activatedRoute.queryParams.subscribe(params => {
        this.userData = params;
      });
    }

  }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    // FIXME : change the form values according to frontend form
    this.addInventoryForm = this.fb.group({
      id: [''],
      stock: ['', [Validators.required, Validators.min(1)]],
      filerProduct: [],
      productName: [''],
      productId: ['', [Validators.required]],
      warehouseId: [''],
      unitId: ['', [Validators.required]],
      pricePerUnit: ['', [Validators.required]],
    });
  }


getUserId(id){
  this.contactId = id
}
getInteractionDetail(event){
  this.InteractionDetail = event
}



}
