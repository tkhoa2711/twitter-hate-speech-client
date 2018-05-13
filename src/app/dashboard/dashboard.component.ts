import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

import { HeatMapComponent } from '../heat-map/heat-map.component';
import { HeatMapService } from '../heat-map/heat-map.service';
import * as D3 from 'd3/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tweetsDownloadSubscription;

  // for geotagging
  geotaggedTweetCount = 0;
  geotaggedTweetPercentage = 0;
  totalTweetCount = 0;
  

  constructor(private appService: AppService,
              private _mapService: HeatMapService) { 
    this.tweetsDownloadSubscription = this._mapService.tweetsDownloaded.subscribe(
      (rawTweets) => {
        this.geotaggedTweetCount = 0;
        for(let rawTweetIndex in rawTweets.result){
          //console.log(rawTweets.result[rawTweetIndex].place.country_code);
          // count number of tweet for this country if not null
          if(rawTweets.result[rawTweetIndex].place!=null){
            this.geotaggedTweetCount++;
          }
        }
        this.totalTweetCount=rawTweets.result.length;
        this.geotaggedTweetPercentage =Math.round(this.geotaggedTweetCount/this.totalTweetCount*10000)/100;
        //console.log( this.geotaggedTweetCount + 'vs' + rawTweets.result.length);
      });
      
  }

  ngOnInit() {
  }




  zoomOut(event){
    // console.log('goin up');
    this._mapService.zoomLevelChanged('out');
  }
  zoomIn(event){
    // console.log('goin down');
    this._mapService.zoomLevelChanged('in');
  }

}
