import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-interaction-history',
  templateUrl: './interaction-history.component.html',
  styleUrls: ['./interaction-history.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InteractionHistoryComponent implements OnInit {

  @Input() userData:any
  @Input() id:any;
  isLoading = false
  displayedColumns: string[] = ['name','actionBy','description','time'];
  historyDetailColumn: string[] = ['name', 'teamName','dateTime'];
  dataSource;
  expandedElement: any | null;
  interactionData:any;
  historyData: any[] = [];
  historyType:any = [{id:1,type:"Voice"},{id:2,type:"GRP"},{id:3,type:"Chat"},]
    constructor(
      private inventoryService: InventoryService,
      private toastrService: ToastrService,
      private cd: ChangeDetectorRef,
    ) { }
  
    ngOnInit(): void {
      this.interactionHistory(this.id);
    }
  
    interactionHistory(id){
      this.isLoading = true
      this.inventoryService.getInteractionHistoryDetail(id).subscribe((res:any)=>{
        // this.interactionData = res;
        this.dataSource = res
        // this.dataSource = [this.interactionData]
        this.isLoading = false
      },error=>{
        this.isLoading = false
        this.toastrService.error(error);
      })
    }
    // toggleRow(element: any) {
    //   this.historyData = [];
    //   // this.inventoryService.getInteractionHistoryDetailBYType(element.id).subscribe(subCat => {
    //     this.historyData = [{id:1,teamName:'L0',name:'We are working on it. it will resolve shortly', date:'10-05-2024'}];
    //     this.expandedElement = this.expandedElement === element ? null : element;
    //     this.cd.detectChanges();
    //   // });
    // }
  
  }
  
