import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupRoutingModule } from './lookup-routing.module';
import { LookupListComponent } from './lookup-list/lookup-list.component';
import { AddLookupComponent } from './add-lookup/add-lookup.component';
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
import { AddEditSubLookupComponent } from './add-edit-sub-lookup/add-edit-sub-lookup.component';



@NgModule({
  declarations: [
    LookupListComponent,
    AddLookupComponent,
    AddEditSubLookupComponent
  ],
  imports: [
    CommonModule,
    LookupRoutingModule,
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
export class LookupModule { }
