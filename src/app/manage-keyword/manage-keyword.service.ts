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

    submitKeyword(hatewordData): Promise<any>{
        //let submitKeywordPromise = this._http.get(`${this.appConfig.API_URL}/hatewords`, { withCredentials: true }).toPromise();
        let submitKeywordPromise = this._http.post(`${this.appConfig.API_URL}/hatewords`, hatewordData , { withCredentials: true }).toPromise();
        return submitKeywordPromise;
    }

    deleteKeyword(keyword: String): Promise<any>{
        //let submitKeywordPromise = this._http.get(`${this.appConfig.API_URL}/hatewords`, { withCredentials: true }).toPromise();
        let deleteKeywordPromise = this._http.delete(`${this.appConfig.API_URL}/hatewords?word=${keyword}` ).toPromise();
        return deleteKeywordPromise;
        //let deleteKeywordPromise = this._http.request('delete',`${this.appConfig.API_URL}/hatewords?word=${keyword}` ).toPromise();
        //return deleteKeywordPromise;
        //http.request('delete', url, { body: { ... } });
    }

    getLoginStatus():boolean{
        /*let loginStatusPromise = this._http.post(`${this.appConfig.API_URL}/auth/is_logged_in`, {} , { withCredentials: true }).toPromise();
        return loginStatusPromise;*/
        return false;
    }

    login(loginData: any):boolean{
        /*let loginPromise = this._http.post(`${this.appConfig.API_URL}/auth/login`, loginData , { withCredentials: true }).toPromise();
        return loginPromise;*/
        return true;
    }
}