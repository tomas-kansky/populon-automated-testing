import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Community Search & Public Navigation @search', () => {
  test('Navbar: Click "Etsi yhteisö" navigates to search page @smoke', async ({ page, searchPage }) => {
    await page.goto('/');
    const searchNav = page.locator('[robot-test="nav:searchGroups"]').first();
    await expect(searchNav).toBeVisible();
    await searchNav.click();
    await searchPage.expectSearchPageLoaded();
  });

  test('Direct URL: Direct navigation to /search loads correctly', async ({ searchPage }) => {
    await searchPage.goto();
    await searchPage.expectSearchPageLoaded();
  });
});
