import { browser, by, element } from 'protractor';
 
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

  

});