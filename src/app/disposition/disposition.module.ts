import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispositionRoutingModule } from './disposition-routing.module';
import { DispositionListComponent } from './disposition-list/disposition-list.component';
import { AddDispositionComponent } from './add-disposition/add-disposition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    DispositionListComponent,
    AddDispositionComponent
  ],
  imports: [
    CommonModule,
    DispositionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    SharedModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class DispositionModule { }
