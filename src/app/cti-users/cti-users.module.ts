import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CtiUsersRoutingModule } from './cti-users-routing.module';
import { CtiUsersListComponent } from './cti-users-list/cti-users-list.component';
import { AddCtiUsersComponent } from './add-cti-users/add-cti-users.component';


@NgModule({
  declarations: [
    CtiUsersListComponent,
    AddCtiUsersComponent
  ],
  imports: [
    CommonModule,
    CtiUsersRoutingModule
  ]
})
export class CtiUsersModule { }
