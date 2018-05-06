import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, 
        MatCheckboxModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatIconModule, 
        MatInputModule,
        MatToolbarModule, 
        MatProgressSpinnerModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { HeatMapService } from './heat-map/heat-map.service';


@NgModule({
  declarations: [
    AppComponent,
    HeatMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatIconModule, 
    MatInputModule,
    MatToolbarModule, 
    MatProgressSpinnerModule
  ],
  providers: [ HeatMapService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
