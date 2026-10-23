# 🎯 Kontext projektu a milníky (Zajištění kvality / BQAS)

Tento dokument definuje cíle projektu, harmonogram milníků v předmětu **Zajištění kvality (BQAS)** a způsob, jakým repozitář slouží jako **hlavní místo pravdy (Single Source of Truth)** pro všechny školní i technické výstupy.

---

## 1. Základní informace o projektu

- **Předmět:** Zajištění kvality (BQAS)
- **Tým:** `uu_2026_BQAS_team_1`
- **Týmové téma:** `Populon Core` (`https://demo.populon.app`)
- **Zvolený pohled testování:** Z pohledu zákazníka – **UAT (User Acceptance Testing)** / nezávislý systémový testovací tým ověřující shodu s funkční specifikací.
- **Stakeholder / Zadavatel (3. strana – dokumentace a oprava chyb):** Lenka Jendželovská (`@Lenka`)
- **Bodové hodnocení:** Příprava a exekuce – celkem **40 bodů** (všechny dílčí úkoly po **4 bodech**).
- **Externí nástroje pro odevzdávání:**
  - **uuManagementKit** (správa testovací strategie, testovacích případů a evidence vad)
  - **Týmový Excel** (brainstorming strategie, šablona TC, otevřené otázky a nápady, tabulka Test Casů)
  - **Týmový Word** (plný text Testovací strategie v CZ/EN a závěrečný Test Report)

---

## 2. Přehled milníků a zadání

### 🏁 1. Milník (3. týden)
**Zadání (do následující konzultace):**
- [x] Připravit první návrh **Testovací strategie** pro Populon (`uuManagementKit` / Word / Excel)
- [x] Připravit **osnovu (šablonu) pro testovací případ**

**Kde najít v repozitáři:**
- Návrh a plné znění Testovací strategie + 11bodový brainstorming: [`docs/02-test-strategy.md`](./02-test-strategy.md)
- Osnova / šablona pro testovací případ (12 polí): [`docs/03-test-cases.md#1-osnova-testovacího-případu-šablona`](./03-test-cases.md)

---

### 🏁 2. Milník (6. týden)
**Zadání (do následující konzultace):**
- [x] Vybrat ty nejdůležitější **Business Use Casy** (Populon / `uuManagementKit`)
- [x] K vybraným Testovacím případům **vyplnit šablonu pro Testovací případ**
- [x] Doplnit zbývající kapitoly v **Testovací strategii** (pokud ještě nejsou)

**Kde najít v repozitáři:**
- Funkční specifikace a katalog požadavků: [`docs/01-functional-specification.md`](./01-functional-specification.md)
- Vybrané Business Use Casy, nápady a vyplněné Test Casy (`TC-001`, `TC-002`, `TC-003` + další): [`docs/03-test-cases.md`](./03-test-cases.md)
- Kompletní 7kapitolová Testovací strategie (CZ i EN): [`docs/02-test-strategy.md`](./02-test-strategy.md)

---

### 🏁 3. Milník (10. týden)
**Zadání (do následující konzultace):**
- [ ] **Provést testovací případy**, ideálně testovat jiný než svůj (prohodit si Test Casy v týmu)
- [ ] Zkusit **nalézt a reportovat chyby** (využít šablonu na report chyby) – **maximálně 5 chyb**
- [ ] Doplnit zbývající kapitoly v **Testovací strategii**

**Kde najít v repozitáři:**
- Záznamy o exekuci Test Casů (`Skutečný výsledek`, `Výsledek / stav`, `ID vady`): [`docs/03-test-cases.md`](./03-test-cases.md)
- Automatizované Playwright E2E testy pro živé předvedení exekuce: [`tests/`](../tests/)
- Šablona a registr nalezených chyb (max. 5 chyb): [`docs/04-defect-reports.md`](./04-defect-reports.md)

---

### 🏁 4. Milník (13. týden)
**Zadání (do následující konzultace):**
- [ ] Vyplnit **Testovací Report** (grafy + manažerské shrnutí)
  - Grafy přes **Test Casy** (Passed / Failed / Blocked / Not Run)
  - Grafy přes **Chyby** (dle závažnosti Critical / High / Medium / Low a stavu)
- [ ] Finálně doladit **Testovací strategii**

**Kde najít v repozitáři:**
- Závěrečný Testovací Report (manažerské shrnutí, tabulky a Mermaid grafy): [`docs/05-test-report.md`](./05-test-report.md)
- Finální verze Testovací strategie: [`docs/02-test-strategy.md`](./02-test-strategy.md)

---

## 3. Živé Demo automatizovaných testů (Technický cíl)

Kromě dokumentačních výstupů je cílem projektu ukázat na konzultaci / obhajobě **funkční automatizované testy jedním kliknutím nebo příkazem ve zpomaleném režimu (Slow-Motion Demo)**:

- **Dvojklik ve Windows:** Spusť [`run-demo.bat`](../run-demo.bat) v kořeni projektu.
- **Jeden příkaz v terminálu (automatický průchod všemi testy):**
  ```bash
  npm run demo
  ```
- **Interaktivní Playwright UI (výběr konkrétního testu kliknutím se zapnutým zpomalením):**
  ```bash
  npm run demo:ui
  ```
- Konfigurace dema je uložena v [`playwright.demo.config.ts`](../playwright.demo.config.ts) (`headless: false`, `slowMo: 800`, `workers: 1`, sekvenční běh).
