import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { SearchPage } from '../pages/SearchPage';
import { SocietyPage } from '../pages/SocietyPage';
import { NotificationDetailPage } from '../pages/NotificationDetailPage';
import { MemberCardPage } from '../pages/MemberCardPage';
import { installDemoOverlay } from '../utils/demoOverlay';

type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  searchPage: SearchPage;
  societyPage: SocietyPage;
  notificationDetailPage: NotificationDetailPage;
  memberCardPage: MemberCardPage;
};

export const test = base.extend<AppFixtures>({
  page: async ({ page }, use, testInfo) => {
    await installDemoOverlay(page, testInfo.title);
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },
  societyPage: async ({ page }, use) => {
    const societyPage = new SocietyPage(page);
    await use(societyPage);
  },
  notificationDetailPage: async ({ page }, use) => {
    const notificationDetailPage = new NotificationDetailPage(page);
    await use(notificationDetailPage);
  },
  memberCardPage: async ({ page }, use) => {
    const memberCardPage = new MemberCardPage(page);
    await use(memberCardPage);
  },
});

export { expect } from '@playwright/test';
export { demoStep } from '../utils/demoOverlay';
