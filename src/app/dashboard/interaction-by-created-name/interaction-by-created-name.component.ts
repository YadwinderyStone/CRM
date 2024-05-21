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
    columnsToDisplay: string[] = ['name','total', 'open', 'pending','resolved','closed'];
    constructor(
      private toastrService: ToastrService,
      private dashboardService:DashboardService,
      public translationService: TranslationService
    ) {
      super(translationService);
      this.getLangDir();
    }
  
  
    ngOnInit(): void {
      // this.getInteractionsListByCreatedName()
  
      this.createdByNameInteractionsList = [
        {name:'Ashish Tomer',total:77,open:12,pending:15,resolved:25,closed:25},
        {name:'Surbhi Madan',total:68,open:8,pending:10,resolved:20,closed:25},
        {name:'Yadwinder singh',total:182,open:62,pending:30,resolved:40,closed:50},
        {name:'jay Parkash',total:160,open:50,pending:30,resolved:35,closed:45},
      ]
    }
  
    getInteractionsListByCreatedName(): void {
      this.dashboardService.getInteractionListByCreatedName().subscribe((res :any)=> {
        this.createdByNameInteractionsList = res
      },error=>{
        this.toastrService.error(error)
      })
    }
  
  
  

  }