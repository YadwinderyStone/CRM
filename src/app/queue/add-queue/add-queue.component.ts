import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QueueService } from '../queue.service';
import { Queue } from '@core/domain-classes/queue.model';


@Component({
  selector: 'app-add-queue',
  templateUrl: './add-queue.component.html',
  styleUrls: ['./add-queue.component.scss']
})
export class AddQueueComponent implements OnInit {
    queueForm: UntypedFormGroup;
    isLoading = false;
    id: string = ''
    constructor(
      private fb: UntypedFormBuilder,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private QueueService: QueueService,
      private toastrService: ToastrService,
    ) {
  
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id']
      });
    }
  
    ngOnInit(): void {
      this.createForm();
      if (this.id) {
        this.getQueueDetailById(this.id);
      }
    }
  
  
    createForm() {
      this.queueForm = this.fb.group({
        name: ['', [Validators.required]],
        bucketSize: [0, [Validators.required]],
        isEnabled: [false],
      });
    }
  
    onSubmit() {
      if (this.queueForm.valid) {
        let data = this.queueForm.value
        this.id ? this.updateQueue(data) : this.addQueue(data)
      } else {
        this.queueForm.markAllAsTouched();
      }
    }
  
  
    addQueue(data: Queue) {
      this.isLoading = true;
      this.QueueService.addQueue(data).subscribe(res => {
        if (res) {
          this.toastrService.success('Team Saved Successfully.');
          this.router.navigate(['team']);
          this.isLoading = false;
        }
      }, error => {
        this.toastrService.error(error);
        this.isLoading = false;
  
      })
  
  
    }
  
  
    updateQueue(data) {
      data.id = +this.id;
      this.QueueService.updateQueue(data).subscribe(res => {
        if (res) {
          this.toastrService.success('Team Updated Successfully.');
          this.router.navigate(['team']);
          this.isLoading = false;
        }
      }, error => {
        this.toastrService.error(error);
        this.isLoading = false;
  
      })
  
    }
  
  
    getQueueDetailById(id) {
      this.isLoading = true
      this.QueueService.getQueueById(id).subscribe((res:any) => {
        if (res) {
          this.queueForm.patchValue(res?.data);
          this.isLoading = false
        }
      }, error => {
        this.toastrService.error(error);
        this.isLoading = false;
      })
  
    }
  
  
  }
  
