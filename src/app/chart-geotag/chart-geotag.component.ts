import { Component, OnInit } from '@angular/core';
import { HeatMapService } from '../heat-map/heat-map.service';

@Component({
  selector: 'chart-geotag',
  templateUrl: './chart-geotag.component.html',
  styleUrls: ['./chart-geotag.component.scss']
})
export class ChartGeotagComponent implements OnInit {
  tweetsDownloadSubscription;

  // for geotagging
  geotaggedTweetCount = 0;
  geotaggedTweetPercentage = 0;
  totalTweetCount = 0;

  constructor(private _mapService: HeatMapService) { 
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

}
