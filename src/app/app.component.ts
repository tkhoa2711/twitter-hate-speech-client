import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { HttpClient } from '@angular/common/http';

import { AppService } from './app.service';
import { AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class AppComponent implements OnInit {
  title = 'Twitter Hate Speech Detector';
  errorMessage: String;
  host;
  svg;
  showSideMenu: Boolean = true;

  // selectedGenders =[
  //   {id: 'M', label: 'Male'},
  //   {id: 'F', label: 'Female'},
  //   {id: 'U', label: 'Unspecified'}
  // ];

  selectedGenders =['M','F','U'];

  // filter form
  filterForm: FormGroup;

  // static values
  minEndDate;
  hateSpeechCategories = [
    {id: '0', label: 'Racial'},
    {id: '1', label: 'Class'},
    {id: '2', label: 'Mysogynist'}
  ];
  genders = [
    {id: 'M', label: 'Male'},
    {id: 'F', label: 'Female'},
    {id: 'U', label: 'Unspecified'}
  ];

  constructor(private appService: AppService,
              private _element: ElementRef, 
              private formBuilder: FormBuilder,
              private adapter: DateAdapter<any>,
              private appConfig: AppConfig){
    //this.host = D3.select(this._element.nativeElement);
    this.createForm();
    this.adapter.setLocale('en-gb');
  }

  ngOnInit(){
    //this.buildSVG();
    this.showSideMenu = false;
  }

  compareWithSelected(a, b) {
    return a === b;
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: [''],
      gender: [''],
      mention: [''],
      keywords: new FormControl('', []),
      hashtags: [''], // <--- the FormControl called "name"
    });
  }

  setMinEndDate(event: any){
    // console.log(event.value.toDate());
    this.minEndDate = event.value.toDate();
  }

  buildSVG(): void{
    /*this.host.html('');
    this.svg = this.host.append('svg')
      .attr('width','600')
      .attr('height','400')
      .style('background-color','blue')*/
  }

  toggleSideMenu(){
    this.showSideMenu = !this.showSideMenu;
  }

  getTweetData(filterData:any){
    // console.log(filterData);
    // console.log(filterData.startDate.valueOf());
    // console.log(filterData.endDate.valueOf());
  }

  resetFilterForm(){
    this.filterForm.reset();
    this.selectedGenders =['M','F','U'];
  }

  activateEvent(event) {
    // if (ENV === 'development') {
    //   console.log('Activate Event:', event);
    // }
    // window.scroll(0, 0);
  }

  deactivateEvent(event) {
    // if (ENV === 'development') {
    //   console.log('Deactivate Event', event);
    // }
  }
}
