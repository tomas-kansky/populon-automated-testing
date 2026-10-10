import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Dashboard & Core Navigation @dashboard', () => {
  test('Dashboard Access: Authenticated user views dashboard content @smoke', async ({ loginPage, dashboardPage }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    test.skip(
      !email || !password,
      'Skipping test: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env'
    );

    await loginPage.goto();
    await loginPage.login(email!, password!);
    await dashboardPage.expectDashboardLoaded();
    await expect(dashboardPage.mainContent).toBeVisible();
  });

  test('Localization: Navbar switches language successfully @regression', async ({ page }) => {
    await page.goto('/login');
    const enButton = page.locator('.navbar-nav a', { hasText: /^EN$/i }).first();
    if (await enButton.isVisible()) {
      await enButton.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/en|lang=en/);
    }
  });
});
