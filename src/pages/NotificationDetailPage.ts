import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * NotificationDetailPage encapsulates the notification detail view (/notificationcard?notificationId=...).
 */
export class NotificationDetailPage extends BasePage {
  readonly defaultNotificationId = '7447';
  readonly pageContent: Locator;
  readonly breadcrumbs: Locator;
  readonly feedbackAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.pageContent = page.locator('.content-wrapper, body').first();
    this.breadcrumbs = page.locator('[wicketpath*="breadcrumbs"]').first();
    this.feedbackAlert = page.locator('#globalFeedback, .alert').first();
  }

  async gotoNotification(notificationId: string = this.defaultNotificationId): Promise<void> {
    await this.page.goto(`/notificationcard?notificationId=${notificationId}`);
    await this.waitForPageLoad();
  }

  /**
   * Verifies that the notification detail page displays the expected title, description, and body text.
   */
  async expectNotificationDetails(expected: {
    title: string;
    description?: string;
    text?: string;
    groupName?: string;
  }): Promise<void> {
    await expect(this.page).toHaveURL(/\/notificationcard/);
    await expect(this.pageContent).toContainText(expected.title);
    if (expected.groupName) {
      await expect(this.pageContent).toContainText(expected.groupName, { ignoreCase: true });
    }
    if (expected.description) {
      await expect(this.pageContent).toContainText(expected.description);
    }
    if (expected.text) {
      await expect(this.pageContent).toContainText(expected.text);
    }
  }

  /**
   * Verifies that an unauthorized or anonymous user is denied access to the notification detail
   * (either via restricted access alert or login prompt, and the notification body is not rendered).
   */
  async expectAccessDenied(secretTitleOrText?: string): Promise<void> {
    const bodyText = await this.page.locator('body').innerText();
    const isDenied =
      /do not have permission|don't have permission|Sinulla ei ole oikeuksia|restricted access|Bad request|Error/i.test(
        bodyText
      );
    expect(isDenied).toBeTruthy();

    if (secretTitleOrText) {
      await expect(this.page.locator('body')).not.toContainText(secretTitleOrText);
    }
  }
}
