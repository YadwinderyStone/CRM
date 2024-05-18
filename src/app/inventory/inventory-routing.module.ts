import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InteractionAssignmentComponent } from './interaction-assignment/interaction-assignment.component';
import { L0EmailComponent } from './l0-email/l0-email.component';


const routes: Routes = [
  {
    path: '',
    component: InventoryListComponent,
    data: { claimType: 'INT_VIEW_INTERACTION' },
    canActivate: [AuthGuard]
  },
  {
    path: 'add-interactions',
    component: AddInventoryComponent,
    data: { claimType: ['INT_ADD_INTERACTION', 'INT_UPDATE_INTERACTION'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-interactions/:id',
    component: AddInventoryComponent,
    data: { claimType: ['INT_ADD_INTERACTION', 'INT_UPDATE_INTERACTION'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'assign-interaction',
    component: InteractionAssignmentComponent,
    data: { claimType: ['INT_ADD_INTERACTION', 'INT_UPDATE_INTERACTION'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'l0-email',
    component: L0EmailComponent,
    data: { claimType: ['INT_ADD_INTERACTION', 'INT_UPDATE_INTERACTION'] },
    canActivate: [AuthGuard]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
