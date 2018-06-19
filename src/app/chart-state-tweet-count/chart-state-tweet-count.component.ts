import { Component, OnInit, ElementRef } from '@angular/core';
import { HeatMapService } from '../heat-map/heat-map.service';
import * as D3 from 'd3/index';

@Component({
  selector: 'chart-state-tweet-count',
  templateUrl: './chart-state-tweet-count.component.html',
  styleUrls: ['./chart-state-tweet-count.component.scss']
})
export class ChartStateTweetCountComponent implements OnInit {

  tweetsDownloadSubscription;
  viewModeSubscription;

  host;
  height;
  width;
  svg;
  margin;
  g;
  isLoading = true;

  // chart specific implementation
  r = 100;
  color = D3.scaleOrdinal(D3.schemeCategory10);

  data = [];


  constructor(private _element: ElementRef, 
    private _mapService: HeatMapService) { 
      this.tweetsDownloadSubscription = this._mapService.tweetsDownloaded.subscribe(
        (rawTweets) => {
          this.data= [];
          var rawData = [];
          for(let rawTweetIndex in rawTweets.result){
            let currentCountry = this._mapService.getCurrentCountry();
            if(rawTweets.result[rawTweetIndex].place.state!=null){
              let stateName = rawTweets.result[rawTweetIndex].place.state;
              rawData[stateName] = (rawData[stateName]==null)?1:(rawData[stateName]+1);
            }
          }
          for(let rawDataIndex in rawData){
            //console.log(rawDataIndex);
            this.data.push({"name":rawDataIndex, "value":rawData[rawDataIndex]});
          }
          this.data = this.data.sort(function (a, b) {
            return D3.ascending(a.value, b.value);
          })
          //console.log(rawData);
          this.setup();
          this.buildSVG();
          this.isLoading=false;
          
      });
      this.viewModeSubscription = this._mapService.viewModeChange.subscribe(
        (viewMode) => {
          var rawTweets = this._mapService.getDownloadedTweets();
          if(rawTweets.length>0){
            if( (viewMode == 'country') && (rawTweets.result.length>0)){
              this.data= [];
              var rawData = [];
              let currentCountry = this._mapService.getCurrentCountry();
              console.log(currentCountry);
              for(let rawTweetIndex in rawTweets.result){
                if((rawTweets.result[rawTweetIndex].place.state!=null) && 
                  (rawTweets.result[rawTweetIndex].place.country_code==currentCountry)) {
                  let stateName = rawTweets.result[rawTweetIndex].place.state;
                  rawData[stateName] = (rawData[stateName]==null)?1:(rawData[stateName]+1);
                }
              }
              for(let rawDataIndex in rawData){
                console.log(rawDataIndex);
                this.data.push({"name":rawDataIndex, "value":rawData[rawDataIndex]});
              }
              this.data = this.data.sort(function (a, b) {
                return D3.ascending(a.value, b.value);
              })
              //console.log(rawData);
              this.setup();
              this.buildSVG();
              this.isLoading=false;
            }
          }
      });
    
  }

  ngOnInit() {
    this.host = D3.select(this._element.nativeElement.querySelector('.state-meter'));
    //sort bars based on value
    
    if(!this.isLoading){
      this.setup();
      this.buildSVG();
    }
  }

  setup() {
    this.margin = {
      top: 15,
      right: 25,
      bottom: 15,
      left: 100
    };
    this.width = document.querySelector('.state-meter').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width - this.margin.bottom - this.margin.top;
  }

  buildSVG(){
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('class','state-chart-container')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    
    let chartScope = this;
    
    var x = D3.scaleLinear()
    .range([0, this.width])
    .domain([0, D3.max(this.data, function (d) {
        return d.value;
    })]);
    var y = D3.scaleBand()
            .rangeRound([this.height, 0])
            .domain(this.data.map(function (d) {
                return d.name;
            }));
    //make y axis to show bar names
    var yAxis = D3.axisLeft(y)
                .scale(y);
                //no tick marks
                /*.tickSize(0)
                .orient("left");*/

    var gy = this.svg.append("g")
                .attr("class", "y-axis")
                .call(yAxis)
    
    var bars = this.svg.selectAll(".bar")
            .data(this.data)
            .enter()
            .append("g")
    
    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth()-8)
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.value);
        });
    
    //add a value label to the right of each bar
    bars.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return y(d.name) + y.bandwidth() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return x(d.value) + 3;
    })
    .text(function (d) {
        return d.value;
    });
    
  }

}

interface Datum {
  label: string;
  value: number;
}
