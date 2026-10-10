import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SearchPage handles community/group discovery interactions on /search.
 */
export class SearchPage extends BasePage {
  readonly path = '/search';
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchNavbarButton: Locator;
  readonly resultsContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[type="text"], input[type="search"]').first();
    this.searchButton = page.locator('button[type="submit"], [robot-test="searchButton"]').first();
    this.searchNavbarButton = page.locator('[robot-test="nav:searchGroups"]:visible').first();
    this.resultsContainer = page.locator('.search-results, .panel, .table, .content-wrapper').first();
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
  }

  async expectSearchPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/search/);
    await expect(this.searchInput).toBeVisible();
  }

  async searchFor(query: string): Promise<void> {
    await this.searchInput.fill(query);
    if (await this.searchButton.isVisible()) {
      await this.searchButton.click();
    } else {
      await this.searchInput.press('Enter');
    }
    await this.waitForPageLoad();
  }
}
