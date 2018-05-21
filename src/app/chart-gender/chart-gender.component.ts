import { Component, OnInit, ElementRef } from '@angular/core';
import { HeatMapService } from '../heat-map/heat-map.service';
import * as D3 from 'd3/index';

@Component({
  selector: 'chart-gender',
  templateUrl: './chart-gender.component.html',
  styleUrls: ['./chart-gender.component.scss']
})
export class ChartGenderComponent implements OnInit {
  tweetsDownloadSubscription;

  // for geotagging
  geotaggedTweetCount = 0;
  geotaggedTweetPercentage = 0;
  totalTweetCount = 0;

  host;
  height;
  width;
  svg;
  margin;
  g;

  constructor(private _element: ElementRef, 
              private _mapService: HeatMapService) { 
    this.host = D3.select(this._element.nativeElement);
    //this.setup();
    //this.buildSVG();
  }

  ngOnInit() {
    
  }
  setup() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    };
    this.width = document.querySelector('.gender-meter').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.6 - this.margin.bottom - this.margin.top;
    //this.width = "100%";
    //this.height="100%";
  }

  buildSVG() {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('class','map-container')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
    
    this.g = this.svg.append('g');
    // this.tweetLayer = this.svg.append('g');
    // this.g.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    
      // append a rect
      /*this.svg.append('rect')
              .attr('class', 'background')
              .attr('width', this.width)
              .attr('height', this.height)
              .on('click', this.countrysClicked );*/
  }

}
