import { protractor, browser, by, element } from 'protractor';
 
describe('Manage Keyword - Update', () => {
  
  beforeEach(() => {
    browser.get('/admin');
  });

  it('[01] edit button should work',() => {
    // ensure the form does not show before edit button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
    // trigger the edit button click
    element.all(by.css('.action-button.edit')).first().click();
    // ensure the form is showing after edit button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeTruthy('The keyword form should appear now');
    // ensure the title is edit
    expect(element(by.css('.hateword-form-container h2')).getText()).toContain('update keyword');
  });

  it('[02] cancel button should close form',() => {
    element.all(by.css('.action-button.edit')).first().click();
    // trigger the close btn
    element(by.css('.btn-cancel')).click();
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
  });

  it('[03] edit should preload values',() => {
    // trigger the edit button click
    element.all(by.css('.action-button.edit')).first().click();

    // get the grid first row 
    var firstRow = element.all(by.css('.mat-row')).first();
    var firstRowColumn = firstRow.all(by.css('.mat-cell'));
    // ensure the value is preloaded correctly
    expect(element(by.css('.input-word')).getAttribute('value')).toEqual(firstRowColumn.get(1).getText());
    expect(element(by.css('.input-category')).getAttribute('value')).toEqual(firstRowColumn.get(2).getText());
    expect(element(by.css('.input-similar_to')).getAttribute('value')).toEqual(firstRowColumn.get(3).getText());
  });

  it('[04] empty keyword submission should not be allowed',() => {
    // send empty input
    element.all(by.css('.action-button.edit')).first().click();
    clearInput(element(by.css('.input-word')));

    /*element(by.css('.input-word')).clear();
    element(by.css('.input-word')).sendKeys('');
    element(by.css('.input-word')).sendKeys(protractor.Key.ENTER);*/
    updateInput(element(by.css('.input-category')), element(by.css('.input-category')).getAttribute('value'));
    updateInput(element(by.css('.input-similar_to')), element(by.css('.input-category')).getAttribute('value'))
   
    // submit button should be disabled 
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
  });

  it('[05] Test updating only word parameter should pass',() => {
    element.all(by.css('.action-button.edit')).first().click();

    updateInput(element(by.css('.input-word')), 'test-word11');
    clearInput(element(by.css('.input-category')));
    clearInput(element(by.css('.input-similar_to')));

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.form-result')).getText()).toEqual('success');
  });

  it('[06] Test submitting only category field should disable submit button',() => {
    element.all(by.css('.action-button.edit')).first().click();
    
    clearInput(element(by.css('.input-word')));
    updateInput(element(by.css('.input-category')), 'test-category11');
    clearInput(element(by.css('.input-similar_to')));

    // submit button should be disabled 
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
  });

  it('[07] Test submitting only similar field should disable submit button',() => {
    element.all(by.css('.action-button.edit')).first().click();

    clearInput(element(by.css('.input-word')));
    clearInput(element(by.css('.input-category')));
    updateInput(element(by.css('.input-similar_to')), 'test-category11');

    // submit button should be disabled 
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
  });

  it('[08] Test updating only word and category field should pass',() => {
    element.all(by.css('.action-button.edit')).first().click();

    updateInput(element(by.css('.input-word')),'test-word12');
    updateInput(element(by.css('.input-category')),'test-category12');
    clearInput(element(by.css('.input-similar_to')));

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.form-result')).getText()).toEqual('success');
  });

  it('[09] Test updating only word and similar field should pass',() => {
    element.all(by.css('.action-button.edit')).first().click();
    
    updateInput(element(by.css('.input-word')),'test-word13');
    clearInput(element(by.css('.input-category')));
    updateInput(element(by.css('.input-similar_to')),'test-similar13');
    
    // trigger submission click
    element(by.css('.btn-submit')).click();
    
    // check the success message
    expect(element(by.css('.form-result')).getText()).toEqual('success');
  });
  
  it('[10] Test updating by empty keyword and filling only category and similar field should disable submit button',() => {
    element.all(by.css('.action-button.edit')).first().click();
    
    clearInput(element(by.css('.input-word')));
    updateInput(element(by.css('.input-category')),'test-category');
    updateInput(element(by.css('.input-similar_to')),'test-similar');

    // submit button should be disabled 
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
  });

  it('[11] Test updating existing word category and similar word should pass',() => {
    element.all(by.css('.action-button.edit')).first().click();
    updateInput(element(by.css('.input-word')),element(by.css('.input-word')).getAttribute('value'));
    updateInput(element(by.css('.input-category')),'test-category');
    updateInput(element(by.css('.input-similar_to')),'test-similar');

    // trigger submission click
    element(by.css('.btn-submit')).click();

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