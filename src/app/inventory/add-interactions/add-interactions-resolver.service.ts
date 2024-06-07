import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { CustomerService } from '../../customer/customer.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class AddInteractionResolverService implements Resolve<any> {
    
  constructor(
    private customerService : CustomerService
  ) {}
  resolve(): Observable<any> | null {
    return this.customerService?.userData
  }
}
