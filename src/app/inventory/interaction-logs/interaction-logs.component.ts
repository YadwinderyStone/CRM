
import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { InventoryService } from '../inventory.service';
@Component({
  selector: 'app-interaction-logs',
  templateUrl: './interaction-logs.component.html',
  styleUrls: ['./interaction-logs.component.scss']
})
export class InteractionLogsComponent extends BaseComponent implements OnInit {
    @Input() id: string
    
    isLoading = false;
    logsList: any = [];
    constructor(
      private toastrService: ToastrService,
      private InteractionServices: InventoryService,
      public translationService: TranslationService) {
      super(translationService);
      this.getLangDir();
     
    }
  
    ngOnInit(): void {
      this.getNotesList();
    }
    
    getNotesList() {
      this.isLoading = true;
      this.InteractionServices.getInteractionLogs(this.id).subscribe(res => {
        this.logsList = res
        this.isLoading = false
      }, error => {
        this.isLoading = false
        this.toastrService.error(error)
      })
    }
  }
  
