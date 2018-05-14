import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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

  mode = 'view';

  hateWordForm: FormGroup;
 

  constructor( private manageKeywordService : ManageKeywordService,
              private formBuilder: FormBuilder ) { 
    this.createForm();
  }

  ngOnInit() {
    this.mode = 'view';
    let hateWordsDataPromise = this.manageKeywordService.getHateWordsData();
    hateWordsDataPromise.then(requestResult => {
      let fetchedHateWords = requestResult.json().result;
      this.hateWords = [];
      // console.log(this.hateWords);
      let ctr = 0;
      for(let fetchedHateWord of fetchedHateWords){
        
        ctr++;
        let categories ="";
        let similarWords ="";
        if(fetchedHateWord.category!=null){
          categories = fetchedHateWord.category.join();
          console.log(categories);
        }
        if(fetchedHateWord.similar_to!=null){
          similarWords = fetchedHateWord.similar_to.join();
          console.log(similarWords);
        }
        //console.log(fetchedHateWord);
        this.hateWords.push({position: ctr, word: fetchedHateWord.word, category: categories, similarTo:similarWords, action:'' }); 
      }
      // console.log(this.hateWords);
      this.dataSource = this.hateWords;
      // this.tweetsDownloaded.emit(rawTweets);
    });
  }

  createForm() {
    this.hateWordForm = this.formBuilder.group({
      word: ['', Validators.required],
      category: [''],
      similar_to: ['']/*,
      keywords: new FormControl('', []),
      hashtags: [''], // <--- the FormControl called "name"*/
    });
  }
  resetHateWordForm(){
    this.hateWordForm.reset();
    this.mode='view';
  }
  addHateWord(){
    this.hateWordForm.reset();
    this.mode='insert';
  }
  updateHateWord(pWord, pCategory, pSimilarTo){
    this.hateWordForm.reset();
    this.hateWordForm = this.formBuilder.group({
      word: [pWord, Validators.required],
      category: [pCategory],
      similar_to: [pSimilarTo]/*,
      keywords: new FormControl('', []),
      hashtags: [''], // <--- the FormControl called "name"*/
    });
    this.mode='update';
  }
  submitData(hateWordData:any){
    
    hateWordData.category = hateWordData.category.split(",");
    hateWordData.similar_to = hateWordData.similar_to.split(",");
    console.log(hateWordData);

    let submitKeywordPromise = this.manageKeywordService.submitKeyword(hateWordData);
    submitKeywordPromise.then(requestResult => {
      let result = requestResult.json();
      console.log("completed");
    });
    // console.log(filterData.startDate.valueOf());
    // console.log(filterData.endDate.valueOf());
  }

}

export interface Element {
  position: number;
  word: string;
  category: string;
  similarTo: string;
  action: string
}
