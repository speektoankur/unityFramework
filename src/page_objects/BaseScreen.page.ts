import { Page, Locator, expect } from '@playwright/test';

export class BaseScreen {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async toBeVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
