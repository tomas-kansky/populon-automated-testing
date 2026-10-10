import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Authentication Suite @auth', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('UI Elements: Login form renders all mandatory controls @smoke', async ({ loginPage }) => {
    await loginPage.expectLoginFormVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.closeButton).toBeVisible();
    await expect(loginPage.brandLogo).toBeVisible();
  });

  test('Negative: Invalid credentials display error alert @regression', async ({ loginPage }) => {
    await loginPage.login('unauthorized.tester@example.com', 'IncorrectPassword999!');
    await loginPage.expectErrorMessage();
  });

  test('Negative: Empty credentials submission does not authenticate @regression', async ({ loginPage, page }) => {
    await loginPage.clickSubmit();
    // User must remain on login path
    await expect(page).toHaveURL(/login/);
  });

  test('Navigation: "Unohtuiko salasana?" redirects to password recovery @regression', async ({ loginPage, page }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/password-recovery/);
  });

  test('Positive: Login with credentials from .env @smoke', async ({ loginPage, dashboardPage, page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    test.skip(
      !email || !password,
      'Skipping test: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env'
    );

    await loginPage.login(email!, password!);
    await dashboardPage.expectDashboardLoaded();

    // Počká 5 sekund na přihlášené obrazovce pro vizuální kontrolu
    await page.waitForTimeout(5000);
  });

  test('Session: Logout terminates session and redirects @smoke', async ({ loginPage, dashboardPage, page }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    test.skip(
      !email || !password,
      'Skipping test: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env'
    );

    // Login first
    await loginPage.login(email!, password!);
    await dashboardPage.expectDashboardLoaded();

    // Perform logout
    await dashboardPage.logout();
    await expect(page).toHaveURL(/login|\/$/);
  });
});
