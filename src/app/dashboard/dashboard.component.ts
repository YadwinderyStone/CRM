import { Component, OnInit } from '@angular/core';
import { TranslationService } from '@core/services/translation.service';
import { BaseComponent } from '../base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  interval:any
  constructor (public  translationService: TranslationService,
    private router: Router
  ) {
    super(translationService);
   
  }

  ngOnInit() {
  }
  
}

