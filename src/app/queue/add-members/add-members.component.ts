import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueueMember } from '@core/domain-classes/queue.model';


import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { QueueService } from '../queue.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent extends BaseComponent implements OnChanges {

  isEdit: boolean = false;
  userList: any = false;
  membersForm: UntypedFormGroup;
  teamMembers:any = []
  constructor(
    public dialogRef: MatDialogRef<AddMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QueueMember,
    public translationService: TranslationService,
    public QueueService: QueueService,
    private fb: UntypedFormBuilder,
    private toastrService: ToastrService) {
    super(translationService);
    this.createForm();
    this.getUserList();
    this.getQueueMembers(this.data?.parentId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data.id) {
        this.isEdit = true;
      }
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  getQueueMembers(id){
    this.QueueService.getQueueMembers(id).subscribe((res:any) => {
     if(res){
       this.teamMembers = res.map(e=>e.userId);
      }      
    },error=>{
      this.toastrService.error(error);
    });
  }





  saveMember(): void {
    if (this.membersForm.invalid) {
      this.membersForm.markAllAsTouched();
      return
    }
    let value: any = {
      userId: this.membersForm.value.userId,
      queueId: this.data.parentId ||this.data?.queueId ,
    }
    if (this.data.id) {
      value.id = this.data.id
      this.QueueService.updateQueueMember(value).subscribe(c => {
        this.toastrService.success('Team member updated Successfully.');
        this.dialogRef.close(value);
      });
    } else {
      this.QueueService.AddQueueMember(value).subscribe(c => {
        this.toastrService.success('Team member Saved Successfully.');
        this.dialogRef.close(this.data);
      });
    }
  }

  checkEnable(e: any) {
    this.data.isEnabled = e.checked
  }

  getUserList() {

    this.QueueService.getUsersList().subscribe(res => {
      this.userList = res;
    }, error => {
      this.toastrService.error(error);
    })
  }


  createForm() {
    this.membersForm = this.fb.group({
      userId: [this.data?.userId||'', [Validators.required]],
      isEnabled: [false]
    })
  }



}
