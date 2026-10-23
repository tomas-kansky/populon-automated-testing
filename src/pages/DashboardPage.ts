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
    this.userProfileDropdown = page.locator('.navbar-right .dropdown-toggle, .navbar-nav.navbar-right li.dropdown > a, .navbar-right li:last-child > a').first();
    this.logoutButton = page.locator('a[href*="logout"], a:has-text("Log out"), a:has-text("Kirjaudu ulos")').first();
    this.mainContent = page.locator('.content-wrapper, .page-content, main, .page-header').first();
  }

  async expectDashboardLoaded(): Promise<void> {
    // Assert redirect away from /login
    await expect(this.page).not.toHaveURL(/\/login/);
    await expect(this.navbar).toBeVisible();
  }

  async logout(): Promise<void> {
    // Přímá navigace na /logout spolehlivě ukončí uživatelskou session a přesměruje na /login
    await this.page.goto('/logout', { waitUntil: 'domcontentloaded' });
  }
}
