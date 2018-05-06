import { Component, OnInit, ElementRef, Input  } from '@angular/core';
import * as D3 from 'd3/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HeatMapService } from './heat-map.service';
// import { Tweet } from '../shared/tweet';

@Component({
  selector: 'heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent implements OnInit {
  @Input()
  twitterState: any;
  errorMessage: string;
  height;
  host;
  htmlElement: HTMLElement;
  mapData;
  margin;
  points: number[][] = [];
  projection;
  path;
  svg;
  width;

  constructor (private _element: ElementRef, private _mapService: HeatMapService) {
    this.host = D3.select(this._element.nativeElement);
    this.getMapData();
    this.setup();
    this.buildSVG();
  }

  ngOnInit(){

  }

  ngOnChanges() {
    if (this.twitterState.tweets) {
      this.updateDots(this.twitterState.tweets);
    }
  }

  getMapData() {
    this._mapService.getMapData()
      .subscribe(
        mapData => this.setMap(mapData),
        error =>  this.errorMessage = <any>error
      )
  }

  setup() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    };
    this.width = document.querySelector('#map').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.6 - this.margin.bottom - this.margin.top;
    //this.width = "100%";
    //this.height="100%";
  }

  buildSVG() {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('class','map-container')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  setMap(mapData) {
    this.mapData = mapData;
    this.projection = D3.geoMercator()
      .translate([this.width /2 , this.height /2 ])
      .scale(210);
    this.path = D3.geoPath()
      .projection(this.projection);

    this.svg.selectAll('.country')
      .data(this.mapData)
      .enter().append('path')
        .attr('d', this.path)
        .attr('class', 'country')
        .style('stroke', '#d5d8db')
        .style('stroke-width', '1')
        .style('fill', '#e8e8e8');

    /*this.svg.selectAll('path')
      .data(this.mapData.features)
      .enter().append('path')
        .attr('d', this.path)
        .style('stroke', '#fff')
        .style('stroke-width', '1')
        .style('fill', 'lightgrey');*/
  }

  updateDots(tweets) {
     /*this.points = [];
    tweets.forEach((tweet) => {
      if (tweet.coordinates.length > 0) {
        const lon = tweet.coordinates[1];
        const lat = tweet.coordinates[0];
        let location: any = {};
        location.coords = [lon, lat];
        location.username = tweet.username;
        if (this.projection(location.coords)) {
          location.coords = this.projection(location.coords);
          this.points.push(location);
        }
      }
    });
   this.svg.selectAll('circle')
      .data(this.points).enter()
      .append('circle')
        .attr('cx', function(d) {
          return d.coords[0];
        })
        .attr('cy', function(d) {
          return d.coords[1];
        })
        .attr('r', '4px')
        .style('fill', 'blue')
        .style('opacity', 0.4)
        .style('cursor', 'pointer')
        .on('click', function(d) {
          window.open('http://twitter.com/@' + d.username);
        })
        .append('title')
          .text(d => 'Location: ' + d.coords);*/
  }

}
