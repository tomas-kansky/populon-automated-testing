# 🧪 Testovací případy (Test Cases) a Osnova TC

> **Cílové artefakty pro přenos:** Týmový Excel (listy `BQAS | Osnova testovacího případu`, `BQAS | Otevřené otázky a nápady`, list `Test Cases`) a `uuManagementKit`.  
> **Testovací skupina v Populonu:** `uu_2026_BQAS_team_1`

---

## 1. Osnova testovacího případu (Šablona z 1. milníku)

> *„Pouze návrh polí šablony • konkrétní testovací případ se v 1. milníku nevyplňuje • Jak budeme zapisovat jednotlivé testy?“*

| Pole | K čemu slouží | Poznámka pro budoucí vyplnění |
|---|---|---|
| **TC-ID** | Jedinečný identifikátor testovacího případu | např. `TC-001` (v týmu doplněno o iniciály autora, např. `TC-001 (MK)`) |
| **Název** | Krátký název toho, co se bude ověřovat | Stručný a výstižný popis scénáře |
| **Požadavek / reference** | Vazba na konkrétní požadavek specifikace | Sekce a bod dokumentu / cesta v aplikaci (např. `Populon → Administration → Notifications` / `REQ-NOT-01`) |
| **Cíl testu** | Co chceme prokázat | Jednověté shrnutí účelu testu |
| **Priorita** | Důležitost testu | `Nízká` / `Střední` / `Vysoká` |
| **Předpoklady** | Výchozí stav a oprávnění | Volit efektivní začátek (nezačínat vždy od přihlášení: *„Správce je přihlášen do Populonu a spravuje skupinu...“*) |
| **Testovací data** | Účty, role, hodnoty | Konkrétní vstupy (název skupiny, texty polí, časy, nastavení viditelnosti) |
| **Kroky** | Postup testera | Číslované kroky (`1.`, `2.`, ...) |
| **Očekávaný výsledek** | Správné chování systému | Podle požadavku; číslované body odpovídající krokům (`1 krok = 1 či více očekávaných výsledků`) |
| **Skutečný výsledek** | Pozorované chování při provedení | Vyplnit až při testování (3. milník) |
| **Výsledek / stav** | Zda test prošel, neprošel nebo nebyl spuštěn | `PASS` / `FAIL` / `NOT RUN` / `BLOCKED` |
| **ID vady / poznámka** | Odkaz na zjištěný problém | Vyplnit až při testování (např. `BUG-001`) |

---

## 2. Vypracované Testovací případy (z týmového Excelu – 2. a 3. milník)

### 📋 TC-001 (MK): Vytvoření a zobrazení notifikace ve skupině

- **TC-ID:** `TC-001 (MK)`
- **Název:** Vytvoření a zobrazení notifikace ve skupině
- **Požadavek / reference:** `Populon → Administration → Notifications → vytvoření notifikace (Basic info / Visibility & receivers / Summary)`; číslo požadavku neuvedeno (`REQ-NOT-01`, `REQ-NOT-02`)
- **Cíl testu:** Ověřit, že administrátor může vyplnit povinné údaje, určit viditelnost pro členy skupiny, zkontrolovat souhrn, uložit notifikaci a zobrazit ji v přehledu i detailu skupiny.
- **Priorita:** `Vysoká`
- **Předpoklady:** Administrátor je přihlášen do Populonu a spravuje skupinu `uu_2026_BQAS_team_1`. Je otevřena její administrace a sekce `Notifications`.
- **Testovací data:**
  - `Skupina`: `uu_2026_BQAS_team_1`
  - `Title`: `První testovací notifikace`
  - `Description`: `v rámci prvního use casu, vytvářím první notifikaci pro seznámení se systémem`
  - `Text`: `Notifikace mají v Basic info čtyři povinná pole, Title, Description, Text a Release date, jedno volitelné a to Ending date. Další záložky jsou Visibility and receivers a Summary.`
  - `Release date`: `11/10/2026 21:48`
  - `Ending date`: *nevyplněno*
  - `Visibility`: `Only to members of group`
  - `Send to new members`: `No`
- **Kroky:**
  1. V administraci skupiny otevřít `Notifications` a zahájit vytvoření notifikace.
  2. V `Basic info` vyplnit `Title`, `Description`, `Text` a `Release date` podle testovacích dat; `Ending date` nechat prázdné.
  3. Přejít na `Visibility & receivers` a nastavit `Only to members of group`; `Send to new members` ponechat vypnuté.
  4. Přejít na `Summary` a zkontrolovat zadané hodnoty.
  5. Kliknout na `Save`.
  6. Otevřít stránku skupiny `uu_2026_BQAS_team_1`, záložku `Notifications`.
  7. Otevřít notifikaci `První testovací notifikace` a ověřit její detail.
- **Očekávaný výsledek:**
  1. Průvodce umožní vytvoření notifikace ve třech krocích.
  2. Povinná pole přijmou platné údaje; `Ending date` lze ponechat prázdné.
  3. Lze nastavit viditelnost pouze pro členy skupiny; nové členy není nutné zahrnout.
  4. `Summary` zobrazí správně název, popis, text, data i viditelnost.
  5. Uložení proběhne a notifikace je dostupná ve skupině po čase zveřejnění.
  6. V záložce `Notifications` se zobrazí nová notifikace s odpovídajícím názvem.
  7. Detail zobrazuje správně její název, popis a text.
- **Skutečný výsledek:** Skutečný výsledek odpovídá očekávanému. Notifikace je viditelná pouze pro členy týmu.
- **Výsledek / stav:** `PASS`
- **ID vady / poznámka:** —

---

### 📋 TC-002 (AS): Viditelnost notifikace pouze pro členy skupiny

> *(V týmovém Excelu je momentálně vyplněno pouze ID a Název – níže je připravený doporučený návrh polí dle specifikace `REQ-NOT-02`, připravený k případnému schválení/doplnění do Excelu)*

- **TC-ID:** `TC-002 (AS)`
- **Název:** Viditelnost notifikace pouze pro členy skupiny
- **Požadavek / reference:** `Populon → Administration → Notifications → Visibility & receivers (Only to members of group)` (`REQ-NOT-02`)
- **Cíl testu:** Ověřit, že notifikace s nastavenou viditelností `Only to members of group` je viditelná pro aktivního člena skupiny `uu_2026_BQAS_team_1`, ale není viditelná pro nepřihlášeného návštěvníka ani pro přihlášeného uživatele, který není členem skupiny (ani při použití přímého URL odkazu).
- **Priorita:** `Vysoká`
- **Předpoklady:** Ve skupině `uu_2026_BQAS_team_1` existuje publikovaná notifikace (např. `První testovací notifikace` z `TC-001`) s `Release date` v minulosti a s viditelností `Only to members of group`. Tester má k dispozici účet člena skupiny, účet registrovaného nečlena a přímou URL adresu detailu notifikace.
- **Testovací data:**
  - `Skupina`: `uu_2026_BQAS_team_1`
  - `Notifikace`: `První testovací notifikace`
  - `Visibility`: `Only to members of group`
  - `Role 1`: Aktivní člen skupiny `uu_2026_BQAS_team_1`
  - `Role 2`: Registrovaný uživatel mimo skupinu `uu_2026_BQAS_team_1`
  - `Role 3`: Anonymní (nepřihlášený) návštěvník
- **Kroky:**
  1. Přihlásit se jako **člen skupiny** (`Role 1`), otevřít stránku skupiny `uu_2026_BQAS_team_1` → záložku `Notifications` a zkopírovat přímou URL detailu notifikace.
  2. Odhlásit se a jako **anonymní návštěvník** (`Role 3`) otevřít veřejný profil skupiny `uu_2026_BQAS_team_1` a následně zadat do prohlížeče přímou URL detailu notifikace.
  3. Přihlásit se jako **registrovaný uživatel mimo skupinu** (`Role 2`), otevřít stránku skupiny `uu_2026_BQAS_team_1` a následně zadat přímou URL detailu notifikace.
- **Očekávaný výsledek:**
  1. Člen skupiny (`Role 1`) notifikaci vidí v přehledu `Notifications` a může zobrazit její plný detail.
  2. Anonymní návštěvník (`Role 3`) notifikaci v přehledu skupiny nevidí; přímá URL detailu neumožní zobrazení obsahu (přesměruje na přihlášení nebo zobrazí odepření přístupu).
  3. Registrovaný nečlen (`Role 2`) notifikaci v přehledu skupiny nevidí; přímá URL detailu obsah notifikace nezobrazí.
- **Skutečný výsledek:** *(vyplnit při exekuci)*
- **Výsledek / stav:** `NOT RUN`
- **ID vady / poznámka:** —

---

### 📋 TC-003 (JM): Časování: Notifikace se před Release date nezobrazí a po něm ano

- **TC-ID:** `TC-003 (JM)`
- **Název:** Časování: Notifikace se před Release date nezobrazí a po něm ano
- **Požadavek / reference:** `Populon → Administration → Notifications → Basic info (Release date)` (`REQ-NOT-01`, `REQ-NOT-02`)
- **Cíl testu:** Ověřit, že notifikace s `Release date` v budoucnosti není členovi skupiny dostupná před časem zveřejnění a po jeho uplynutí se zobrazí.
- **Priorita:** `Vysoká`
- **Předpoklady:** Správce je přihlášen do Populonu a spravuje skupinu `uu_2026_BQAS_team_1`, je otevřena sekce `Notifications`. K dispozici je testovací účet člena stejné skupiny.
- **Testovací data:**
  - `Skupina`: `uu_2026_BQAS_team_1`
  - `Notification title`: `Druhá testovací notifikace - budoucí vydání`
  - `Release date`: `24/10/2026 10:00`
  - `Visibility`: `Only to members of group`
  - `Send to new members`: `No`
- **Kroky:**
  1. Jako správce vytvořit notifikaci podle testovacích dat (`release date: 24/10/2026 10:00`).
  2. Na záložce `Visibility & receivers` nastavit `Only to members of group`, `Send to new members` ponechat vypnuté.
  3. Na `Summary` zkontrolovat hodnoty a kliknout na `Save`.
  4. Otevřít `Notifications` v administraci skupiny a ověřit, že notifikace tam je.
  5. Zkopírovat URL detailu notifikace.
  6. Přihlásit se jako člen skupiny a před `24/10/2026 10:00` otevřít záložku `Notifications` skupiny; zkusit i zkopírovaný odkaz.
  7. Po `24/10/2026 10:00` stránku obnovit a znovu otevřít záložku `Notifications`.
  8. Otevřít detail notifikace.
- **Očekávaný výsledek:**
  1. Formulář přijme platné údaje.
  2. Viditelnost je nastavena jen pro členy skupiny.
  3. `Summary` zobrazí správné hodnoty včetně `Release date`; notifikace se uloží.
  4. Správce notifikaci vidí v administraci i před časem zveřejnění.
  5. URL detailu je k dispozici.
  6. Člen notifikaci nevidí v přehledu ani přes přímý odkaz.
  7. Po `Release date` se notifikace v přehledu zobrazí.
  8. Detail zobrazuje správně název, popis a text.
- **Skutečný výsledek:** *(vyplnit při exekuci)*
- **Výsledek / stav:** `NOT RUN`
- **ID vady / poznámka:** —

---

## 3. Otevřené otázky a nápady na další Test Casy (`BQAS | Otevřené otázky a nápady`)

> Přesná kopie diskusního listu z týmového Excelu (*„Diskusní pracovní list • nápady nejsou hotové testy ani schválené požadavky • Co nás napadlo, co je třeba rozhodnout?“*):

| Oblast | Námět | Otázka / hypotéza k diskusi | Stav | Vazba na požadavek |
|---|---|---|---|---|
| **Výběr týmového tématu** | FAT/SIT – agilní vs. FAT/SIT – vodopád - nezávislý testovací tým, (DEV) součást vývoje, (UAT) za zákazníka | Jaký přístup nejlépe obhájíme? Jsme tým nezkušených v této oblasti. Dostaneme přiřazeno? = **UAT** | **Schváleno** | Strategie kap. 2 |
| **Identita aplikace** | Populon Core - představení real app na 1. konzultaci | Cílová testovací aplikace je ve volném výběru, lze i excel? | K ověření | `demo.populon.app` |
| **Členství** | Opakovaná přihláška bývalého člena | Nesmí vzniknout duplicitní členství = lze na stejný mail, ale ne UserName, upozornění na duplicitu, lze i obnovit členství | Nápad | `REQ-SOC-06` |
| **Členství** | Jedna osoba ve více spolcích | Členství musí být nezávislá; může být ve vícero skupinách | Nápad | `REQ-SOC-04` |
| **Oprávnění** | Správce nadřazené organizace | Nemá automaticky práva v podspolku; hierarchie skupin - routy | Nápad | `REQ-SOC-05` |
| **Vlastní pole** | Změna povolených hodnot | Staré uložené hodnoty zůstávají platné. | Nápad | `REQ-FLD-03` |
| **Vlastní pole** | Nové pole u existujícího členství | Pole se má projevit i u starších členství. | Nápad | `REQ-FLD-04` |
| **Aktivity** | Naplněná kapacita akce | Jak se systém zachová při další registraci? | Nápad | `REQ-ACT-01` |
| **Aktivity** | Zrušená akce | Upozornění účastníků a blokace nových registrací. | Otevřené | `REQ-ACT-04` |
| **Oznámení** | Různé úrovně viditelnosti | Neoprávněný uživatel nesmí obsah vidět. | Nápad | `REQ-NOT-02` (`TC-001`–`TC-003`) |
| **Organizace práce** | Rozdělení odpovědností v týmu | Kdo připraví strategii a kdo šablonu? | Otevřené | Strategie kap. 3 |

---

## 4. Mapování na automatizované Playwright E2E testy v repozitáři

Aktuálně implementované automatizované testy ve složce [`tests/`](../tests/), které tvoří základ živého dema:

| Soubor v `tests/` | Pokryté scénáře | Tagy | Stav automatizace |
|---|---|---|---|
| [`tests/auth.spec.ts`](../tests/auth.spec.ts) | • Vykreslení prvků přihlašovacího formuláře<br>• Negativní test: neplatné přihlašovací údaje zobrazí chybový alert<br>• Negativní test: prázdný formulář neautentizuje<br>• Navigace na obnovu hesla (`password-recovery`)<br>• Pozitivní přihlášení platným účtem z `.env`<br>• Odhlášení uživatele (Logout) | `@auth`, `@smoke`, `@regression` | ✅ Hotovo (6 testů) |
| [`tests/search.spec.ts`](../tests/search.spec.ts) | • Přechod na vyhledávání skupin přes navbar (`robot-test="nav:searchGroups"`)<br>• Přímý přístup na `/search`<br>• Vyhledání komunity/skupiny podle dotazu | `@search`, `@smoke`, `@regression` | ✅ Hotovo (3 testy) |
| [`tests/dashboard.spec.ts`](../tests/dashboard.spec.ts) | • Přístup přihlášeného uživatele na Dashboard<br>• Lokalizace: přepnutí jazyka v navigaci (FI ↔ EN) | `@dashboard`, `@smoke`, `@regression` | ✅ Hotovo (2 testy) |
| *Připraveno k rozšíření* | • Scénáře pro skupinu `uu_2026_BQAS_team_1` (`TC-001`, `TC-002`, `TC-003` – Notifications, Activities, Memberships) | `@notifications`, `@tc001` | 🔜 Dle dalších milníků |
