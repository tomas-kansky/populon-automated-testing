import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SocietyPage encapsulates interactions with a Populon group/society card (/societycard)
 * as well as its Notifications tab, Hierarchy, List of members, and Administration wizard.
 */
export class SocietyPage extends BasePage {
  readonly defaultSocietyId = '4516';
  readonly myGroupsButton: Locator;
  readonly societyHeading: Locator;
  readonly basicInfoPill: Locator;
  readonly hierarchyPill: Locator;
  readonly listOfMembersPill: Locator;
  readonly memberInformationButton: Locator;
  readonly administrationButton: Locator;
  readonly activitiesTab: Locator;
  readonly notificationsTab: Locator;
  readonly tabPanelContent: Locator;
  readonly notificationTimelineItems: Locator;

  constructor(page: Page) {
    super(page);
    this.myGroupsButton = page.locator('[robot-test="nav:myGroups"], [wicketpath*="navLeftList_1_component_button"]').first();
    this.societyHeading = page.locator('h2').first();
    this.basicInfoPill = page.locator('[wicketpath="titleLinksPanel_navPills_0_item_link"], a:has-text("Basic info")').first();
    this.hierarchyPill = page.locator('[wicketpath="titleLinksPanel_navPills_1_item_link"], a:has-text("Hierarchy")').first();
    this.listOfMembersPill = page.locator('[wicketpath="titleLinksPanel_navPills_2_item_link"], a:has-text("List of members")').first();
    this.memberInformationButton = page.locator(
      '[wicketpath="societyCardPanel_content_informationPanel_header_headingElements_memberCardButton_link"], a:has-text("Member information")'
    ).first();
    this.administrationButton = page.locator('a:has-text("Administration"), a:has-text("Hallinta")').first();
    this.activitiesTab = page.locator(
      '[wicketpath="societyCardPanel_content_tabbedPanel_tabs-container_tabs_0_link"], .nav-tabs a:has-text("Activities"), .navbar-nav a:has-text("Activities")'
    ).first();
    this.notificationsTab = page.locator(
      '[wicketpath="societyCardPanel_content_tabbedPanel_tabs-container_tabs_1_link"], a:has-text("Notifications"), a:has-text("Tiedotteet")'
    ).last();
    this.tabPanelContent = page.locator('[wicketpath="societyCardPanel_content_tabbedPanel_panel"]').first();
    this.notificationTimelineItems = page.locator('[wicketpath*="notificationDisplayItem_title"]');
  }

  /**
   * Navigates directly to the target society page (defaults to uu_2026_BQAS_team_1, societyId=4516).
   */
  async gotoSociety(societyId: string = this.defaultSocietyId): Promise<void> {
    await this.page.goto(`/societycard?societyId=${societyId}&rootId=${societyId}`);
    await this.waitForPageLoad();
  }

  /**
   * Navigates to the group via the top navbar "My groups" dropdown if visible, falling back to direct URL.
   */
  async openGroupFromNavbar(groupName: string = 'uu_2026_BQAS_team_1'): Promise<void> {
    const groupLink = this.page.locator('a', { hasText: groupName }).first();
    if (await this.myGroupsButton.isVisible()) {
      await this.myGroupsButton.click();
      await this.page.waitForTimeout(300);
      if (await groupLink.isVisible()) {
        await groupLink.click();
        await this.waitForPageLoad();
        return;
      }
    }
    await this.gotoSociety(this.defaultSocietyId);
  }

  async expectSocietyLoaded(expectedName: string = 'uu_2026_BQAS_team_1'): Promise<void> {
    await expect(this.page).toHaveURL(/\/societycard/);
    await expect(this.societyHeading).toContainText(expectedName, { ignoreCase: true });
  }

  /**
   * Opens the Notifications tab on the society card and waits for the timeline/panel to load.
   */
  async openNotificationsTab(): Promise<void> {
    await expect(this.notificationsTab).toBeVisible();
    await this.notificationsTab.click();
    await this.waitForPageLoad();
    await expect(this.tabPanelContent).toBeVisible();
  }

  /**
   * Returns a locator for a specific notification title link in the group's Notifications tab.
   */
  getNotificationLinkByTitle(title: string): Locator {
    return this.page.locator('[wicketpath*="notificationDisplayItem_title"], a[href*="notificationcard"]', {
      hasText: title,
    }).first();
  }

  /**
   * Opens a notification detail from the group's Notifications tab by clicking its title.
   */
  async openNotificationByTitle(title: string): Promise<void> {
    const link = this.getNotificationLinkByTitle(title);
    await expect(link).toBeVisible();
    await link.click();
    await this.waitForPageLoad();
  }

  /**
   * Clicks the "Member information" button on the society card to open the current member's card.
   */
  async openMemberInformation(): Promise<void> {
    await expect(this.memberInformationButton).toBeVisible();
    await this.memberInformationButton.click();
    await this.waitForPageLoad();
  }
}
