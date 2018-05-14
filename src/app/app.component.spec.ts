import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule,
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
        RouterModule
      ]
      /* schemas: [ NO_ERRORS_SCHEMA ]*/
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Twitter Hate Speech Detector'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Twitter Hate Speech Detector');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Twitter Hate Speech Detector');
  }));
});
