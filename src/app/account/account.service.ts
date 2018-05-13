// tslint:disable:max-line-length
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../app.config';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { OrderService } from '../../order/order.service';
// import { CartService } from '../../cart/cart.service';

@Injectable()
export class AccountService {

  apiUrl;
  loggedIn = false;
  customerInfo;
  customerAddresses;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appConfig: AppConfig,
              private http: Http,
              private appService: AppService,
            ) {
    this.apiUrl = this.appConfig.API_URL;
    this.customerAddresses = [];
  }

  login(email, password): Promise<any> {
    let loginPromise = this.http.post(`${this.apiUrl}/account/login`, { email, password }, { withCredentials: true }).toPromise();
    loginPromise.then(requestResult => {
      let result = requestResult.json();
      if (result.success) {
        this.customerInfo = result.model;
        this.loggedIn = true;
      }
    });
    return loginPromise;
  }

  logout(): Promise<any> {
    let logoutPromise = this.http.get(`${this.apiUrl}/account/logout`, { withCredentials: true }).toPromise();
    logoutPromise.then(requestResult => {
      let result = requestResult.json();
      this.loggedIn = false;
      this.customerInfo = null;
      this.customerAddresses = [];
      this.router.navigate(['/'], {});
    });
    return logoutPromise;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getLoggedInCustomerInfo() {
    return this.customerInfo;
  }


}
