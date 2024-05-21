import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LookupService } from '../lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Lookup } from '@core/domain-classes/lookup.model'

@Component({
  selector: 'app-add-lookup',
  templateUrl: './add-lookup.component.html',
  styleUrls: ['./add-lookup.component.scss']
})
export class AddLookupComponent implements OnInit {
  lookupForm: UntypedFormGroup;
  isLoading = false;
  id: string = ''
  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private LookupService: LookupService,
    private toastrService: ToastrService,
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
    });
  }

  ngOnInit(): void {
    this.createForm();
    if (this.id) {
      this.getLookupDetailById(this.id);
    }
  }


  createForm() {
    this.lookupForm = this.fb.group({
      name: ['', [Validators.required]],
      lookupType: ['', [Validators.required]],
      value: ['', [Validators.required]],
      valueInt: [],
      isEnabled: [false],
    });
  }

  onSubmit() {
    if (this.lookupForm.valid) {
      let data = this.lookupForm.value
      this.id ? this.updateLookup(data) : this.addLookup(data)
    } else {
      this.lookupForm.markAllAsTouched();
    }
  }


  addLookup(data: Lookup) {
    this.isLoading = true;
    this.LookupService.addLookup(data).subscribe(res => {
      if (res) {
        this.toastrService.success('Lookup Saved Successfully.');
        this.router.navigate(['lookup']);
        this.isLoading = false;
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false;

    })


  }


  updateLookup(data) {
    data.id = this.id;
    this.LookupService.updateLookup(data).subscribe(res => {
      if (res) {
        this.toastrService.success('Lookup Updated Successfully.');
        this.router.navigate(['lookup']);
        this.isLoading = false;
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false;

    })

  }


  getLookupDetailById(id) {
    this.isLoading = true
    this.LookupService.getlookupById(id).subscribe(res => {
      if (res) {
        this.lookupForm.patchValue(res);
        this.isLoading = false
      }
    }, error => {
      this.toastrService.error(error);
      this.isLoading = false;
    })

  }


}
