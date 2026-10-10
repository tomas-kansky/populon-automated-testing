import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage encapsulates interactions and verifications on /login.
 */
export class LoginPage extends BasePage {
  readonly path = '/login';

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly closeButton: Locator;
  readonly loginHeading: Locator;
  readonly feedbackAlert: Locator;
  readonly brandLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[name="submitButton"], button[type="submit"]');
    this.rememberMeCheckbox = page.locator('input[name="remember-me"]');
    this.forgotPasswordLink = page.locator('[wicketpath="loginPanel_passwordRecoveryLink"], a[href*="password-recovery"]');
    this.closeButton = page.locator('a[wicketpath="closeLink"]');
    this.loginHeading = page.locator('.login-form h5');
    this.feedbackAlert = page.locator('#globalFeedback, .feedback, .alert');
    this.brandLogo = page.locator('a[wicketpath="navbar_container_brandName"], .navbar-brand');
  }

  /**
   * Navigates directly to the login page.
   */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
  }

  /**
   * Fills username and password fields without clicking submit.
   */
  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  /**
   * Clicks the submit/login button.
   */
  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Complete login sequence: fills credentials and clicks submit.
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.clickSubmit();
  }

  /**
   * Assert all expected login controls are visible.
   */
  async expectLoginFormVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  /**
   * Assert that an error alert / feedback panel is displayed upon invalid login.
   */
  async expectErrorMessage(): Promise<void> {
    await expect(this.feedbackAlert).toBeVisible({ timeout: 5000 });
  }

  /**
   * Toggles the Remember Me checkbox.
   */
  async toggleRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.click();
  }
}
