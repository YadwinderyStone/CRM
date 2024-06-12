
import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-interaction-email-old',
  templateUrl: './interaction-email-old.component.html',
  styleUrls: ['./interaction-email-old.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InteractionEmailOldComponent extends BaseComponent implements OnInit {
  @Input() list?: string
  emailList: any = []
  isLoading = false;
  columnsToDisplay: string[] = ['id', 'emailType', 'subject', 'date', 'fromMailId', 'to'];
  emailDetailColumnToDisplay: string[] = ['name'];
  expandedElement: any | null;
  emailDetail: any = []
  constructor(
    private inventoryService: InventoryService,
    private toasterService: ToastrService,
  ) {
    super();
  }

  ngOnChanges(): void {
    this.emailList = this.list
  }
  ngOnInit(): void {
    // this.getEmailInboxListByInteractionId(this.id);
  }
  getEmailInboxListByInteractionId(id) {
    this.isLoading = true;
    this.inventoryService.getEmailInboxListByInteractionId(id).subscribe((res: any) => {
      this.emailList = res?.body || res
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.toasterService.error(error)
    })
  }

  toggleRow(element: any) {
    this.emailDetail = [];
    this.emailDetail = [element];
    this.expandedElement = this.expandedElement === element ? null : element;
  }

}
