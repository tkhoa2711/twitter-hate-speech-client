import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule, 
        MatCheckboxModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatIconModule, 
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatToolbarModule, 
        MatProgressSpinnerModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { TagInputModule } from 'ngx-chips';

import { MouseWheelDirective } from './directives/mousewheel.directive';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { HeatMapService } from './heat-map/heat-map.service';


@NgModule({
  declarations: [
    AppComponent,
    HeatMapComponent,
    MouseWheelDirective
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
    MatCheckboxModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatIconModule, 
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule, 
    MatProgressSpinnerModule,
    TagInputModule, 
  ],
  providers: [ AppService, HeatMapService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
