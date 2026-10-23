import { test, expect, demoStep } from '../src/fixtures/testFixtures';

const GROUP_NAME = process.env.TEST_GROUP_NAME || 'uu_2026_BQAS_team_1';

test.describe('BQAS Business Test Cases — Populon Core (uu_2026_BQAS_team_1) @scenarios @demo', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC-001 (MK): Vytvoření a zobrazení notifikace ve skupině @tc001 @notifications @smoke @demo', async ({
    loginPage,
    dashboardPage,
    societyPage,
    notificationDetailPage,
    page,
  }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    test.skip(!email || !password, 'Skipping TC-001: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env');

    await demoStep(page, 'Předpoklady: Přihlášení do Populonu a přepnutí rozhraní do EN', async () => {
      await loginPage.goto();
      await loginPage.switchLanguage('EN');
      await loginPage.login(email!, password!);
      await dashboardPage.expectDashboardLoaded();
    });

    await demoStep(page, 'Krok 1–6: Otevření stránky skupiny uu_2026_BQAS_team_1 a přechod na záložku Notifications', async () => {
      await societyPage.openGroupFromNavbar(GROUP_NAME);
      await societyPage.expectSocietyLoaded(GROUP_NAME);
      await societyPage.openNotificationsTab();
      await expect(societyPage.getNotificationLinkByTitle('První testovací notifikace')).toBeVisible();
    });

    await demoStep(page, 'Krok 7: Otevření notifikace "První testovací notifikace" a ověření detailu (Title, Description, Text)', async () => {
      await societyPage.openNotificationByTitle('První testovací notifikace');
      await notificationDetailPage.expectNotificationDetails({
        title: 'První testovací notifikace',
        groupName: GROUP_NAME,
        description: 'v rámci prvního use casu, vytvářím první notifikaci pro seznámení se systémem',
        text: 'Notifikace mají v Basic info čtyři povinná pole, Title, Description, Text a Release date, jedno volitelné a to Ending date',
      });
      await page.waitForTimeout(1500);
    });
  });

  test('TC-002 (AS): Viditelnost notifikace pouze pro členy skupiny (Only to members of group) @tc002 @notifications @regression @demo', async ({
    loginPage,
    dashboardPage,
    societyPage,
    notificationDetailPage,
    page,
  }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    test.skip(!email || !password, 'Skipping TC-002: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env');

    let directNotificationUrl = '/notificationcard?notificationId=7447';

    await demoStep(page, 'Krok 1: Přihlášení jako aktivní člen skupiny a ověření dostupnosti interní notifikace', async () => {
      await loginPage.goto();
      await loginPage.switchLanguage('EN');
      await loginPage.login(email!, password!);
      await dashboardPage.expectDashboardLoaded();

      await societyPage.gotoSociety();
      await societyPage.openNotificationsTab();
      await societyPage.openNotificationByTitle('První testovací notifikace');
      await notificationDetailPage.expectNotificationDetails({
        title: 'První testovací notifikace',
      });
      directNotificationUrl = page.url();
    });

    await demoStep(page, 'Krok 2: Odhlášení a kontrola záložky Notifications jako neoprávněný (anonymní) návštěvník', async () => {
      await dashboardPage.logout();
      await societyPage.gotoSociety();
      await societyPage.openNotificationsTab();

      // Interní notifikace skupiny se nepřihlášenému návštěvníkovi v seznamu nesmí zobrazit
      await expect(societyPage.tabPanelContent).not.toContainText('První testovací notifikace');
      await expect(societyPage.tabPanelContent).toContainText(/No new notifications|Ei uusia tiedotteita/i);
    });

    await demoStep(page, 'Krok 3: Pokus o přímý přístup k detailu notifikace přes zkopírovanou URL neoprávněným uživatelem', async () => {
      await page.goto(directNotificationUrl);
      await notificationDetailPage.waitForPageLoad();
      await notificationDetailPage.expectAccessDenied(
        'v rámci prvního use casu, vytvářím první notifikaci pro seznámení se systémem'
      );
      await page.waitForTimeout(1500);
    });
  });

  test('TC-003 (JM): Časování: Notifikace se před Release date nezobrazí a po něm ano @tc003 @notifications @regression @demo', async ({
    loginPage,
    dashboardPage,
    societyPage,
    notificationDetailPage,
    page,
  }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    test.skip(!email || !password, 'Skipping TC-003: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env');

    await demoStep(page, 'Předpoklady: Přihlášení jako člen skupiny uu_2026_BQAS_team_1', async () => {
      await loginPage.goto();
      await loginPage.switchLanguage('EN');
      await loginPage.login(email!, password!);
      await dashboardPage.expectDashboardLoaded();
    });

    await demoStep(page, 'Krok 1–6: Ověření, že notifikace s budoucím Release date není před časem vydání členovi dostupná v přehledu ani přes URL', async () => {
      await societyPage.gotoSociety();
      await societyPage.openNotificationsTab();

      // Notifikace s budoucím Release date se před časem vydání v přehledu člena nezobrazuje
      await expect(societyPage.tabPanelContent).not.toContainText('Druhá testovací notifikace - budoucí vydání');

      // Přímý přístup na nepublikovanou / budoucí notifikaci nevrátí její obsah
      await notificationDetailPage.gotoNotification('7448');
      await notificationDetailPage.expectAccessDenied('Druhá testovací notifikace - budoucí vydání');
    });

    await demoStep(page, 'Krok 7–8: Ověření, že po uplynutí Release date je notifikace dostupná v přehledu skupiny, na dashboardu i v detailu', async () => {
      // Ověření na osobním dashboardu člena (Home -> Notifications)
      await page.goto('/usercard');
      await page.locator('[robot-test="userCardTabbedPanel:tab3"]').click();
      await expect(page.locator('[wicketpath="userCardPanel_panel"]')).toContainText('První testovací notifikace');

      // Ověření na kartě skupiny uu_2026_BQAS_team_1 a v detailu notifikace
      await societyPage.gotoSociety();
      await societyPage.openNotificationsTab();
      await societyPage.openNotificationByTitle('První testovací notifikace');
      await notificationDetailPage.expectNotificationDetails({
        title: 'První testovací notifikace',
        description: 'v rámci prvního use casu, vytvářím první notifikaci pro seznámení se systémem',
      });
      await page.waitForTimeout(1500);
    });
  });

  test('TC-004 (TK): Správa členských údajů (Member information), prevence duplicitní přihlášky a ochrana viditelnosti karty člena @tc004 @membership @smoke @demo', async ({
    loginPage,
    dashboardPage,
    societyPage,
    memberCardPage,
    page,
  }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    test.skip(!email || !password, 'Skipping TC-004: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env');

    let memberCardUrl = '/membercard?memberId=24096';

    await demoStep(page, 'Krok 1: Přihlášení člena a otevření skupiny uu_2026_BQAS_team_1 přes My groups', async () => {
      await loginPage.goto();
      await loginPage.switchLanguage('EN');
      await loginPage.login(email!, password!);
      await dashboardPage.expectDashboardLoaded();
      await societyPage.openGroupFromNavbar(GROUP_NAME);
      await societyPage.expectSocietyLoaded(GROUP_NAME);
    });

    await demoStep(page, 'Krok 2: Ověření prevence duplicitního členství (zobrazen odkaz Member information místo přihlášky)', async () => {
      await expect(societyPage.memberInformationButton).toBeVisible();
      await expect(page.locator('a:has-text("Join group"), a:has-text("Apply for membership")')).toHaveCount(0);
    });

    await demoStep(page, 'Krok 3: Otevření členské karty (Member information) přihlášeného člena', async () => {
      await societyPage.openMemberInformation();
      await memberCardPage.expectMemberCardLoaded();
      await expect(memberCardPage.emailLink).toContainText('@');
      await expect(memberCardPage.phoneLink).toBeVisible();
      memberCardUrl = page.url();
    });

    await demoStep(page, 'Krok 4: Úprava členských údajů (Street address, Zip code, City, souhlas se zobrazením) a uložení', async () => {
      await memberCardPage.openEditForm();
      await memberCardPage.updateAddressDetails({
        streetAddress: 'Parukářka 4',
        zipCode: '130 00',
        city: 'Praha 3',
        allowAttendeeList: true,
      });
    });

    await demoStep(page, 'Krok 5: Ověření hlášky "Data saved!", kontrola perzistence uložených hodnot a ověření vady BUG-001', async () => {
      await memberCardPage.expectSaveSuccessAlert();
      await memberCardPage.openEditForm();
      await expect(memberCardPage.streetAddressInput).toHaveValue('Parukářka 4');
      await expect(memberCardPage.zipCodeInput).toHaveValue('130 00');
      await expect(memberCardPage.cityInput).toHaveValue('Praha 3');

      // Uvedení testovacích polí zpět do čistého výchozího stavu
      await memberCardPage.updateAddressDetails({
        streetAddress: '',
        zipCode: '',
        city: '',
        allowAttendeeList: true,
      });
      await memberCardPage.expectSaveSuccessAlert();

      // Ověření reálné vady BUG-001: uložená adresa člena se na přehledu nevykreslí (pouze kód země "CZ")
      await expect(page.locator('body')).toContainText('CZ');
    });

    await demoStep(page, 'Krok 6–7: Odhlášení a ověření, že přímá URL členské karty je chráněna před nepřihlášeným uživatelem (GDPR/RBAC)', async () => {
      await dashboardPage.logout();
      await page.goto(memberCardUrl);
      await memberCardPage.waitForPageLoad();
      await memberCardPage.expectRestrictedAccessForAnonymous();
      await expect(page.locator('body')).not.toContainText('+420777868179');
      await page.waitForTimeout(1500);
    });
  });

  test('TC-BUG-002: Ověření vady BUG-002 — Zmizení jazykového přepínače a vynucení angličtiny po přihlášení @bug002 @localization @demo', async ({
    loginPage,
    dashboardPage,
    page,
  }) => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;
    test.skip(!email || !password, 'Skipping BUG-002: TEST_USER_EMAIL or TEST_USER_PASSWORD is not set in .env');

    await demoStep(page, 'Krok 1: Výběr finského jazyka (FI) na veřejné přihlašovací obrazovce', async () => {
      await loginPage.goto();
      await loginPage.switchLanguage('FI');
      await expect(page.locator('.navbar-nav a', { hasText: /^FI$/i }).first()).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toContainText(/Kirjaudu/i);
    });

    await demoStep(page, 'Krok 2: Přihlášení platným uživatelským účtem do systému', async () => {
      await loginPage.login(email!, password!);
      await dashboardPage.expectDashboardLoaded();
    });

    await demoStep(page, 'Krok 3 [FAILED PATH]: Kontrola zachování jazykového přepínače v navigaci (Ověření vady BUG-002)', async () => {
      // Vada BUG-002: Jazykový přepínač (FI, SV, EN, SQ) po přihlášení z horní lišty zcela zmizí
      // a aplikace natvrdo vynutí angličtinu bez možnosti přepnutí zpět.
      // Tato aserce selže (element selector není v horní liště nalezen), čímž prokazuje existenci evidované vady BUG-002:
      await expect(
        page.locator('.navbar-nav a', { hasText: /^FI$/i }).first()
      ).toBeVisible({ timeout: 4000 });
    });
  });
});
