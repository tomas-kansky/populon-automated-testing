# 🤖 AGENTS.md — Projektový kontext a instrukce pro AI agenty

Tento dokument slouží jako **hlavní vstupní bod pro AI agenty** pracující v repozitáři `populon-automated-testing`. Před jakoukoliv úpravou testů nebo dokumentace si přečti tento kontext a navazující soubory ve složce [`docs/`](./docs/).

---

## 🎯 Dvojí cíl projektu

1. **Živá automatizovaná E2E ukázka (One-Click Slow-Mo Demo):**
   - Testujeme reálnou webovou aplikaci **Populon** (`https://demo.populon.app`).
   - Všechny automatizované testy musí jít **ukázat během krátkého živého dema** (např. na konzultaci nebo obhajobě).
   - Spuštění musí proběhnout **jedním příkazem (`npm run demo` / `npm run demo:ui`) nebo dvojklikem (`run-demo.bat`)**, které otevře prohlížeč a ve **zpomaleném režimu (`slowMo`)** sekvenčně (`workers: 1`) předvede ostatním, co přesně automatizovaný test v aplikaci dělá.
2. **Hlavní místo pravdy (Single Source of Truth) pro předmět Zajištění kvality (BQAS):**
   - Projekt vzniká v rámci vysokoškolského předmětu **Zajištění kvality (BQAS)** na Unicorn University (tým `uu_2026_BQAS_team_1`).
   - Ačkoliv se dílčí školní výstupy odevzdávají externě (do **uuManagementKit**, týmového **Excelu** a **Wordu**), tento repozitář drží **veškerý kontext, zadání, specifikaci, testovací strategii, testovací případy (Test Cases), reporty chyb i závěrečný report** v přehledném Markdownu ve složce [`docs/`](./docs/).

---

## 📚 Mapa dokumentace (`docs/`)

| Soubor | Obsah a účel | Cílové místo pro přenos (Export) |
|---|---|---|
| [`docs/00-project-context-and-milestones.md`](./docs/00-project-context-and-milestones.md) | Zadání 1.–4. milníku, bodování (40 b.), stav plnění a rozcestník | Přehled pro tým a konzultace |
| [`docs/01-functional-specification.md`](./docs/01-functional-specification.md) | Kompletní funkční specifikace **Populon Core** (`@Lenka`, 3. 10. 2026) + katalog požadavků (`REQ-*`) | Referenční podklad pro Test Casy a Strategii |
| [`docs/02-test-strategy.md`](./docs/02-test-strategy.md) | **Testovací strategie** (7 kapitol v CZ i EN verzi) + 11bodový týmový brainstorming z Excelu | Týmový Word / uuManagementKit (Milník 1–4) |
| [`docs/03-test-cases.md`](./docs/03-test-cases.md) | **Šablona TC (12 polí)**, vypracované **Business Test Casy (`TC-001` až `TC-003`)** a backlog nápadů z Excelu | Týmový Excel / uuManagementKit (Milník 1–3) |
| [`docs/04-defect-reports.md`](./docs/04-defect-reports.md) | **Šablona a evidence nalezených chyb** (max. 5 vad pro Milník 3) | uuManagementKit / Týmový Excel (Milník 3) |
| [`docs/05-test-report.md`](./docs/05-test-report.md) | **Závěrečný Testovací Report** (manažerské shrnutí, metriky a grafy přes TC a chyby pro Milník 4) | Týmový Word / Prezentace (Milník 4) |

---

## 🏛️ Doménový a týmový kontext

- **Testovaná aplikace:** Populon Core (`https://demo.populon.app`) – platforma pro správu spolků (societies/unions/subsocieties), členství (memberships), vlastních polí (custom member data fields / features), aktivit (activities) a oznámení (notifications).
- **In-Scope oblasti dle specifikace:**
  1. `Societies & Membership` (hierarchie union → subsociety, životní cyklus členství, prevence duplicit a reaktivace, izolace admin práv)
  2. `Custom Member Data Fields` (vlastní pole/features, datové typy, povolené hodnoty bez retroaktivní invalidace, 4 úrovně viditelnosti)
  3. `Activities` (události, datum od-do, poplatek, max. kapacita, 5 úrovní viditelnosti, stavy účastníků, rušení akce a notifikace)
  4. `Notifications` (oznámení, časování `Release date` / `Ending date`, 5 úrovní viditelnosti, push/in-app)
- **Out-of-Scope oblasti (netestují se):**
  - Suomi.fi registrace a opatrovnický flow pro mládežnická centra v Helsinkách
  - Nativní mobilní aplikace
  - Reportingová aplikace
  - Detaily zpracování plateb (nad rámec údaje o poplatku u aktivity)
- **Testovací skupina v Populonu:** `uu_2026_BQAS_team_1`
- **Zvolený testovací přístup týmu:** Pohled zákazníka / **UAT (User Acceptance Testing)** & systémové E2E testování proti specifikaci.
- **Stakeholder / vyučující:** Lenka Jendželovská (`@Lenka`)
- **Členové týmu (zkratky v TC):** `MK`, `AS`, `JM`, `TK` (Tomáš Kanský)

---

## 🎬 Pravidla pro psaní Playwright testů a Demo režim

1. **Architektura Page Object Model (POM):**
   - Veškeré lokátory a interakce s UI patří do tříd v `src/pages/` (dědících z `BasePage.ts`).
   - Nové Page Objecty registruj jako fixtury v `src/fixtures/testFixtures.ts`.
   - Samotné testy v `tests/*.spec.ts` musí být čitelné jako byznysový scénář.
2. **Optimalizace pro živé Demo (`playwright.demo.config.ts` a spouštění mimo `exebox`):**
   - Demo běží s `workers: 1`, `fullyParallel: false`, `headless: false` a `slowMo: 800` (nebo dle `SLOW_MO` v `.env`) a automaticky injektuje vizuální **Live Demo HUD overlay** (`src/utils/demoOverlay.ts`).
   - ⚠️ **Pozor na Antigravity 2.0 Sandbox (`WinSta0\exebox-...`):** Interní terminál v Antigravity 2.0 spouští procesy na izolované virtuální ploše Windows (`exebox`), takže se okno prohlížeče nevykreslí na hlavní obrazovce uživatele (`WinSta0\Default`). Pro viditelné promítání na obrazovce je nutné spouštět demo z **externího Windows PowerShellu / Terminálu** nebo dvojklikem na `run-demo.bat` v Průzkumníku Windows:
     ```powershell
     cd "C:\Users\tomat\Documents\Programming Projects\populon-automated-testing"; npm run demo:scenarios
     ```
   - U klíčových byznysových testů používej `await demoStep(page, 'Název kroku dle TC', async () => { ... })`, aby jak v živém HUD panelu uvnitř prohlížeče, tak v Playwright UI (`npm run demo:ui`) a v HTML reportu byly vidět přesné kroky odpovídající šabloně v Excelu (`docs/03-test-cases.md`).
   - Označuj testy příslušnými tagy v názvu: např. `@tc001`, `@notifications`, `@smoke`, `@regression`, `@demo`.
   - Na konci důležitých vizuálních scénářů v headed/demo režimu lze ponechat krátkou pauzu nebo čitelnou aserci, aby publikum stihlo zaregistrovat výsledný stav na obrazovce.
3. **Konfigurace a citlivé údaje (`.env`):**
   - Přihlašovací údaje nikdy necommituj do kódu. Načítej je přes `process.env.TEST_USER_EMAIL`, `process.env.TEST_USER_PASSWORD` (případně `TEST_MEMBER_EMAIL` / `TEST_MEMBER_PASSWORD` pro testy rolí a viditelnosti) a `process.env.TEST_GROUP_NAME` (`uu_2026_BQAS_team_1`).
   - Pokud proměnné v `.env` chybí, test se musí korektně přeskočit pomocí `test.skip(!email || !password, '...')`.

---

## ⚙️ Workflow pravidla pro agenty

- **Zákaz nevyžádaného E2E/browser testování na konci úkolu:** Po dokončení úprav kódu nebo dokumentace nespouštěj automaticky browser subagenta ani živé prohlížečové testy, pokud o to uživatel explicitně nepožádá.
- **Evidence práce (`work-logs/`):** Při práci v repozitáři aktualizuj denní záznam v `work-logs/YYYY-MM-DD.md` dle skillu `work-logger` (složka `work-logs/` je v `.gitignore`).
- **Git Commits:** Striktně dodržuj Conventional Commits (`feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`, `refactor: ...`).
