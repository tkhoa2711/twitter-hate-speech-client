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

  host;
  height;
  width;
  svg;
  margin;
  g;
  isLoading = true;
  tweets= [];

  // chart specific implementation
  r = 100;
  color = D3.scaleOrdinal(D3.schemeCategory10);

  data = [{"label":"male", "value":0}, 
          {"label":"female", "value":0}, 
          {"label":"unknown", "value":0}];

  constructor(private _element: ElementRef, 
              private _mapService: HeatMapService) { 
    this.tweetsDownloadSubscription = this._mapService.tweetsDownloaded.subscribe(
      (rawTweets) => {
        this.data[0].value = 0;
        this.data[1].value = 0;
        this.data[2].value = 0;
        this.tweets = rawTweets.result;
        for(let rawTweetIndex in rawTweets.result){
          //console.log(rawTweets.result[rawTweetIndex].place.country_code);
          // count number of tweet for this country if not null
          /*if(rawTweets.result[rawTweetIndex].place!=null){
            this.geotaggedTweetCount++;
          }*/
          switch(rawTweets.result[rawTweetIndex].user.gender) {
            case 'M':
                this.data[0].value++;
                break;
            case 'F':
                this.data[1].value++;
                break;
            default:
                this.data[2].value++;
          } 
          // console.log();
        }
        this.setup();
        this.buildSVG();
        this.isLoading=false;
        //this.totalTweetCount=rawTweets.result.length;
        //this.geotaggedTweetPercentage = Math.round(this.geotaggedTweetCount/this.totalTweetCount*10000)/100;
    });
  }

  ngOnInit() {
    this.host = D3.select(this._element.nativeElement.querySelector('.gender-meter'));
    if(!this.isLoading){
      this.setup();
      this.buildSVG();
    }
  }
  setup() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    };
    this.width = document.querySelector('.gender-meter').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width - this.margin.bottom - this.margin.top;
    
    this.r = this.width/2;
  }

  buildSVG() {
    this.host.html('');
    this.svg = this.host.append('svg')
      .attr('class','gender-chart-container')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .data([this.data]);
    
    let chartScope = this;
    // add the main svg container
    this.g = this.svg.append('g')
                      .attr("transform", "translate(" + chartScope.r + "," + chartScope.r + ")");
    
    // define inner radius and outer radius of the application
    let arc = D3.arc().innerRadius(0)
                      .outerRadius(chartScope.r);

    var pie = D3.pie<Datum>() // create arc data given set of values
                .value(function(d: Datum) { return d.value; }); 

    var arcs = this.g.selectAll("g.slice")  // select all slice
                        .data(pie)          // associate the data with slice of svg path
                        .enter()            
                        .append("svg:g")    // create a <g> element for each of the data
                        .attr("class", "slice");  // add slice class to the element

    
    arcs.append("svg:path")
            .attr("fill", function(d, i) { 
              return chartScope.color(i); 
            } ) // set the color of each slice using color function
            .attr("d", arc); // draw the svg path

    arcs.append("svg:text")  // display label for each of the slice
            .attr("transform", function(d) {  
            // transform the center point for displaying text
            d.innerRadius = 0;
            d.outerRadius = chartScope.r;
            return "translate(" + arc.centroid(d) + ")";  
        })
        .attr("text-anchor", "middle") // align the text to middle 
        .text(function(d, i) { 
          let percentage = chartScope.data[i].value/chartScope.tweets.length;
          return chartScope.data[i].label+" ("+Math.round(percentage*10000)/100+"%)"; 
        });  // get and display the label from dataset
        
  }

  buildPieChart():void{

  }

}

interface Datum {
  label: string;
  value: number;
}