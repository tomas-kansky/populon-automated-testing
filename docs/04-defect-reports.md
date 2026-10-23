# 🐞 Evidence a šablona chyb (Defect Reports — 3. milník)

> **Zadání 3. milníku (10. týden):**  
> *„Provést testovací případy, ideálně testovat jiný než svůj (prohodit si Test Casy). Zkusit nalézt a reportovat chyby (šablonu na report chyby) – **maximálně 5 chyb**.“*  
> **Cílové místo pro přenos:** `uuManagementKit` / Týmový Excel.

---

## 1. Šablona pro hlášení chyby (Bug Report Template)

Šablona vychází z kapitoly **6. Issue tracking** a **10. Evidence vad a výsledků** v naší [Testovací strategii](./02-test-strategy.md):

| Pole | Popis pole | Hodnoty / Příklad |
|---|---|---|
| **ID vady** | Jedinečný identifikátor chyby | `BUG-001` až `BUG-005` |
| **Název chyby** | Stručný a výstižný popis problému (Kde + Co se děje) | např. *Notifications: Člen vidí notifikaci s budoucím Release date přes přímý odkaz* |
| **Vazba na TC / Požadavek** | Testovací případ, při kterém byla chyba odhalena | např. `TC-003 (JM)` / `REQ-NOT-01` |
| **Nahlásil (Tester)** | Jméno / iniciály testera provádějícího křížový test | `TK` / `MK` / `AS` / `JM` |
| **Datum nalezení** | Datum exekuce testu | `YYYY-MM-DD` |
| **Závažnost (Severity)** | Dopad chyby na funkčnost a bezpečnost systému | `Critical` / `High` / `Medium` / `Low` |
| **Priorita (Priority)** | Naléhavost opravy z pohledu byznysu | `P1` (Urgent) / `P2` (High) / `P3` (Medium) / `P4` (Low) |
| **Stav (Status)** | Aktuální fáze v životním cyklu vady | `New` → `Assigned` → `Fixed` → `Retested` → `Closed` (nebo `Reopened`) |
| **Prostředí** | URL, prohlížeč, testovací skupina a role | `https://demo.populon.app`, Chrome, skupina `uu_2026_BQAS_team_1`, role `Member` |
| **Předpoklady** | Výchozí stav před reprodukcí chyby | Existující účet/data potřebná k vyvolání chyby |
| **Kroky k reprodukci** | Přesný číslovaný postup vedoucí k vyvolání vady | `1. ...` `2. ...` `3. ...` |
| **Očekávaný výsledek** | Jak se má aplikace zachovat podle specifikace | Dle `Populon Core — Functional Specification` |
| **Skutečný výsledek** | Jak se aplikace skutečně zachovala | Popis chybného chování / chybové hlášky |
| **Důkaz / Příloha** | Snímek obrazovky, Playwright trace nebo video | Odkaz na screenshot / `playwright-report` |

---

## 2. Klasifikace závažnosti (Severity) dle Testovací strategie

- 🔴 **Critical (Blocker):** Pád systému, prolomení viditelnosti dat nebo oprávnění mezi spolky/rolemi (GDPR / RBAC, např. nečlen vidí interní data spolku nebo admin nadřazeného spolku má admin práva v podspolku), nemožnost dokončit klíčový proces bez náhradního řešení.
- 🟠 **High (Major):** Hlavní funkcionalita neodpovídá specifikaci (např. vznikne duplicitní členství místo nabídky reaktivace, změna povolených hodnot vlastního pole zneplatní dříve uložené hodnoty, zrušená aktivita dále přijímá registrace).
- 🟡 **Medium (Moderate):** Funkční odchylka s nižším dopadem nebo s existujícím workaroundem (např. nepřesná validace nepovinného pole, chybějící potvrzovací hláška při zachování správného uložení).
- 🟢 **Low (Minor / Cosmetic):** Vizuální vady, překlepy v lokalizaci, drobné UI nedostatky bez vlivu na funkčnost.

---

## 3. Registr nalezených chyb (Max. 5 chyb pro 3. milník)

| ID vady | Název chyby | Vazba na TC | Závažnost | Priorita | Stav | Nahlásil |
|---|---|---|---|---|---|---|
| **BUG-001** | Member information: Uložená adresa člena (`Street address`, `Zip code`, `City`) se po uložení nevykreslí na přehledové kartě člena | `TC-004 (TK)` | `Low` (Minor) | `P3` | `New` | `TK` |
| **BUG-002** | *(Připraveno k vyplnění při křížovém testování v 3. milníku)* | `TC-...` | — | — | `New` | — |
| **BUG-003** | *(Připraveno k vyplnění)* | `TC-...` | — | — | `New` | — |
| **BUG-004** | *(Připraveno k vyplnění)* | `TC-...` | — | — | `New` | — |
| **BUG-005** | *(Připraveno k vyplnění)* | `TC-...` | — | — | `New` | — |

---

## 4. Detailní karty chyb (pro přenos do uuManagementKit / Excelu)

### 🐞 BUG-001: Member information: Uložená adresa člena (Street address, Zip code, City) se po uložení nevykreslí na přehledové kartě člena
- **Vazba na TC / Požadavek:** `TC-004 (TK)` / `REQ-FLD-04`
- **Nahlásil:** `TK` (Tomáš Kanský) | **Datum:** `2026-10-23`
- **Závažnost (Severity):** `Low` (Minor / UI zobrazení uložených dat)
- **Priorita:** `P3` (Medium)
- **Stav:** `New`
- **Prostředí:** `https://demo.populon.app/membercard?memberId=24096` | Skupina: `uu_2026_BQAS_team_1` (`societyId=4516`) | Prohlížeč: Chromium / Chrome
- **Předpoklady:**
  - Uživatel je přihlášen jako aktivní člen skupiny `uu_2026_BQAS_team_1` a nachází se na své členské kartě (`/membercard?memberId=24096`).
- **Kroky k reprodukci:**
  1. Na členské kartě `Member information` (`/membercard?memberId=24096`) kliknout na tlačítko `Edit`.
  2. Vyplnit pole `Street address`: `Parukářka 4`, `Zip code`: `130 00`, `City`: `Praha 3` a `Country`: `Czechia`.
  3. Kliknout na tlačítko `Save`.
  4. Zkontrolovat zobrazenou adresu v přehledovém panelu `Member information` u ikony lokace (`glyphicon-map-marker`).
  5. Znovu kliknout na `Edit` a zkontrolovat hodnoty v polích formuláře.
- **Očekávaný výsledek:**
  - Po uložení (`Data saved!`) se v přehledovém panelu `Member information` u ikony adresy zobrazí kompletní uložená adresa (`Parukářka 4, 130 00 Praha 3, CZ`).
- **Skutečný výsledek:**
  - Přestože systém vypíše hlášku `Data saved!` a při opětovném otevření `Edit` jsou hodnoty `Parukářka 4`, `130 00` a `Praha 3` v databázi uloženy, přehledová karta `Member information` u ikony adresy vykreslí pouze dvoupísmenný kód země `CZ` a ulici, PSČ i město zcela vynechá. *(Technická poznámka z DOM: u pole `Zip code` je navíc chybně přiřazen atribut `robot-test="memberForm:address.city"`).*
- **Přílohy / Poznámka:**
  - Reprodukováno automatizovaným testem `TC-004 (TK)` v `tests/scenarios.spec.ts`.
