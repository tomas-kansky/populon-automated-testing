import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * MemberCardPage encapsulates the member profile view and edit form within a society (/membercard?memberId=...).
 */
export class MemberCardPage extends BasePage {
  readonly defaultMemberId = '24096';
  readonly headingTitle: Locator;
  readonly editButton: Locator;
  readonly leaveButton: Locator;
  readonly emailLink: Locator;
  readonly phoneLink: Locator;
  readonly streetAddressInput: Locator;
  readonly zipCodeInput: Locator;
  readonly cityInput: Locator;
  readonly countrySelect: Locator;
  readonly allowAttendeeListCheckbox: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly feedbackPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.headingTitle = page.locator(
      '[wicketpath="memberCardPanel_content_informationPanel_header_title"], [wicketpath="memberCardPanel_content_header_title"], h5:has-text("Member information")'
    ).first();
    this.editButton = page.locator(
      '[wicketpath="memberCardPanel_content_informationPanel_header_headingElements_editLink"], a:has-text("Edit")'
    ).first();
    this.leaveButton = page.locator(
      '[wicketpath="memberCardPanel_content_informationPanel_header_headingElements_leaveLink"], a:has-text("Leave")'
    ).first();
    this.emailLink = page.locator('[wicketpath="memberCardPanel_content_informationPanel_cinfo_emails_view_1_link"]').first();
    this.phoneLink = page.locator('[wicketpath="memberCardPanel_content_informationPanel_cinfo_phones_view_1_link"]').first();

    // Edit form fields
    this.streetAddressInput = page.locator(
      '[robot-test="memberForm:address.streetAddress"], [wicketpath="memberCardPanel_content_content_memberDetailsForm_content_formContent_6_input_field"]'
    ).first();
    this.zipCodeInput = page.locator(
      '[wicketpath="memberCardPanel_content_content_memberDetailsForm_content_formContent_7_input_field"]'
    ).first();
    this.cityInput = page.locator(
      '[wicketpath="memberCardPanel_content_content_memberDetailsForm_content_formContent_8_input_field"]'
    ).first();
    this.countrySelect = page.locator(
      '[robot-test="memberForm:address.country"], [wicketpath="memberCardPanel_content_content_memberDetailsForm_content_formContent_9_input_field"]'
    ).first();
    this.allowAttendeeListCheckbox = page.locator(
      '[wicketpath="memberCardPanel_content_content_memberDetailsForm_content_formContent_10_field"]'
    ).first();
    this.saveButton = page.locator(
      '[wicketpath="memberCardPanel_content_content_memberDetailsForm_buttonContainer_submitButton"], button:has-text("Save")'
    ).first();
    this.cancelButton = page.locator(
      '[wicketpath="memberCardPanel_content_content_memberDetailsForm_buttonContainer_cancelButton"], button:has-text("Cancel")'
    ).first();
    this.feedbackPanel = page.locator('#globalFeedback').first();
  }

  async gotoMemberCard(memberId: string = this.defaultMemberId): Promise<void> {
    await this.page.goto(`/membercard?memberId=${memberId}`);
    await this.waitForPageLoad();
  }

  async expectMemberCardLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/membercard/);
    await expect(this.headingTitle).toBeVisible();
    await expect(this.editButton).toBeVisible();
  }

  async openEditForm(): Promise<void> {
    await expect(this.editButton).toBeVisible();
    await this.editButton.click();
    await this.waitForPageLoad();
    await expect(this.streetAddressInput).toBeVisible();
  }

  async updateAddressDetails(data: {
    streetAddress: string;
    zipCode: string;
    city: string;
    allowAttendeeList?: boolean;
  }): Promise<void> {
    await this.streetAddressInput.fill(data.streetAddress);
    await this.zipCodeInput.fill(data.zipCode);
    await this.cityInput.fill(data.city);
    if (data.allowAttendeeList !== undefined) {
      const isChecked = await this.allowAttendeeListCheckbox.isChecked();
      if (data.allowAttendeeList !== isChecked) {
        await this.allowAttendeeListCheckbox.click();
      }
    }
    await this.saveButton.click();
    await this.waitForPageLoad();
  }

  async expectSaveSuccessAlert(): Promise<void> {
    await expect(this.feedbackPanel).toContainText(/Data saved|Tiedot tallennettu/i, { timeout: 7000 });
  }

  async expectRestrictedAccessForAnonymous(): Promise<void> {
    const bodyText = await this.page.locator('body').innerText();
    expect(
      /restricted access|don't have permission|do not have permission|Sinulla ei ole oikeuksia/i.test(bodyText)
    ).toBeTruthy();
  }
}
