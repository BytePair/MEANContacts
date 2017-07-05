import { MEANContactsPage } from './app.po';

describe('meancontacts App', () => {
  let page: MEANContactsPage;

  beforeEach(() => {
    page = new MEANContactsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
