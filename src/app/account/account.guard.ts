import { Injectable } from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';

@Injectable()
export class AccountGuard implements CanActivate {

  constructor(private router: Router,
              private accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.accountService.loggedIn) {
      this.router.navigate(['/account/login'], {
        queryParams: {
          destination: state.url
        }
      });
      return false;
    }
    return true;
  }

}
