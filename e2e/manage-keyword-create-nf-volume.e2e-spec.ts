import { browser, by, element } from 'protractor';
 
describe('Manage Keyword - Create - Non Functional (high volume)', () => {
  
  beforeEach(() => {
    browser.get('/admin');
  });

  it('[01] Test response time for create keyword (high volume)',() => {
    var startTime;
    var endTime;
    var elapsedTime;

    element(by.css('.action-button.add')).click();
    element(by.css('.input-word')).sendKeys('YG8m7zbEKKlBciJjPx664ZdZ1um1wVNtVIpMldziVrRdNVZhOy1UFsMYhVHzL6ko02J1WNR3AKVrNDfF8wYQMuluugmTx4yRnsKjB3mra5nzKoDNuKBjyn8HvMhEHv4Uz9ZCo8xNQ3bqu4Ulj4w18Lj5YLzbp3Sl64K7AHTlM6CwL66FqD0OdbBb8vT5R3AJB3MrX93zidnmY1vbPKCfPEusHCE8mo1rWZKO0TynjmrXis3Kj5BPi5mpWAiHSyrdNRD4vkeGhclSECbu6WqiLvhhNmeziouNZynqUvDwuse2AWWxAk0XHHTRakjbsi4Kw5G7x2Hgim2fnzvdxdePboZlKpEXAxNCWxT1UUOJa7VlTQbWaQ2vKt1nY6M5i37fh4kDChRjQs1G3vkKXchxYLV8hi8GNa2DHy3XLVHH3zdyKkFwoQvh3qpB5tSRcGDgBlhuViwXfJrYTF9Pw1UCnpHXv7xteqCRoYa05ka5oK8HxsR0nT4I');
    element(by.css('.input-category')).sendKeys('YG8m7zbEKKlBciJjPx664ZdZ1um1wVNtVIpMldziVrRdNVZhOy1UFsMYhVHzL6ko02J1WNR3AKVrNDfF8wYQMuluugmTx4yRnsKjB3mra5nzKoDNuKBjyn8HvMhEHv4Uz9ZCo8xNQ3bqu4Ulj4w18Lj5YLzbp3Sl64K7AHTlM6CwL66FqD0OdbBb8vT5R3AJB3MrX93zidnmY1vbPKCfPEusHCE8mo1rWZKO0TynjmrXis3Kj5BPi5mpWAiHSyrdNRD4vkeGhclSECbu6WqiLvhhNmeziouNZynqUvDwuse2AWWxAk0XHHTRakjbsi4Kw5G7x2Hgim2fnzvdxdePboZlKpEXAxNCWxT1UUOJa7VlTQbWaQ2vKt1nY6M5i37fh4kDChRjQs1G3vkKXchxYLV8hi8GNa2DHy3XLVHH3zdyKkFwoQvh3qpB5tSRcGDgBlhuViwXfJrYTF9Pw1UCnpHXv7xteqCRoYa05ka5oK8HxsR0nT4I');
    element(by.css('.input-similar_to')).sendKeys('YG8m7zbEKKlBciJjPx664ZdZ1um1wVNtVIpMldziVrRdNVZhOy1UFsMYhVHzL6ko02J1WNR3AKVrNDfF8wYQMuluugmTx4yRnsKjB3mra5nzKoDNuKBjyn8HvMhEHv4Uz9ZCo8xNQ3bqu4Ulj4w18Lj5YLzbp3Sl64K7AHTlM6CwL66FqD0OdbBb8vT5R3AJB3MrX93zidnmY1vbPKCfPEusHCE8mo1rWZKO0TynjmrXis3Kj5BPi5mpWAiHSyrdNRD4vkeGhclSECbu6WqiLvhhNmeziouNZynqUvDwuse2AWWxAk0XHHTRakjbsi4Kw5G7x2Hgim2fnzvdxdePboZlKpEXAxNCWxT1UUOJa7VlTQbWaQ2vKt1nY6M5i37fh4kDChRjQs1G3vkKXchxYLV8hi8GNa2DHy3XLVHH3zdyKkFwoQvh3qpB5tSRcGDgBlhuViwXfJrYTF9Pw1UCnpHXv7xteqCRoYa05ka5oK8HxsR0nT4I');

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