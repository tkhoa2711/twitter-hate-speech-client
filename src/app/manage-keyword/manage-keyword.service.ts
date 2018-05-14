import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppConfig } from '../app.config';

@Injectable()
export class ManageKeywordService{
    private socket;

    constructor (private _http:Http,
                 private appConfig: AppConfig){
        
    }

    getHateWordsData(): Promise<any> {
        let hateWordsDataPromise = this._http.get(`${this.appConfig.API_URL}/hatewords`, { withCredentials: true }).toPromise();
        /*hateWordsDataPromise.then(requestResult => {
            let hateWords = requestResult.json();
            console.log(hateWords);
            // this.tweetsDownloaded.emit(rawTweets);
        });*/
        return hateWordsDataPromise;
    }
}