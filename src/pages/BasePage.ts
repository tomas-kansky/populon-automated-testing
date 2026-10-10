import { Page, Locator } from '@playwright/test';

/**
 * BasePage provides shared functionality and universal locators across all Populon pages.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly brandLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = page.locator('.navbar, [wicketpath="navbar"]').first();
    this.brandLogo = page.locator('a.navbar-brand, [wicketpath="navbar_container_brandName"]').first();
  }

  /**
   * Waits for DOM content to finish loading.
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
   * Returns current page URL string.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Switches interface language using the navbar language selector (FI, SV, EN, SQ).
   */
  async switchLanguage(lang: 'FI' | 'SV' | 'EN' | 'SQ'): Promise<void> {
    const langLink = this.page.locator('.navbar-nav a', { hasText: new RegExp(`^${lang}$`, 'i') }).first();
    await langLink.click();
    await this.waitForPageLoad();
  }
}
