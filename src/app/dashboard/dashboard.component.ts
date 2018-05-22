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
