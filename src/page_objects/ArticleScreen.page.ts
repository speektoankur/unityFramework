import { Page, Locator } from '@playwright/test';
import { BaseScreen } from './BaseScreen.page';

export class ArticleScreen extends BaseScreen{
    readonly articleTitle: Locator;
    readonly languageBtn: Locator;
    readonly languageSearchField: Locator;
    constructor(page: Page) {
        super(page);
        this.articleTitle = page.locator('span.mw-page-title-main');
        this.languageBtn = page.locator('#p-lang-btn');
        this.languageSearchField = page.getByPlaceholder('Search for a language');
      }
    
      async switchLanguage(languagetosearch: String, optionlabel: String): Promise<void> {
        await this.languageBtn.click()
        await this.languageSearchField.click();
        await this.languageSearchField.fill(String(languagetosearch));
        await this.page.getByRole('link', { name : String(optionlabel) }).first().click();
      }
}