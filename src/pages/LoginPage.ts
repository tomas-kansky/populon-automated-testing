import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage encapsulates actions and verifications on the Populon login screen (/login).
 */
export class LoginPage extends BasePage {
  readonly path = '/login';

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly closeButton: Locator;
  readonly loginHeading: Locator;
  readonly feedbackAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"], [wicketpath="loginPanel_username"]');
    this.passwordInput = page.locator('input[name="password"], [wicketpath="loginPanel_password"]');
    this.submitButton = page.locator('button[name="submitButton"], button[type="submit"]');
    this.rememberMeCheckbox = page.locator('input[name="remember-me"]');
    this.forgotPasswordLink = page.locator('[wicketpath="loginPanel_passwordRecoveryLink"], a[href*="password-recovery"]');
    this.closeButton = page.locator('a[wicketpath="closeLink"]');
    this.loginHeading = page.locator('.login-form h5');
    // Using .first() to prevent Playwright strict-mode violations on nested alert containers
    this.feedbackAlert = page.locator('#globalFeedback .alert, #globalFeedback [role="alert"], .alert.bg-danger').first();
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.clickSubmit();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectErrorMessage(): Promise<void> {
    await expect(this.feedbackAlert).toBeVisible({ timeout: 7000 });
  }

  async toggleRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.click();
  }
}
