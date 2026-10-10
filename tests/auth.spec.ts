import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Authentication Tests @auth', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('UI Elements: Login form renders all core elements @smoke', async ({ loginPage }) => {
    await loginPage.expectLoginFormVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).toBeVisible();
    await expect(loginPage.closeButton).toBeVisible();
    await expect(loginPage.brandLogo).toBeVisible();
  });

  test('Negative: Invalid credentials display error notification', async ({ loginPage }) => {
    await loginPage.login('invalid.user@test-populon.com', 'IncorrectPassword123!');
    await loginPage.expectErrorMessage();
  });

  test('Negative: Empty fields submission stays on login page', async ({ loginPage, page }) => {
    await loginPage.clickSubmit();
    // Validates page does not authenticate without credentials
    await expect(page).toHaveURL(/login/);
  });

  test('Navigation: "Unohtuiko salasana?" redirects to password recovery', async ({ loginPage, page }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/password-recovery/);
  });

  test('Positive: Login with valid credentials from .env @smoke', async ({ loginPage, dashboardPage }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    test.skip(
      !email || !password,
      'Skipping test: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env'
    );

    await loginPage.login(email!, password!);
    await dashboardPage.expectDashboardLoaded();
  });
});
