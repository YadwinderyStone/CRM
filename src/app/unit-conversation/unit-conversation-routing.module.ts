import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { InteractionTypeComponent } from './interaction-type/interaction-type.component';
import { InteractionCategoryComponent } from './interaction-category/interaction-category.component';
import { InteractionStatusComponent } from './interaction-status/interaction-status.component';
import { InteractionBulkCloserComponent } from './interaction-bulk-closer/interaction-bulk-closer.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'interaction-category',
    pathMatch:'full'
  },
  {
    path: 'interaction-type',
    component: InteractionTypeComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_VIEW_CATEGORY' },
  },
  {
    path: 'interaction-category',
    component: InteractionCategoryComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_VIEW_CATEGORY' },
  },
  {
    path: 'interaction-status',
    component: InteractionStatusComponent,
    canActivate: [AuthGuard],
   data: { claimType: 'MST_VIEW_STATUS' },
  },
  {
    path: 'interaction-bulk-closer',
    component: InteractionBulkCloserComponent,
    canActivate: [AuthGuard],
   data: { claimType: ['INT_BULK_INTERACTION_CLOSER','INT_BULK_INTERACTION_CLOSER_HISTORY'] },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UnitConversationRoutingModule { }
