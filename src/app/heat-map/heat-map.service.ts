import { Http, Response } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as topojson from "topojson-client";
import { AppConfig } from '../app.config';

@Injectable()
export class HeatMapService{
    // private mapDataUrl = 'http://hate-speech.local';
    // private twitterDataServerUrl = 'http://139.59.110.130:5000';
    @Output() zoomChange: EventEmitter<any> = new EventEmitter();
    @Output() viewModeChange: EventEmitter<any> = new EventEmitter();
    @Output() tweetsDownloaded: EventEmitter<any> = new EventEmitter();
    private socket;
    private viewMode:String = 'world';
    private currentCountry:String = '';
    private tweets = [];;

    constructor (private _http:Http,
                 private appConfig: AppConfig){
        
    }

    getMapData(): Observable<any>{
       //setTimeout(this._http.get('http://localhost:5000/'),5000);
        return this._http.get(`${this.appConfig.MAP_DATA_URL}/topojson/world.json`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getStatesMapData(countryId:String): Promise<any> {
        let statesMapDataPromise = this._http.get(`${this.appConfig.MAP_DATA_URL}/topojson/provinces/provinces_${countryId}.json`).toPromise();
        return statesMapDataPromise;
    }

    getTwitterData(): Promise<any> {
        let twitterDataPromise = this._http.get(`${this.appConfig.API_URL}/tweets?limit=30000`, { withCredentials: true }).toPromise();
        twitterDataPromise.then(requestResult => {
            let rawTweets = requestResult.json();
            this.tweets = rawTweets;
            this.tweetsDownloaded.emit(rawTweets);
        }).catch(function(e) {
            console.log('Error: ', e);
        });
        return twitterDataPromise;
    }

    getDownloadedTweets():any{
        return this.tweets;
    }

    getViewMode(): String{
        return this.viewMode;
    }

    setViewMode(newViewMode:String){
        this.viewMode = newViewMode;
    }

    getCurrentCountry(): String{
        return this.currentCountry;
    }

    setCurrentCountry(newCountry:String){
        this.currentCountry = newCountry;
        this.viewModeChange.emit(this.viewMode);
    }

    private extractData(res: Response){
        let body=res.json();
        let countriesData = topojson.feature(body,body.objects.countries).features;
        return countriesData || {};
    }

    private handleError(error: any){
        let errMsg = (error.message) ? error.message:
            error.status ? `$(error.status) - $(error.statusText)` : `Server error`;
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    zoomLevelChanged(value:string){
        this.zoomChange.emit(value);
    }
}