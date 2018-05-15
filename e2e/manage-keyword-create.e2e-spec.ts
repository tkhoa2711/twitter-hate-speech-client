import { browser, by, element } from 'protractor';
 
describe('Manage Keyword - Create', () => {
  
  beforeEach(() => {
    browser.get('/admin');
  });
   
  it('[01] insert button should work',() => {
    // ensure the form does not show before insert button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
    // trigger the insert button click
    element(by.css('.action-button.add')).click();
    // ensure the form is showing after insert button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeTruthy('The keyword form should appear now');
    // ensure the title is insert
    expect(element(by.css('.hateword-form-container h2')).getText()).toContain('insert keyword');
  });
  it('[02] cancel button should close form',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.btn-cancel')).click();
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
  });

  it('[03] empty data submission should not be allowed',() => {
    // send empty input
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('');
    element(by.css('.input-category')).sendKeys('');
    element(by.css('.input-similar_to')).sendKeys('');

    // submit button should be disabled 
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
    // expect(element(by.css('.btn-submit')).isPresent()).toBeTruthy('The submit button should be disabled now');
  });

  

});