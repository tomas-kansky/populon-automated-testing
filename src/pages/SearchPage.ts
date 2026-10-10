import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SearchPage represents the community search screen (/search).
 */
export class SearchPage extends BasePage {
  readonly path = '/search';
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchNavbarButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[type="text"], input[type="search"]').first();
    this.searchButton = page.locator('button[type="submit"]').first();
    this.searchNavbarButton = page.locator('[robot-test="nav:searchGroups"]');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
  }

  async expectSearchPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/search/);
  }
}
