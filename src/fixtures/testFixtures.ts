import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { SearchPage } from '../pages/SearchPage';

type AppFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  searchPage: SearchPage;
};

export const test = base.extend<AppFixtures>({
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
});

export { expect } from '@playwright/test';
