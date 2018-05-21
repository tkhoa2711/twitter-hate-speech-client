import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule, 
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatIconModule, 
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule, 
        MatProgressSpinnerModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TagInputModule } from 'ngx-chips';


import { AppConfig } from './app.config';
import { MouseWheelDirective } from './directives/mousewheel.directive';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { HeatMapService } from './heat-map/heat-map.service';
import { ManageKeywordComponent } from './manage-keyword/manage-keyword.component';
import { ManageKeywordService } from './manage-keyword/manage-keyword.service';
import { routes } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartGeotagComponent } from './chart-geotag/chart-geotag.component';
import { ChartGenderComponent } from './chart-gender/chart-gender.component';


@NgModule({
  declarations: [
    AppComponent,
    HeatMapComponent,
    MouseWheelDirective,
    ManageKeywordComponent,
    DashboardComponent,
    ChartGeotagComponent,
    ChartGenderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule, 
    MatCheckboxModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatIconModule, 
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule, 
    MatProgressSpinnerModule,
    TagInputModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      // preloadingStrategy: PreloadAllModules
    }),
  ],
  providers: [ AppConfig, AppService, HeatMapService, ManageKeywordService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
