import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailServiceRoutingModule } from './email-service-routing.module';
import { EmailServiceComponent } from './email-service/email-service.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    EmailServiceComponent
  ],
  imports: [
    CommonModule,
    EmailServiceRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,

  ]
})
export class EmailServiceModule { }
