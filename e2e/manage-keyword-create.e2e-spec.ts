import { browser, by, element } from 'protractor';
 
describe('Manage Keyword - Create', () => {
  
  beforeEach(() => {
    browser.get('/admin');
  });
   
  it('[01] insert button should show insert keyword form',() => {
    // ensure the form does not show before insert button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
    // trigger the insert button click
    element(by.css('.action-button.add')).click();
    // ensure the form is showing after insert button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeTruthy('The keyword form should appear now');
    // ensure the title is insert
    expect(element(by.css('.hateword-form-container h2')).getText()).toContain('insert keyword');
  });
  
  it('[02] cancel button should close insert keyword form',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.btn-cancel')).click();
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
  });

  it('[03] empty keyword submission should not be allowed',() => {
    // send empty input
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('');
    element(by.css('.input-category')).sendKeys('');
    element(by.css('.input-similar_to')).sendKeys('');

    // submit button should be disabled 
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
  });

  it('[04] Test submitting only word parameter should pass',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('test-word');
    element(by.css('.input-category')).sendKeys('');
    element(by.css('.input-similar_to')).sendKeys('');

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.form-result')).getText()).toEqual('success');
  });

  it('[05] Test submitting only category should disable submit button',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('');
    element(by.css('.input-category')).sendKeys('test-category');
    element(by.css('.input-similar_to')).sendKeys('');

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
  });

  it('[06] Test submitting only similar word should disable submit button',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('');
    element(by.css('.input-category')).sendKeys('');
    element(by.css('.input-similar_to')).sendKeys('test-similar');

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
  });

  it('[07] Test submitting only word and category should pass',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('test-word2');
    element(by.css('.input-category')).sendKeys('test-category2');
    element(by.css('.input-similar_to')).clear();

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.form-result')).getText()).toEqual('success');
  });

  it('[08] Test submitting only word and similar word should pass',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('test-word3');
    element(by.css('.input-category')).clear();
    element(by.css('.input-similar_to')).sendKeys('test-similar3');

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.form-result')).getText()).toEqual('success');
  });

  it('[09] Test submitting only category and similar word should disable submit button',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).clear();
    element(by.css('.input-category')).sendKeys('test-category');
    element(by.css('.input-similar_to')).sendKeys('test-similar');

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
  });

  it('[10] Test submitting existing word should pass',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('existingword');
    element(by.css('.input-category')).sendKeys('test-category');
    element(by.css('.input-similar_to')).sendKeys('test-similar');

    // trigger submission click
    element(by.css('.btn-submit')).click();

    // check the success message
    expect(element(by.css('.form-result')).getText()).toEqual('success');
  });

});