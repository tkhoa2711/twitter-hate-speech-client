import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, ElementRef, Input, OnDestroy  } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {  
  MatCardModule,
  MatProgressSpinnerModule
  } from '@angular/material';
import { HttpModule }    from '@angular/http';

import { DashboardComponent } from './dashboard.component';
import { HeatMapComponent } from '../heat-map/heat-map.component';
import { AppConfig } from '../app.config';
import { AppService } from '../app.service';
import { HeatMapService } from '../heat-map/heat-map.service';



describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, HeatMapComponent ],
      imports: [
        FlexLayoutModule,
        MatCardModule,
        MatProgressSpinnerModule,
        HttpModule
      ],
      providers: [ AppConfig, AppService, HeatMapService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
