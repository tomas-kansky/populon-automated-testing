import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Search Communities Suite @search', () => {
  test('Navbar Navigation: Click "Etsi yhteisö" redirects to /search @smoke', async ({ page, searchPage }) => {
    await page.goto('/login');
    // Using :visible to select the desktop vs mobile button depending on viewport
    const searchNav = page.locator('[robot-test="nav:searchGroups"]:visible').first();
    await expect(searchNav).toBeVisible();
    await searchNav.click();
    await searchPage.expectSearchPageLoaded();
  });

  test('Direct URL: Navigation directly to /search loads search controls @regression', async ({ searchPage }) => {
    await searchPage.goto();
    await searchPage.expectSearchPageLoaded();
    await expect(searchPage.searchInput).toBeEditable();
  });

  test('Query: Submitting a search term executes query @regression', async ({ searchPage }) => {
    await searchPage.goto();
    await searchPage.expectSearchPageLoaded();
    await searchPage.searchFor('Test');
    await expect(searchPage.resultsContainer).toBeVisible();
  });
});
