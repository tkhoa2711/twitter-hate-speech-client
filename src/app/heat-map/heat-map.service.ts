import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as topojson from "topojson-client";

@Injectable()
export class HeatMapService{
    private mapDataUrl = 'http://hate-speech.local';
    private twitterDataServerUrl = 'http://139.59.110.130:5000';
    private socket;

    constructor (private _http:Http){

    }

    getMapData(): Observable<any>{
       //setTimeout(this._http.get('http://localhost:5000/'),5000);
        return this._http.get(`${this.mapDataUrl}/topojson/world.json`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getStatesMapData(countryId:String): Promise<any> {
        let statesMapDataPromise = this._http.get(`${this.mapDataUrl}/topojson/provinces/provinces_${countryId}.json`).toPromise();
        return statesMapDataPromise;
    }

    getTwitterData(): Promise<any> {
        let twitterDataPromise = this._http.get(`${this.twitterDataServerUrl}/tweets`, { withCredentials: true }).toPromise();
        return twitterDataPromise;
    }

    private extractData(res: Response){
        let body=res.json();
        let countriesData = topojson.feature(body,body.objects.countries).features;
        //console.log(body);
        return countriesData || {};
        //return body.data || {};
    }

    private handleError(error: any){
        let errMsg = (error.message) ? error.message:
            error.status ? `$(error.status) - $(error.statusText)` : `Server error`;
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}