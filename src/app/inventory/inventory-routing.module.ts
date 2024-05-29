import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InteractionAssignmentComponent } from './interaction-assignment/interaction-assignment.component';
import { L0EmailComponent } from './l0-email/l0-email.component';
import { MyInteractionsListComponent } from './my-interactions-list/my-interactions-list.component';
import { TeamInteractionsListComponent } from './team-interactions-list/team-interactions-list.component';
// import { AddInteractionResolverService } from './add-interactions/add-interactions-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: InventoryListComponent,
    data: { claimType: 'INT_VIEW_INTERACTION' },
    canActivate: [AuthGuard]
  },
  {
    path: 'My-interaction',
    component: MyInteractionsListComponent,
    // Fixme : need to change interaction claim
    data: { claimType: 'INT_VIEW_INTERACTION' },
    canActivate: [AuthGuard]
  },
  {
    path: 'Team-interaction',
    component: TeamInteractionsListComponent,
    // Fixme : need to change interaction claim
    data: { claimType: 'INT_VIEW_INTERACTION' },
    canActivate: [AuthGuard]
  },
  {
    path: 'add-interactions',
    component: AddInventoryComponent,
    data: { claimType: ['INT_ADD_INTERACTION'] },
    // resolve: {
    //   userData: AddInteractionResolverService
    // },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-interactions/:id',
    component: AddInventoryComponent,
    data: { claimType: ['INT_UPDATE_INTERACTION'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'assign-interaction',
    component: InteractionAssignmentComponent,
    data: { claimType: ['INT_VIEW_MANNUALASSIGN'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'l0-email',
    component: L0EmailComponent,
    data: { claimType: ['INT_VIEW_EMAILL0'] },
    canActivate: [AuthGuard]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
