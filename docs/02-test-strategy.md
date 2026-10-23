# 🧭 Testovací strategie — Populon Core

> **Cílové artefakty pro přenos:** Týmový Word, Týmový Excel (list `BQAS | Brainstorming testovací strategie`) a `uuManagementKit`.  
> **Zahrnuté verze:**  
> 1. Detailní česká Testovací strategie (7 kapitol)  
> 2. Anglická konsolidovaná verze (`Populon – Test Strategy`)  
> 3. Týmový brainstorming z 1. milníku (11bodová tabulka z Excelu)

---

## Osnova testovací strategie pro Populon

1. **Cíl testování** (Testing Goals / Objectives)
2. **Fáze testování + vstupní a výstupní kritéria** (Test Phases & Entry/Exit Criteria)
3. **Role a odpovědnosti** (Roles & Responsibilities)
4. **Testovací prostředí** (Test Environments & Data)
5. **Test design** (Přístup k přípravě a typy testů)
6. **Issue tracking** (Správa a řízení defektů)
7. **Reportování** (Reporting & Metrics)

---

## ČÁST A: Testovací strategie (Česká verze – plné znění)

### 1. Cíl testování (Testing Goals / Objectives)
- **Hlavní cíl:** Ověřit, že klíčové funkcionality platformy **Populon Core** odpovídají funkční specifikaci, se zvláštním důrazem na bezpečnost, oprávnění (kdo může vidět a upravovat jaká data napříč spolky – GDPR a RBAC) a správné chování životního cyklu členství, vlastních polí, aktivit a notifikací.
- **Výstupy testování:** Provedené testovací případy (manuální i automatizované v Playwrightu), zaevidované defekty (v `uuManagementKit` / Excelu) a závěrečný Test Summary Report.
- **V rozsahu (In Scope):**
  - *Societies & Membership* (hierarchie `union` → `subsocieties`, individuální a firemní členství, životní cyklus členství, souběžná členství, izolace admin práv, reaktivace místo duplicit).
  - *Custom Member Data Fields* (definice vlastních polí/features, datové typy, zachování dříve uložených hodnot při změně povolených hodnot, zpětná dostupnost u starších členství, 4 úrovně viditelnosti).
  - *Activities* (tvorba událostí, datum od–do, poplatek, maximální kapacita, 5 úrovní viditelnosti, stavy účastníků, rušení akce a notifikace účastníků).
  - *Notifications* (publikace oznámení, časování `Release date` / `Ending date`, 5 úrovní viditelnosti, in-app a push notifikace).
- **Mimo rozsah (Out of Scope):**
  - Suomi.fi self-registration a opatrovnický/renewal flow pro mládežnická centra v Helsinkách.
  - Nativní mobilní aplikace.
  - Reportingová aplikace.
  - Detaily zpracování plateb (nad rámec informace o účastnickém poplatku u aktivity).
- **Prioritizace podle rizik:**
  - **Kritická (Critical):** Viditelnost dat a přístupová oprávnění (izolace admin práv mezi nadřazeným spolkem a podspolky, 4/5 úrovní viditelnosti u polí, aktivit a notifikací).
  - **Vysoká (High):** Životní cyklus členství (prevence duplicit a reaktivace), vlastní pole (retroaktivní platnost starých hodnot a zobrazení u existujících členství), časování notifikací a blokace registrací u zrušených/plných aktivit.
  - **Střední (Medium):** Standardní vytváření a správa aktivit a notifikací (Happy Path).

---

### 2. Fáze testování + Vstupní a výstupní kritéria (Test Phases & Entry/Exit Criteria)

Testování probíhá z pohledu nezávislého týmu / zákaznického akceptačního testování (**UAT / System & E2E Testing**).

| Fáze testování | Popis fáze | Vstupní kritéria (Entry Criteria) | Výstupní kritéria (Exit Criteria) |
|---|---|---|---|
| **1. Revize specifikace a příprava testů** | Analýza funkční specifikace Populon Core, návrh testovací strategie a příprava šablony i konkrétních Test Casů. | • Dostupná funkční specifikace (`Populon Core — Functional Specification`)<br>• Rozdělené role v týmu `uu_2026_BQAS_team_1` | • Zodpovězené otevřené otázky se stakeholderem<br>• Schválená šablona TC a připravené prioritní Business Test Casy |
| **2. Systémové / E2E a UAT testování (všechny role)** | Exekuce manuálních (křížové testování v týmu) i automatizovaných Playwright E2E testů napříč rolemi (Admin, Člen, Registrovaný nečlen, Anonym). | • Dostupná testovací instance (`https://demo.populon.app`)<br>• Vytvořená testovací skupina `uu_2026_BQAS_team_1` a testovací účty (Admin, Člen)<br>• Připravená testovací data | • 100 % spuštěných kritických (Critical) a vysokých (High) Test Casů<br>• Všechny nalezené vady řádně zaevidovány vč. kroků reprodukce a závažnosti |
| **3. Regresní a akceptační testování** | Ověření oprav nahlášených vad, spuštění automatizované regresní sady (`npm run test` / `npm run demo`) a finální vyhodnocení. | • Dodané opravy nahlášených chyb (nebo uzavřený cyklus křížového testování) | • Úspěšný průchod regresních testů<br>• 0 otevřených blokujících/kritických chyb (nebo zdokumentované známé vady se souhlasem stakeholdera)<br>• Vypracovaný závěrečný Test Summary Report |

*(Pozn.: V širším kontextu SDLC těmto fázím předcházejí **Unit testy** a **Integrační/API testy** na straně vývojového týmu).*

---

### 3. Role a odpovědnosti (Roles & Responsibilities)

| Role | Osoba / Tým | Odpovědnosti |
|---|---|---|
| **QA Engineer / Tester (UAT tým)** | Členové týmu `uu_2026_BQAS_team_1` (`MK`, `AS`, `JM`, `TK`) | • Návrh a údržba Testovací strategie a šablon<br>• Příprava Business Use Casů a Testovacích případů<br>• Vzájemné křížové provedení (exekuce) Test Casů a tvorba automatizovaných Playwright E2E testů<br>• Hledání a hlášení chyb (max. 5 chyb dle zadání 3. milníku)<br>• Příprava závěrečného Test Reportu (grafy + manažerské shrnutí) |
| **Stakeholder / Product Owner (3. strana)** | Lenka Jendželovská (`@Lenka`) | • Dodání a upřesnění funkční specifikace Populon Core<br>• Zodpovídání otevřených otázek na konzultacích<br>• Posouzení závažnosti vad a finální akceptace výstupů (sign-off) |
| **Developers (Vývojový tým – 3. strana)** | Vývojový tým Populon | • Správa a provoz prostředí `demo.populon.app`<br>• Unit a integrační testy, oprava nahlášených defektů (bug fixing), nasazování nových buildů |

---

### 4. Testovací prostředí a data (Test Environments & Data)

- **Testovací prostředí (QA / DEMO / UAT):**
  - URL: `https://demo.populon.app`
  - Oddělené testovací prostředí bez produkčních osobních dat; využívají se výhradně syntetická testovací data (v souladu s GDPR).
  - Pro automatizované E2E testy a živé ukázky je využíván framework **Playwright + TypeScript (Chromium)** spouštěný lokálně (včetně Slow-Motion Demo režimu) a v CI/CD přes **GitHub Actions**.
- **Testovací organizace a hierarchie:**
  - Hlavní týmová skupina v Populonu: `uu_2026_BQAS_team_1` (případně nadřazený spolek `union` se dvěma podspolky `subsocieties` pro ověření dědičnosti a izolace oprávnění).
- **Testovací data a role:**
  - **Uživatelské role:**
    1. *Anonymní návštěvník* (nepřihlášený uživatel)
    2. *Registrovaný uživatel mimo spolek* (přihlášený, ale není členem `uu_2026_BQAS_team_1`)
    3. *Člen spolku (Member)* (aktivní člen skupiny `uu_2026_BQAS_team_1`, případně zástupce *Company* členství)
    4. *Administrátor spolku (Society Admin)* (správce skupiny `uu_2026_BQAS_team_1` / správce nadřazeného spolku)
  - **Stavy a entity:** Členství ve všech stavech životního cyklu (`application submitted`, `approved`, `rejected`, `active`, `renewed`, `expired`, `cancelled`, `resigned`), vlastní pole všech datových typů (`string`, `integer`, `decimal`, `date`), aktivity a notifikace všech 5 úrovní viditelnosti.

---

### 5. Test design (Přístup k přípravě a typy testů)

- **Přístup k přípravě:**
  - Každý klíčový požadavek ze specifikace je pokryt alespoň jedním testovacím případem.
  - Všechny testy využívají jednotnou 12polovou týmovou šablonu (`TC-ID`, `Název`, `Požadavek / reference`, `Cíl testu`, `Priorita`, `Předpoklady`, `Testovací data`, `Kroky`, `Očekávaný výsledek`, `Skutečný výsledek`, `Výsledek / stav`, `ID vady / poznámka`).
  - Předpoklady (`Preconditions`) volíme efektivně (např. *„Správce je přihlášen do Populonu a spravuje skupinu `uu_2026_BQAS_team_1`“*), abychom v každém testu neopisovali triviální kroky přihlášení.
- **Použité techniky návrhu testů:**
  - **Stavový diagram (State Transitions):** Pro ověření přechodů životního cyklu členství a stavů účastníků aktivit (`invited`, `accepted`, `declined`, `joined by themselves`) a reaktivace zaniklého členství.
  - **Rozhodovací tabulky (Role × Visibility Matrix):** Kombinace uživatelských rolí a 4/5 úrovní viditelnosti u vlastních polí, aktivit a notifikací.
  - **Analýza hraničních hodnot a ekvivalenčních tříd (Boundary Values & Equivalence Partitioning):** Časování publikace notifikací (těsně před `Release date` vs. v/po `Release date`), naplnění maximální kapacity aktivity (`max - 1`, `max`, `max + 1`).
  - **Negativní a exploratorní testování:** Pokus o přímý přístup k detailu neveřejné notifikace/aktivity přes zkopírovanou URL neoprávněným uživatelem, odeslání prázdných/neplatných formulářů.
- **Typy testů:**
  - **Funkční testy** (Happy Path & Negative Path).
  - **Bezpečnostní testy a testy oprávnění (RBAC / Visibility)** – ověření, že neoprávněná role ani přímým URL odkazem neuvidí cizí data a admin nadřazeného spolku nemá automaticky admin práva v podspolku.
  - **Regresní a Smoke testy** (automatizované v Playwrightu – `@smoke`, `@regression`).
  - **Použitelnost a lokalizace (Usability & Localization)** (přepínání jazyků FI/EN, přehlednost chybových hlášek).

---

### 6. Issue tracking (Správa a řízení defektů)

- Pojmy *Bug*, *Defect*, *Vada* a *Chyba* zde mají stejný význam.
- **Kde se chyby evidují:** Primárně v **uuManagementKit** a v týmovém Excelu, se zrcadlením v tomto repozitáři ([`docs/04-defect-reports.md`](./04-defect-reports.md)).
- **Povinné náležitosti každého hlášení chyby:**
  - Jednoznačné `ID vady` (např. `BUG-001`) a vazba na testovací případ (`TC-ID`).
  - Krátký a výstižný název.
  - Prostředí a testovací účet/skupina.
  - Číslované **kroky k reprodukci (Steps to Reproduce)**.
  - **Očekávaný stav** (dle specifikace) vs. **Skutečný stav** (pozorované chování + screenshot/video).
  - **Závažnost (Severity):**
    - `Critical (Blocker)`: Pád aplikace, únik dat mezi spolky / prolomení viditelnosti (GDPR/RBAC), nemožnost přihlášení nebo provedení klíčového flow bez workaroundu.
    - `High (Major)`: Hlavní funkcionalita ze specifikace nefunguje správně (např. duplicitní členství vznikne místo reaktivace, notifikace je vidět před `Release date`).
    - `Medium (Moderate)`: Dílčí funkční odchylka s existujícím náhradním řešením (workaroundem).
    - `Low (Minor / Cosmetic)`: UI nedokonalosti, překlepy, zarovnání prvků.
  - **Priorita řešení:** `P1` (okamžitě) až `P4` (nízká).
- **Životní cyklus chyby (Defect Lifecycle):**
  `New` → `Assigned` → `In Progress` → `Fixed / Resolved` → `Retested` → `Closed` *(nebo `Reopened`, pokud re-test selže)*.

---

### 7. Reportování (Reporting & Metrics)

- **Průběžný přehled (Weekly / Milestone Status):**
  - Sledování počtu připravených a provedených testů (`Executed / Passed / Failed / Blocked / Not Run`), přehled otevřených defektů a aktuálních rizik na konzultacích (Milníky 1–3).
- **Závěrečný report (Test Summary Report – 4. milník):**
  - **Manažerské shrnutí (Executive Summary):** Celkové zhodnocení kvality Populon Core vůči specifikaci a naplnění výstupních kritérií.
  - **Vizualizace a grafy:**
    1. Graf výsledků přes **Testovací případy** (podíl `PASS`, `FAIL`, `BLOCKED`, `NOT RUN` a pokrytí modulů).
    2. Graf přes **Nalezené chyby** (rozdělení vad podle závažnosti `Critical / High / Medium / Low` a podle modulů).
  - **Doporučení pro vydání (Release Recommendation):** Jasné stanovisko `GO / NO-GO` (případně podmíněné `GO` se seznamem známých otevřených ne-kritických vad).
  - Kompletní podklad pro 4. milník je připraven v [`docs/05-test-report.md`](./05-test-report.md).

---

## ČÁST B: Anglická konsolidovaná verze (z týmového Wordu)

### Populon – Test Strategy

#### 1. Test objective
Verify that Populon works according to the specification, with the main focus on who can see which data (permissions, GDPR). Output: executed tests, logged defects, test reports.
- **In scope:** memberships and hierarchy, custom data fields (features), activities, notifications.
- **Out of scope:** Suomi.fi registration, mobile app, reporting app, payment processing.
- **Priorities by risk:** visibility and permissions (*Critical*), membership lifecycle and features (*High*), activities and notifications (*Medium*).

#### 2. Test phases and criteria

| Phase | Entry criteria | Exit criteria |
|---|---|---|
| **Specification review** | Specification available | Open questions answered |
| **System testing (all roles)** | Test build, environment and data ready | All Critical and High tests executed; no open Critical/High defects |
| **Regression and acceptance** | Fixes delivered | Regression passed; stakeholder sign-off |

#### 3. Roles and responsibilities
- **Tester:** designs and executes tests, logs defects, writes reports.
- **Developers:** fix defects, clarify requirements, deploy builds.
- **Stakeholder:** answers specification questions, accepts the result.

#### 4. Test environment
- Separate test environment, no production data; synthetic data (GDPR).
- **Data:** a union with two subsocieties (`uu_2026_BQAS_team_1`), users in all roles, memberships in all states, activities and notifications of all visibility levels.

#### 5. Test design
- **Preparation:** every requirement has at least one test case; common test case template.
- **Techniques:** state transitions, role × visibility table, boundary values, negative and exploratory testing.
- **Types:** functional, security and permissions, compatibility, usability, regression.

#### 6. Issue tracking
Bug, defect and issue mean the same thing here. Each is logged with steps to reproduce, expected and actual result, environment and severity (`Critical` / `High` / `Medium` / `Low`).
- **Lifecycle:** `New` → `Assigned` → `Fixed` → `Retested` → `Closed` (or `Reopened`).

#### 7. Reporting
- **Weekly report:** executed / passed / failed / blocked tests, open defects, risks.
- **Final summary:** results per module, open defects, release recommendation.

---

## ČÁST C: Týmový brainstorming z Excelu (`BQAS | Brainstorming testovací strategie`)

> Přesná kopie listu z týmového Excelu z 1. milníku (*„První milník • návrh osnovy, nikoliv schválená testovací strategie • Co budeme testovat, proč a jak?“*):

| č. | Kapitola | Otázka pro tým | První nápad / obsah | Stav | Řešení |
|---|---|---|---|---|---|
| **1** | Cíl testování | Co má testování potvrdit? | Ověřit, zda klíčové funkce Populonu odpovídají specifikaci. | Návrh | |
| **2** | Kontext a přístup | Kdo testuje? Agilně, nebo vodopádem? | Zvažujeme nezávislý FAT/SIT tým; přístup ještě není vybrán. = z pohledu zákazníka UAT | Návrh | |
| **3** | Rozsah testování | Které části systému zahrnout? | Členství, vlastní pole, aktivity a oznámení. | Návrh | |
| **4** | Mimo rozsah | Co podle specifikace neřešíme? | Suomi.fi procesy, nativní mobilní aplikace, reporting a detaily plateb. | Podloženo specifikací | |
| **5** | Typy testů | Jaké způsoby ověřování dávají smysl? | Funkční, integrační, oprávnění a regresní testy – k diskusi. = nové funkčnosti/regresní testy | Návrh | |
| **6** | Testovací prostředí a data | Jaké role, organizace a data potřebujeme? | Uživatel, člen, správce; nadřazený spolek a podspolky. | Návrh | |
| **7** | Priority a rizika | Kde může mít chyba největší dopad? | Přístupová práva, kapacita akcí, časová dotace (př. Registrační maily nechodí k potvrzení), bez dokumentace | Návrh | |
| **8** | Role a odpovědnosti | Kdo připravuje, provádí a vyhodnocuje testy? | Rozdělit v týmu po výběru tématu. Uvést i role "ostatní" - strana zákazníka (nebo 3.stran zajištění dokumentace/oprava chyb - Lenka Jendželovská) | Otevřené | Test, Report, 3.strana - dokumentace/oprava chyb |
| **9** | Vstupní a výstupní kritéria | Kdy lze testování zahájit a ukončit? | Navrhnout kritéria dostupnosti funkcí a závažnosti vad. Vstupní kriteria = registrace, dostupnost - co k testování potřebujeme; Výstupní kriteria = otestování všech test case, hodnocení chyb; souvislost a návaznost vstupních/výstupních kriterií | Návrh | |
| **10** | Evidence vad a výsledků | Jak zaznamenáme nalezené problémy? Report. | ID vady, kroky reprodukce, očekávaný/skutečný stav, závažnost. Do ManagementKitu zaznamenat. | Návrh | Stanovit závažnost chyb - stupeň vážnosti; popis chyby - jak evidovat, deadliny řešení |
| **11** | Rizika a předpoklady projektu | Co nám zatím chybí k rozhodnutí? | Týmové téma Populon core | K ověření | |
