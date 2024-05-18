import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerResolverService } from './customer-detail/customer-detail-resolver.service';
import { AuthGuard } from '@core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: { claimType: 'CNT_VIEW_CONTACT' },
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: CustomerDetailComponent,
    resolve: {
      customer: CustomerResolverService
    },
    data: { claimType: ['CNT_ADD_CONTACT', 'CNT_UPDATE_CONTACT'] },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
