import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { WikiHome } from '../src/page_objects/WikiHome.page';
import { ArticleScreen } from '../src/page_objects/ArticleScreen.page';
import { searchdata, searches, languagetestdata } from '../test-data/search-data.json';


  let context: BrowserContext;
  let page: Page;
  let wikiHome: WikiHome;
  let articleScreen: ArticleScreen;

  test.beforeEach(async () => {
    const browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://www.wikipedia.org/");
    wikiHome = new WikiHome(page);
    articleScreen = new ArticleScreen(page);
  })

  searchdata.forEach((article) => {
    test(`Validate wiki article title match : ${article}`, async () => {
      await wikiHome.search(article);
      await page.waitForLoadState();
      await expect(articleScreen.articleTitle).toHaveText(article);
    })
  })

  searches.forEach((article) => {
    test(`Validate wiki article navigation from article ${article.articlename}`, async () => {
      await wikiHome.search(article.articlename);
      await page.waitForLoadState();
      await expect(articleScreen.articleTitle).toHaveText(article.articlename);
      await page.locator(article.linktext).first().click();
      await page.waitForLoadState();
      await expect(articleScreen.articleTitle).toHaveText(article.expectedtitle);
    })
  })
  
  languagetestdata.forEach((article) => {
    test(`Language switch for ${article.articlename} to ${article.languge} Language`, async() => {
      await wikiHome.search(article.articlename);
      await page.waitForLoadState();
      await articleScreen.languageBtn.click()
      await articleScreen.switchLanguage(article.languge, article.optiontexttoclick);
      await expect(articleScreen.articleTitle).toHaveText(article.labeltoverify)
    })
  })

  test(`Verify Invalid data search result info on search results`, async() => {
    await wikiHome.search("Hu&*#@#$%234");
    await page.waitForLoadState();
    await expect(page.locator('.mw-search-results-info>p>i')).toHaveText(`The page "Hu&*" does not exist. You can create a draft and submit it for review or request that a redirect be created, but consider checking the search results below to see whether the topic is already covered.`)
  })

  test.afterEach(async () => {
    await page.goto("https://www.wikipedia.org/");
  })
