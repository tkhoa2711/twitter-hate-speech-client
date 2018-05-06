import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as topojson from "topojson-client";

@Injectable()
export class HeatMapService{
    private url = 'http://hate-speech.local/topojson/world.json';
    private socket;

    constructor (private _http:Http){

    }

    getMapData(): Observable<any>{

    
       //setTimeout(this._http.get('http://localhost:5000/'),5000);
        return this._http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);

    }

    private extractData(res: Response){
        let body=res.json();
        let countriesData = topojson.feature(body,body.objects.countries).features;
        console.log(countriesData);
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