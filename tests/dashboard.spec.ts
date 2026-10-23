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

  test('Localization: Navbar switches language across FI, SV, EN, SQ @regression', async ({ page, loginPage }) => {
    await loginPage.goto();

    // 1. Switch to FI (Finnish)
    await loginPage.switchLanguage('FI');
    await expect(page.locator('button[type="submit"]')).toHaveText(/Kirjaudu/i);

    // 2. Switch to SV (Swedish)
    await loginPage.switchLanguage('SV');
    await expect(page.locator('button[type="submit"]')).toHaveText(/Logga in/i);

    // 3. Switch to SQ (Albanian)
    await loginPage.switchLanguage('SQ');
    await expect(page.locator('button[type="submit"]')).toHaveText(/Hyni/i);

    // 4. Switch back to EN (English)
    await loginPage.switchLanguage('EN');
    await expect(page.locator('button[type="submit"]')).toHaveText(/Log in/i);
  });

  test('Localization: Authenticated session forces English and omits language switcher @regression', async ({
    loginPage,
    dashboardPage,
    page,
  }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    test.skip(!email || !password, 'Skipping: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env');

    // Select Finnish on login page
    await loginPage.goto();
    await loginPage.switchLanguage('FI');
    await expect(page.locator('button[type="submit"]')).toHaveText(/Kirjaudu/i);

    // Login
    await loginPage.login(email!, password!);
    await dashboardPage.expectDashboardLoaded();

    // Verification of BUG-002: Language switcher disappeared from navbar
    const langSwitchers = page.locator('.navbar-nav a', { hasText: /^(FI|SV|EN|SQ)$/i });
    await expect(langSwitchers).toHaveCount(0);

    // Interface forced to English
    await expect(page.locator('.navbar-inverse')).toContainText(/Home|My groups|Search groups/);
  });
});
