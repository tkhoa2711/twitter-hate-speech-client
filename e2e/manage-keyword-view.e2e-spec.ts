import { browser, by, element } from 'protractor';
 
describe('Manage Keyword Page - View', () => {
  
  beforeEach(() => {
    browser.get('/admin');
  });
 
  it('[01] should open manage keyword page',() => {
    expect(element(by.css('.inner-container h1')).getText()).toContain('Manage Keyword');
  });

  it('[02] should display list of keyword',() => {
    var els = element.all(by.css('.mat-table .mat-row'));
    expect(els.count()).toBeGreaterThan(1);
  });
  
});