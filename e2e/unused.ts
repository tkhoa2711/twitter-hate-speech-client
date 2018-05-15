import { AppPage } from './app.po';

describe('hate-speech-detector-frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display application name', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Twitter Hate Speech Detector');
  });
});
