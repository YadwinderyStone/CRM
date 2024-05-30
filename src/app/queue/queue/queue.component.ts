import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { QueueService } from '../queue.service';
import { CommonDialogService } from '@core/common-dialog/common-dialog.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { Queue, QueueMember } from '@core/domain-classes/queue.model';
import { AddMembersComponent } from '../add-members/add-members.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  animations: [
    trigger('detailExpand', [
      // state('collapsed', style({ height: '0px' , maxHeight: '0px' })),
      // state('expanded', style({ height: '*'})),
      // transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),

      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class QueueComponent extends BaseComponent  implements OnInit {

    queueList: Queue[] =[];
    userList: any =[];
      columnsToDisplay: string[] = ['substatus','name','status','bucketSize','action', ];
      subCategoryColumnToDisplay: string[] = ['name','action',];
      teamMembers: Queue[] = [];
      expandedElement: Queue | null;
      constructor( private dialog: MatDialog,
        private commonDialogService: CommonDialogService,
        private cd: ChangeDetectorRef,
        private toastrService: ToastrService,
        private QueueService: QueueService,
        public translationService: TranslationService
      ) {
        super(translationService);
        this.getLangDir();
        this.getUserList();
      }
    
    
      ngOnInit(): void {
        this.getQueueList()
      }
  
      getQueueList(): void {
      this.QueueService.getQueueList().subscribe(res=>{
        this.queueList = res;
      });
    }
  
    downloadExcel(): void {
      this.QueueService.generateExcel(this.queueList).subscribe((response: any) => {
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
  
    dowanloadList(){    
      this.QueueService.getQueueList().subscribe((res:any)=>{
        let teamRecods:any = res;
        let heading = [[
          this.translationService.getValue('Team Name'),
          // this.translationService.getValue('Last Name'),
          // this.translationService.getValue('Email'),
          // this.translationService.getValue('Mobile'),
          this.translationService.getValue('IsActive'),
        ]];
    
        let teamsReport = [];
        teamRecods.forEach(data => {
          teamsReport.push({
            'Team Name':data?.name,
            // 'LastName':data?.lastName,
            // 'Email':data?.email,
            // 'Mobile':data?.phoneNumber,
            'IsActive':data?.isEnabled,
          })
        });
        let workBook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(workBook, heading);
        let workSheet = XLSX.utils.sheet_add_json(workBook, teamsReport, { origin: "A2", skipHeader: true });
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Teams Report');
        XLSX.writeFile(workBook, 'Teams Report' + ".xlsx");  
      })
  
    }
  


    toggleRow(element: Queue) {
      this.teamMembers = [];
      this.QueueService.getQueueMembers(element.id).subscribe((res:any) => {
        this.teamMembers = res
        this.expandedElement = this.expandedElement === element ? null : element;
        this.cd.detectChanges();
      });
    }
  
    deleteQueue(status:Queue): void {
      this.sub$.sink = this.commonDialogService
        .deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${status.name}`)
        .subscribe(isTrue => {
          if (isTrue) {
           this.deleteQueueById(status.id);
          }
        });
    }
  
    deleteQueueById(id){
    this.QueueService.deleteQueue(id).subscribe(d => {
      // this.toastrService.success(this.translationService.getValue(`CATEGORY_DELETED_SUCCESSFULLY`));
      this.toastrService.success('Queue deleted successfully');
      this.getQueueList();
    },error=>{
      this.toastrService.error(error);

    });
  }
  

manageMember(data:QueueMember){
  const dialogRef = this.dialog.open(AddMembersComponent, {
    width: '350px',
    direction:this.langDir,
    data: Object.assign({}, data)
  });

  this.sub$.sink = dialogRef.afterClosed()
    .subscribe((result) => {
      if (result) {
        this.getQueueList();
      }
    });

}



addMember(data:QueueMember){
  this.manageMember({
    id: '',
    name: '',
    parentId: data?.id
  });

}

deleteMember(data:QueueMember){
this.sub$.sink = this.commonDialogService
.deleteConformationDialog(`${this.translationService.getValue('ARE_YOU_SURE_YOU_WANT_TO_DELETE')} ${this.getMembersName(data.userId)}`)
.subscribe(isTrue => {
  if (isTrue) {
   this.deleteMemberById(data);
  }
});

  }
  

deleteMemberById(value){
  this.QueueService.deleteQueueMember(value).subscribe(d => {
    this.toastrService.success('Team member deleted sucessfully');
    this.getQueueList();
  });
}


getMembersName(id){
  let user =  this.userList.filter(e=>e.id==id);
  let userName = user[0].firstName +' '+ user[0].lastName;
  return userName
}

getUserList() {
  this.QueueService.getUsersList().subscribe(res => {
    this.userList = res;
  }, error => {
    this.toastrService.error(error);
  })
}



}