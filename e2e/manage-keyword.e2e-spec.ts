import { browser, by, element } from 'protractor';
 
describe('Manage Keyword Page', () => {
  
  beforeEach(() => {
    browser.get('/admin');
  });
 
  it('[General] should open manage keyword page',() => {
    expect(element(by.css('.inner-container h1')).getText()).toContain('Manage Keyword');
  });

  it('[View] should display list of keyword',() => {
    var els = element.all(by.css('.mat-table .mat-row'));
    expect(els.count()).toBeGreaterThan(1);
  });
   
  it('[Create] insert button should work',() => {
    // ensure the form does not show before insert button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
    // trigger the insert button click
    element(by.css('.action-button.add')).click();
    // ensure the form is showing after insert button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeTruthy('The keyword form should appear now');
    // ensure the title is insert
    expect(element(by.css('.hateword-form-container h2')).getText()).toContain('insert keyword');
  });

  it('[Create] empty data submission should not be allowed',() => {
    // send empty input
    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('');
    element(by.css('.input-category')).sendKeys('');
    element(by.css('.input-similar_to')).sendKeys('');

    // submit button should be disabled 
    expect(element(by.css('.btn-submit')).getAttribute('disabled')).toEqual('true');
    // expect(element(by.css('.btn-submit')).isPresent()).toBeTruthy('The submit button should be disabled now');
  });

  it('[Create] cancel button should close form',() => {
    element(by.css('.action-button.add')).click();
    element(by.css('.btn-cancel')).click();
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
  });


  it('[Update] edit button should work',() => {
    // ensure the form does not show before edit button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
    // trigger the edit button click
    element.all(by.css('.action-button.edit')).first().click();
    // ensure the form is showing after edit button is clicked
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeTruthy('The keyword form should appear now');
    // ensure the title is edit
    expect(element(by.css('.hateword-form-container h2')).getText()).toContain('update keyword');
  });

  it('[Update] edit should preload values',() => {
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

  it('[Update] cancel button should close form',() => {
    element.all(by.css('.action-button.edit')).first().click();
    // trigger the close btn
    element(by.css('.btn-cancel')).click();
    expect(element(by.css('.hateword-form-container.show')).isPresent()).toBeFalsy("The keyword form shouldn't appear right now ");
  });

});