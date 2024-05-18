import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemRoutingModule } from './problem-routing.module';
import { ProblemComponent } from './problem/problem.component';
import { RoleProblemlistComponent } from './role-problemlist/role-problemlist.component';
import { AddRoleProblemComponent } from './add-role-problem/add-role-problem.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AddEditProblemDialogComponent } from './add-edit-problem-dialog/add-edit-problem-dialog.component';


@NgModule({
  declarations: [
    ProblemComponent,
    RoleProblemlistComponent,
    AddRoleProblemComponent,
    AddEditProblemDialogComponent
  ],
  imports: [
    CommonModule,
    ProblemRoutingModule,
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
export class ProblemModule { }
