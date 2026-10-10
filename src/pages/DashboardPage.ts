import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DashboardPage represents the authenticated area of Populon.
 */
export class DashboardPage extends BasePage {
  readonly userProfileDropdown: Locator;
  readonly logoutButton: Locator;
  readonly mainContent: Locator;

  constructor(page: Page) {
    super(page);
    this.userProfileDropdown = page.locator('[data-toggle="dropdown"], .user-profile, .navbar-nav li.dropdown').last();
    this.logoutButton = page.locator('a[href*="logout"], button[name*="logout"]');
    this.mainContent = page.locator('.content-wrapper, .page-content, main').first();
  }

  async expectDashboardLoaded(): Promise<void> {
    // Assert redirect away from /login
    await expect(this.page).not.toHaveURL(/\/login/);
    await expect(this.navbar).toBeVisible();
  }

  async logout(): Promise<void> {
    if (await this.logoutButton.isVisible()) {
      await this.logoutButton.click();
    } else if (await this.userProfileDropdown.isVisible()) {
      await this.userProfileDropdown.click();
      await this.logoutButton.click();
    } else {
      // Fallback direct logout URL
      await this.page.goto('/logout');
    }
    await this.waitForPageLoad();
  }
}
