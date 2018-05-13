/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';
import { AccountGuard } from './account/account.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { ManageKeywordComponent } from './manage-keyword/manage-keyword.component';
//import { AccountResetPasswordComponent } from './features/account/account-reset-password.component';

export const routes: Routes = [
 /* { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'lazy', loadChildren: './features/lazy/index#LazyModule' },
  { path: '**', component: NotFound404Component }*/
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  /*{
    path: 'account/login',
    component: AccountLoginComponent
  },
  {
    path: 'account/family-card',
    component: AccountFamilyCardComponent
  },*/
  {
    path: 'admin',
    component: ManageKeywordComponent
  },
  { path: '**', component: HeatMapComponent }
];
