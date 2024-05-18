import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageTemplateListComponent } from './message-template-list/message-template-list.component';
import { AuthGuard } from '@core/security/auth.guard';
import { AddMessageTemplateComponent } from './add-message-template/add-message-template.component';

const routes: Routes = [
  {
    path: '',
    component: MessageTemplateListComponent,
    data: { claimType: 'EMAIL_MANAGE_EMAIL_TEMPLATES' },
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddMessageTemplateComponent,
    data: { claimType: ['EMAIL_MANAGE_EMAIL_TEMPLATES', 'EMAIL_MANAGE_EMAIL_TEMPLATES'] },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: AddMessageTemplateComponent,
    data: { claimType: ['EMAIL_MANAGE_EMAIL_TEMPLATES', 'EMAIL_MANAGE_EMAIL_TEMPLATES']  },
    canActivate: [AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageTemplateRoutingModule { }
