import {Output, EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService{
    @Output() zoomChange: EventEmitter<any> = new EventEmitter();

    constructor (){

    }

    zoomLevelChanged(value:string){
        this.zoomChange.emit(value);
    }
}