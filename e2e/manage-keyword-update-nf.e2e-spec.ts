import { protractor,browser, by, element } from 'protractor';
 
describe('Manage Keyword - Update - Non Functional', () => {
  
  beforeEach(() => {
    browser.get('/admin');
  });

  it('[01] Test response time for update keyword',() => {
    var startTime;
    var endTime;
    var elapsedTime;

    element.all(by.css('.action-button.edit')).first().click();
    updateInput(element(by.css('.input-word')), 'test-word');
    updateInput(element(by.css('.input-category')), 'test-category');
    updateInput(element(by.css('.input-similar_to')), 'test-similar_to');

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

  function clearInput(input){
    for (let i=0; i<30; i++){
      input.sendKeys(protractor.Key.BACK_SPACE);
    }
  }

  function updateInput(input, newValue){
    clearInput(input);
    input.sendKeys(newValue);
  }


});