import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from 'src/app/base.component';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { CreatedByName } from './createdByName.model';

@Component({
  selector: 'app-interaction-by-created-name',
  templateUrl: './interaction-by-created-name.component.html',
  styleUrls: ['./interaction-by-created-name.component.scss']
})
export class InteractionByCreatedNameComponent extends BaseComponent implements OnInit {

  
    createdByNameInteractionsList: CreatedByName[] = [];
    columnsToDisplay: string[] = ['name', 'open', 'pending','resolved','closed'];
    constructor(
      private toastrService: ToastrService,
      private dashboardService:DashboardService,
      public translationService: TranslationService
    ) {
      super(translationService);
      this.getLangDir();
    }
  
  
    ngOnInit(): void {
      this.getInteractionsListByCreatedName()
    }
  
    getInteractionsListByCreatedName(): void {
      this.dashboardService.getInteractionListByCreatedName().subscribe((res :any)=> {
        this.createdByNameInteractionsList = res?.body
      },error=>{
        this.toastrService.error(error)
      })
    }
  
  
  

  }