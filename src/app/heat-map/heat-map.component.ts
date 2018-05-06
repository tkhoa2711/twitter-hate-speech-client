import { Component, OnInit, ElementRef, Input, OnDestroy  } from '@angular/core';
import * as D3 from 'd3/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppService } from '../app.service';
import { HeatMapService } from './heat-map.service';
// import { Tweet } from '../shared/tweet';

@Component({
  selector: 'heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent implements OnInit, OnDestroy {
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
  g;
  width;
  centered;

  zoomSettings = {
    duration:1000,
    ease: D3.easeCubicOut,
    zoomLevel: 4
  }
  zoomUpdateSubscription;

  constructor (private appService: AppService,
              private _element: ElementRef, 
              private _mapService: HeatMapService) {
    this.host = D3.select(this._element.nativeElement);
    this.getMapData();
    this.setup();
    this.buildSVG();
    this.zoomUpdateSubscription = this.appService.zoomChange.subscribe(
      (zoomChange) => {
        if(zoomChange==='in'){
          this.zoomSettings.zoomLevel += 0.5;
          
        }else{
          this.zoomSettings.zoomLevel -= 0.5;
        }
        let x = this.width / 2;
        let y = this.height / 2;
        if(this.centered !== null){
          var centroid = this.path.centroid(this.centered );
          x = centroid[0];
          y = centroid[1];
        }
        this.g.transition().duration(this.zoomSettings.duration)
                  .ease(this.zoomSettings.ease)
                  .attr('transform',
                        //'translate(scale('+this.zoomSettings.zoomLevel+'))');
                        'translate('+ this.width/2 + ','+ this.height/2  +')scale('+this.zoomSettings.zoomLevel+')translate('+ -x + ',' + -y +')');
      }
    );
    this._mapService.getTwitterData();
  }

  ngOnDestroy(){
    this.appService.zoomChange.unsubscribe();
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
      .attr('height', this.height + this.margin.top + this.margin.bottom);
    
    this.g = this.svg.append('g');
    //this.g.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    
      // append a rect
      /*this.svg.append('rect')
              .attr('class', 'background')
              .attr('width', this.width)
              .attr('height', this.height)
              .on('click', this.countrysClicked );*/
  }

  setMap(mapData) {
    this.mapData = mapData;

    // define projection
    this.projection = D3.geoMercator()
      .translate([this.width /2 , this.height /2 ])
      .scale(210);
    
    // apply the projection
    this.path = D3.geoPath()
      .projection(this.projection);
/*
    // find the max value
    var meanDensity:number = +D3.mean(mapData, function(d){
      return d.properties.density;
    });

    // normalise the value
    var scaleDensity = D3.scaleLinear().domain([0, meanDensity]).range([0,1]);

    // setup the color function
    var color = D3.scaleSequential(D3.interpolateRdYlGn);*/

    // set the color schematic
    /*# d3.interpolateRdYlGn(t) <> 
    # d3.schemeRdYlGn[k]*/
    var heatMapComponentScope = this;

    this.g.append('g')
      .selectAll('path')
      .data(this.mapData)
      .enter().append('path')
      .attr('d', this.path)
      .attr('class', 'country')
      .style('stroke', '#d5d8db')
      .style('stroke-width', '1')
      .style('fill', '#e8e8e8')
      .on('click', function(d){
        heatMapComponentScope.countryClicked(heatMapComponentScope,d);
        // console.log(heatMapComponentObject.path)
      });

    /*this.svg.selectAll('.country')
      .data(this.mapData)
      .enter().append('path')
        .attr('d', this.path)
        .attr('class', 'country')
        .style('stroke', '#d5d8db')
        .style('stroke-width', '1')
        .style('fill', '#e8e8e8')
        .on('click', function(d){
          heatMapComponentScope.countryClicked(heatMapComponentScope,d);
          // console.log(heatMapComponentObject.path)
        });*/
        /*.attr('fill',function(d){
          var countryDensity = d.properties.density;
          var density = countryDensity ? countryDensity : 0;
          // return color(scaleDensity(density))
          if(countryDensity > 200){
            return 'red';
          } else {
            return 'green';
          }
        });*/

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

  countryClicked(heatMapComponentScope, d):void {
    var x;
    var y;
    var zoomLevel;
    //var centered;

    if (d && heatMapComponentScope.centered !== d){

      var centroid = heatMapComponentScope.path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      zoomLevel = heatMapComponentScope.zoomSettings.zoomLevel;
      heatMapComponentScope.centered =  d;
      //console.log(x+','+y);
    } else {
      x = heatMapComponentScope.width / 2;
      y = heatMapComponentScope.height / 2;
      zoomLevel = 1;
      heatMapComponentScope.centered = null;
    }
    //console.log(x+','+y);
    heatMapComponentScope.g.transition().duration(heatMapComponentScope.zoomSettings.duration)
                  .ease(heatMapComponentScope.zoomSettings.ease)
                  .attr('transform',
                        'translate('+ heatMapComponentScope.width/2 + ','+ heatMapComponentScope.height/2  +')scale('+zoomLevel+')translate('+ -x + ',' + -y +')');
  }

}
