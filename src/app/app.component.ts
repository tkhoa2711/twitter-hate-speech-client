import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeatMapComponent } from './heat-map/heat-map.component';
import * as D3 from 'd3/index';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  errorMessage: String;
  host;
  svg;
  showSideMenu: Boolean = true;

  // filter form
  filterForm: FormGroup;

  constructor(private _element: ElementRef, private formBuilder: FormBuilder){
    //this.host = D3.select(this._element.nativeElement);
    this.createForm();
  }

  ngOnInit(){
    //this.buildSVG();
    this.showSideMenu = false;
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      name: '', // <--- the FormControl called "name"
    });
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
}
