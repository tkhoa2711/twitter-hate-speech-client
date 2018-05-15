import { browser, by, element } from 'protractor';
 
describe('Manage Keyword - Create - Non Functional', () => {
  
  beforeEach(() => {
    browser.get('/admin');
  });

  it('[01] Test response time for create keyword',() => {
    var startTime;
    var endTime;
    var elapsedTime;

    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('test-word');
    element(by.css('.input-category')).sendKeys('test-category');
    element(by.css('.input-similar_to')).sendKeys('test-similar_to');

     // Insert timer start function here
    browser.controlFlow().execute(function() {
      startTime = new Date().getTime();
    });

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // Insert timer stop function here and output result!
    browser.controlFlow().execute(function() {
      endTime = new Date().getTime();
      elapsedTime = endTime - startTime;
      console.log('elapsedTime = ' + elapsedTime + 'ms');
      // check elapsed time less than 2s
      expect(elapsedTime).toBeLessThanOrEqual(2000);
      
    });

    // check the success message
    expect(element(by.css('.form-result')).getText()).toEqual('success');
    
  });


});