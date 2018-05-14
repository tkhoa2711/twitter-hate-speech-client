import { Component, OnInit } from '@angular/core';
import { ManageKeywordService } from './manage-keyword.service';

@Component({
  selector: 'app-manage-keyword',
  templateUrl: './manage-keyword.component.html',
  styleUrls: ['./manage-keyword.component.scss']
})

export class ManageKeywordComponent implements OnInit {

  displayedColumns = ['position', 'word', 'category', 'similarTo', 'action'];
  hateWords = []; 
  dataSource : Element[] = [
    {position: 1, word: 'Loading..', category: 'Loading..', similarTo: 'Loading..', action:''}
  ];

 

  constructor( private manageKeywordService : ManageKeywordService ) { 
    
  }

  ngOnInit() {
    let hateWordsDataPromise = this.manageKeywordService.getHateWordsData();
    hateWordsDataPromise.then(requestResult => {
      let fetchedHateWords = requestResult.json().result;
      this.hateWords = [];
      // console.log(this.hateWords);
      let ctr = 0;
      for(let fetchedHateWord of fetchedHateWords){
        
        ctr++;
        this.hateWords.push({position: ctr, word: fetchedHateWord.word, category: '', similarTo:'', action:'' }); 
      }
      // console.log(this.hateWords);
      this.dataSource = this.hateWords;
      // this.tweetsDownloaded.emit(rawTweets);
    });
  }

}

export interface Element {
  position: number;
  word: string;
  category: string;
  similarTo: string;
  action: string
}
