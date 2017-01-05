import { CafeClientPage } from './app.po';

describe('cafe-client App', function() {
  let page: CafeClientPage;

  beforeEach(() => {
    page = new CafeClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
