import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ActivityAdminPage encapsulates the society Administration -> Activities section,
 * the multi-step Activity creation wizard, publishing an activity via Menu -> Publish,
 * and verifying the published activity on the Home dashboard (/usercard).
 */
export class ActivityAdminPage extends BasePage {
  readonly administrationButton: Locator;
  readonly sidebarActivitiesLink: Locator;
  readonly addActivityButton: Locator;
  readonly wizardForm: Locator;
  readonly activityNameInput: Locator;
  readonly wizardNextButton: Locator;
  readonly wizardFinishSaveButton: Locator;
  readonly homeNavLink: Locator;
  readonly userCardPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.administrationButton = page.locator('a:has-text("Administration"), a:has-text("Hallinta")').first();
    this.sidebarActivitiesLink = page.locator('[robot-test="sidebar:activities"], a:has-text("Activities")').first();
    this.addActivityButton = page.locator('[robot-test="addActivity"], button:has-text("Add")').first();
    this.wizardForm = page.locator('[wicketpath="panel_repeater_1_wizard_form"]').first();
    this.activityNameInput = page.locator('[robot-test="genericActivityWizard:step1:name"]');
    this.wizardNextButton = page.locator('[robot-test="wizard:next"]');
    this.wizardFinishSaveButton = page.locator('[robot-test="wizard:finish"], button:has-text("Save")').first();
    this.homeNavLink = page.locator('[robot-test="nav:home"], .navbar a:has-text("Home")').first();
    this.userCardPanel = page.locator('[wicketpath="userCardPanel_panel"]').first();
  }

  /**
   * Clicks the Administration button on the society page (/societycard) to enter /manage/dashboard.
   */
  async openAdministrationFromSociety(): Promise<void> {
    await expect(this.administrationButton).toBeVisible();
    await this.administrationButton.click();
    await this.waitForPageLoad();
    await expect(this.page).toHaveURL(/\/manage\//);
  }

  /**
   * Opens the Activities section from the administration left sidebar.
   */
  async openActivitiesSection(): Promise<void> {
    await expect(this.sidebarActivitiesLink).toBeVisible();
    await this.sidebarActivitiesLink.click();
    await this.waitForPageLoad();
    await expect(this.page).toHaveURL(/\/manage\/activities/);
    await expect(this.addActivityButton).toBeVisible();
  }

  /**
   * Determines the next incremental activity name (e.g. "Test (TK) 2", "Test (TK) 3")
   * by scanning existing rows in the Activities administration table.
   */
  async getNextActivityName(prefix: string = 'Test (TK)'): Promise<string> {
    const existingLinks = await this.page
      .locator('table tbody tr a[wicketpath*="cell_link"], table tbody tr a')
      .allTextContents()
      .catch(() => [] as string[]);

    let maxNumber = 0;
    const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^${escapedPrefix}\\s*(\\d+)$`, 'i');

    for (const rawText of existingLinks) {
      const text = rawText.trim();
      const match = text.match(regex);
      if (match && match[1]) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxNumber) {
          maxNumber = num;
        }
      }
    }

    return `${prefix} ${maxNumber + 1}`;
  }

  /**
   * Clicks the Add button to launch the Activity creation wizard and waits for Step 1 (Basic info).
   */
  async clickAddActivity(): Promise<void> {
    await expect(this.addActivityButton).toBeVisible();
    await this.addActivityButton.click();
    await this.waitForPageLoad();
    await expect(this.wizardForm.locator('li.current')).toContainText(/Basic info/i);
    await expect(this.activityNameInput).toBeVisible();
  }

  /**
   * Fills the Activity Name on Page 1 (Basic info) and triggers the Wicket onchange event.
   */
  async fillActivityNameOnPage1(activityName: string): Promise<void> {
    await expect(this.activityNameInput).toBeVisible();
    await this.activityNameInput.fill(activityName);
    await this.activityNameInput.dispatchEvent('change');
    await this.page.waitForTimeout(400);
  }

  /**
   * Advances to the next page in the Activity wizard using the Next (>) button
   * and verifies the active step heading.
   */
  async goToWizardStep(expectedStepTitle: string | RegExp): Promise<void> {
    await expect(this.wizardNextButton).toBeVisible();
    await expect(this.wizardNextButton).toBeEnabled();
    await this.wizardNextButton.click();
    await expect(this.wizardForm.locator('li.current')).toContainText(expectedStepTitle);
    await this.waitForPageLoad();
  }

  /**
   * Checks the checkbox next to the tested member on Page 4 (Receivers).
   */
  async selectMemberOnReceiversPage(memberNamePattern: string | RegExp = /Tomáš Kanský|Kanský/i): Promise<void> {
    const memberRow = this.wizardForm.locator('tr', { hasText: memberNamePattern }).first();
    await expect(memberRow).toBeVisible();
    const checkbox = memberRow.locator('input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible();
    if (!(await checkbox.isChecked())) {
      await checkbox.click();
      await this.page.waitForTimeout(400);
    }
    await expect(checkbox).toBeChecked();
  }

  /**
   * Verifies the Summary page and clicks Save to create the activity in UNPUBLISHED state.
   */
  async saveActivityOnSummaryPage(expectedActivityName: string): Promise<void> {
    await expect(this.wizardForm).toContainText(expectedActivityName);
    await expect(this.wizardFinishSaveButton).toBeVisible();
    await expect(this.wizardFinishSaveButton).toBeEnabled();
    await this.wizardFinishSaveButton.click();
    await this.waitForPageLoad();
    await this.page.waitForTimeout(500);

    const createdRow = this.page.locator('table tbody tr', { hasText: expectedActivityName }).first();
    await expect(createdRow).toBeVisible();
  }

  /**
   * Opens the row Menu for the given activity and clicks Publish.
   */
  async publishActivityFromRowMenu(activityName: string): Promise<void> {
    const row = this.page.locator('table tbody tr', { hasText: activityName }).first();
    await expect(row).toBeVisible();

    const menuButton = row.locator('button:has-text("Menu")').first();
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await this.page.waitForTimeout(300);

    const publishLink = row
      .locator(
        '[wicketpath*="menu_items_1_menuItem_menuItemLink"], .dropdown-menu a[role="menuitem"]:has-text("Publish")'
      )
      .first();
    await expect(publishLink).toBeVisible();
    await publishLink.click();
    await this.page.waitForTimeout(600);

    // If a Wicket confirmation modal appears, confirm it
    const confirmBtn = this.page
      .locator(
        '[wicketpath*="yesButton"], [wicketpath*="Window_dialog"] input[type="submit"][value="Yes"], .modal button:has-text("Yes"), .modal button:has-text("Publish")'
      )
      .first();
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
      await this.page.waitForTimeout(600);
    }

    await this.waitForPageLoad();
    const updatedRow = this.page.locator('table tbody tr', { hasText: activityName }).first();
    await expect(updatedRow).not.toContainText(/UNPUBLISHED/i);
    await expect(updatedRow).toContainText(/\bPUBLISHED\b/i);
  }

  /**
   * Navigates to the Home page (/usercard) via the top navbar and verifies that the published activity is displayed.
   */
  async verifyActivityOnHomePage(activityName: string): Promise<void> {
    await expect(this.homeNavLink).toBeVisible();
    await this.homeNavLink.click();
    await this.waitForPageLoad();
    await expect(this.page).toHaveURL(/\/usercard/);
    await expect(this.userCardPanel).toContainText(activityName);
  }
}
