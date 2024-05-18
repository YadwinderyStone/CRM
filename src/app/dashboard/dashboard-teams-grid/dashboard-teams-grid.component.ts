
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {QueueService} from '../../queue/queue.service';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { Queue } from '@core/domain-classes/queue.model';

@Component({
  selector: 'app-dashboard-teams-grid',
  templateUrl: './dashboard-teams-grid.component.html',
  styleUrls: ['./dashboard-teams-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class DashboardTeamsGridComponent extends BaseComponent implements OnInit {

  queueList: Queue[] = [];
  userList: any = [];
  columnsToDisplay: string[] = ['substatus', 'name', 'status'];
  subCategoryColumnToDisplay: string[] = ['name', 'status'];
  teamMembers: Queue[] = [];
  expandedElement: Queue | null;
  constructor(
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
    // FIXME change the product api service with interaction category
    this.QueueService.getQueueList().subscribe(res => {
      this.queueList = res
    })
  }


  toggleRow(element: Queue) {
    this.teamMembers = [];
    // FIXME add api for get sub category
    this.QueueService.getQueueMembers(element.id).subscribe((res: any) => {
      this.teamMembers = res
      this.expandedElement = this.expandedElement === element ? null : element;
      this.cd.detectChanges();
    });
  }


  getMembersName(id) {
    this.userList.filter(e => e.id == id);
    let userName = this.userList[0].firstName + ' ' + this.userList[0].lastName;

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