import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageTemplateListComponent } from './message-template-list/message-template-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { AddMessageTemplateComponent } from './add-message-template/add-message-template.component';

const routes: Routes = [
  {
    path: '',
    component: MessageTemplateListComponent,
    data: { claimType: 'MST_VIEW_SMSTEMPLATE' },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddMessageTemplateComponent,
    data: { claimType: ['MST_ADD_SMSTEMPLATE'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: AddMessageTemplateComponent,
    data: { claimType: ['MST_EDIT_SMSTEMPLATE']  },
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageTemplateRoutingModule { }
