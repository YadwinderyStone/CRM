import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/security/auth.guard';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductResolverService } from './manage-product/product-resolver.service';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { claimType: 'MST_VIEW_LOOKUP' },
    canActivate: [AuthGuard]
  }, {
    path: 'add',
    component: ManageProductComponent,
    data: { claimType: 'MST_ADD_LOOKUP' },
    canActivate: [AuthGuard]
  },
  {
    path: 'manage/:id',
    component: ManageProductComponent,
    resolve: {
      product: ProductResolverService,
    },
    data: { claimType: 'MST_UPDATE_LOOKUP' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
