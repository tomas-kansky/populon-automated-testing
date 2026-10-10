import { Page } from '@playwright/test';

/**
 * BasePage provides shared functionality for all Page Objects.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Waits for DOM content to be loaded.
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Returns current page title.
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Returns current page URL.
   */
  getUrl(): string {
    return this.page.url();
  }
}
