import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DashboardPage represents the internal authenticated area.
 */
export class DashboardPage extends BasePage {
  readonly navbar: Locator;
  readonly brandLogo: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = page.locator('.navbar, [wicketpath="navbar"]');
    this.brandLogo = page.locator('.navbar-brand');
    this.logoutLink = page.locator('a[href*="logout"]');
  }

  /**
   * Asserts user was redirected away from login and dashboard elements are displayed.
   */
  async expectDashboardLoaded(): Promise<void> {
    await expect(this.page).not.toHaveURL(/\/login/);
    await expect(this.navbar).toBeVisible();
  }
}
