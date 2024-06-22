import { Page, Locator } from '@playwright/test';
import { BaseScreen } from './BaseScreen.page';

export class WikiHome extends BaseScreen {
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input#searchInput');
    this.searchButton = page.locator('button.pure-button');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  

}
