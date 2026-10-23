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

## 2. Vypracované Testovací případy v šabloně (2. milník)

Níže jsou vybrané nejdůležitější **Business Test Casy** týmu `uu_2026_BQAS_team_1`. Každý testovací případ je detailně vyplněn v naší **12polové šabloně** a odpovídá jednomu členovi týmu:
- **`TC-001 (MK)`** — Matěj Kollár (Modul: *Notifications*)
- **`TC-002 (AS)`** — Adam Šolc (Modul: *Notifications & RBAC*)
- **`TC-003 (JM)`** — Jan Mach (Modul: *Notifications & Release timing*)
- **`TC-004 (TK)`** — Tomáš Kanský (Moduly: *Societies & Membership* + *Member Data Fields*)

---

### 📋 Šablona pro TC-001 (MK): Vytvoření a zobrazení notifikace ve skupině

| Pole šablony | Hodnota a specifikace |
|---|---|
| **TC-ID** | `TC-001 (MK)` |
| **Název** | Vytvoření a zobrazení notifikace ve skupině |
| **Požadavek / reference** | `Populon → Administration → Notifications → vytvoření notifikace` (`REQ-NOT-01`, `REQ-NOT-02`) |
| **Cíl testu** | Ověřit, že administrátor může vyplnit povinné údaje, určit viditelnost pro členy skupiny, zkontrolovat souhrn, uložit notifikaci a zobrazit ji v přehledu i detailu skupiny. |
| **Priorita** | `Vysoká` |
| **Předpoklady** | Administrátor je přihlášen do Populonu a spravuje skupinu `uu_2026_BQAS_team_1`. Je otevřena její administrace a sekce `Notifications`. |
| **Testovací data** | • **Skupina:** `uu_2026_BQAS_team_1`<br>• **Title:** `První testovací notifikace`<br>• **Description:** `v rámci prvního use casu, vytvářím první notifikaci pro seznámení se systémem`<br>• **Text:** `Notifikace mají v Basic info čtyři povinná pole, Title, Description, Text a Release date, jedno volitelné a to Ending date. Další záložky jsou Visibility and receivers a Summary.`<br>• **Release date:** `11/10/2026 21:48`<br>• **Ending date:** *(prázdné)*<br>• **Visibility:** `Only to members of group`<br>• **Send to new members:** `No` |
| **Kroky** | 1. V administraci skupiny otevřít `Notifications` a zahájit vytvoření notifikace.<br>2. V `Basic info` vyplnit `Title`, `Description`, `Text` a `Release date` podle testovacích dat; `Ending date` nechat prázdné.<br>3. Přejít na `Visibility & receivers` a nastavit `Only to members of group`; `Send to new members` ponechat vypnuté.<br>4. Přejít na `Summary` a zkontrolovat zadané hodnoty.<br>5. Kliknout na `Save`.<br>6. Otevřít stránku skupiny `uu_2026_BQAS_team_1`, záložku `Notifications`.<br>7. Otevřít notifikaci `První testovací notifikace` a ověřit její detail. |
| **Očekávaný výsledek** | 1. Průvodce umožní vytvoření notifikace ve třech krocích.<br>2. Povinná pole přijmou platné údaje; `Ending date` lze ponechat prázdné.<br>3. Lze nastavit viditelnost pouze pro členy skupiny; nové členy není nutné zahrnout.<br>4. `Summary` zobrazí správně název, popis, text, data i viditelnost.<br>5. Uložení proběhne a notifikace je dostupná ve skupině po čase zveřejnění.<br>6. V záložce `Notifications` se zobrazí nová notifikace s odpovídajícím názvem.<br>7. Detail zobrazuje správně její název, popis a text. |
| **Skutečný výsledek** | Skutečný výsledek odpovídá očekávanému. Notifikace se zobrazuje v timeline skupiny i v detailu se zadaným textem. |
| **Výsledek / stav** | `PASS` |
| **ID vady / poznámka** | — (automatizováno v `tests/scenarios.spec.ts`) |

---

### 📋 Šablona pro TC-002 (AS): Viditelnost notifikace pouze pro členy skupiny

| Pole šablony | Hodnota a specifikace |
|---|---|
| **TC-ID** | `TC-002 (AS)` |
| **Název** | Viditelnost notifikace pouze pro členy skupiny |
| **Požadavek / reference** | `Populon → Administration → Notifications → Visibility & receivers (Only to members of group)` (`REQ-NOT-02`) |
| **Cíl testu** | Ověřit, že notifikace s nastavenou viditelností `Only to members of group` je viditelná pro aktivního člena skupiny `uu_2026_BQAS_team_1`, ale není viditelná pro nepřihlášeného návštěvníka ani pro přihlášeného uživatele mimo skupinu (ani přes přímý URL odkaz). |
| **Priorita** | `Vysoká` |
| **Předpoklady** | Ve skupině `uu_2026_BQAS_team_1` existuje publikovaná notifikace (`První testovací notifikace` z `TC-001`) s viditelností `Only to members of group`. Tester má k dispozici účet člena a přímou URL detailu notifikace. |
| **Testovací data** | • **Skupina:** `uu_2026_BQAS_team_1`<br>• **Notifikace:** `První testovací notifikace`<br>• **Přímá URL:** `https://demo.populon.app/notificationcard?notificationId=7447`<br>• **Role 1:** Aktivní člen skupiny `uu_2026_BQAS_team_1`<br>• **Role 2:** Anonymní (nepřihlášený) uživatel |
| **Kroky** | 1. Přihlásit se jako aktivní člen skupiny, otevřít stránku skupiny `uu_2026_BQAS_team_1` → záložku `Notifications` a zkopírovat přímou URL detailu notifikace.<br>2. Odhlásit se z aplikace a jako nepřihlášený (anonymní) návštěvník otevřít veřejný profil skupiny `uu_2026_BQAS_team_1` → záložku `Notifications`.<br>3. Jako nepřihlášený návštěvník zadat přímo do adresního řádku prohlížeče zkopírovanou URL detailu notifikace (`notificationId=7447`). |
| **Očekávaný výsledek** | 1. Člen skupiny notifikaci vidí v přehledu `Notifications` a může zobrazit její plný detail.<br>2. Nepřihlášený návštěvník notifikaci v přehledu skupiny nevidí (zobrazuje se `No new notifications`).<br>3. Přímá URL detailu neumožní zobrazení obsahu, zobrazí upozornění o nedostatečných oprávněních (`This page has restricted access and you don't have permission to see it at the moment. Please, log in.`) a vyžaduje přihlášení. |
| **Skutečný výsledek** | Skutečný výsledek odpovídá očekávanému. Člen notifikaci vidí, anonymnímu návštěvníkovi se v přehledu nezobrazuje a přímá URL detailu zablokuje přístup. |
| **Výsledek / stav** | `PASS` |
| **ID vady / poznámka** | — (automatizováno v `tests/scenarios.spec.ts`) |

---

### 📋 Šablona pro TC-003 (JM): Časování: Notifikace se před Release date nezobrazí a po něm ano

| Pole šablony | Hodnota a specifikace |
|---|---|
| **TC-ID** | `TC-003 (JM)` |
| **Název** | Časování: Notifikace se před Release date nezobrazí a po něm ano |
| **Požadavek / reference** | `Populon → Administration → Notifications → Basic info (Release date)` (`REQ-NOT-01`, `REQ-NOT-02`) |
| **Cíl testu** | Ověřit, že notifikace s `Release date` v budoucnosti není členovi skupiny dostupná před časem zveřejnění a po jeho uplynutí se zobrazí. |
| **Priorita** | `Vysoká` |
| **Předpoklady** | Správce je přihlášen do Populonu a spravuje skupinu `uu_2026_BQAS_team_1`, je otevřena sekce `Notifications`. K dispozici je testovací účet člena stejné skupiny. |
| **Testovací data** | • **Skupina:** `uu_2026_BQAS_team_1`<br>• **Notification title:** `Druhá testovací notifikace - budoucí vydání`<br>• **Release date:** `24/10/2026 10:00`<br>• **Visibility:** `Only to members of group`<br>• **Send to new members:** `No` |
| **Kroky** | 1. Jako správce vytvořit notifikaci podle testovacích dat (`Release date: 24/10/2026 10:00`).<br>2. Na záložce `Visibility & receivers` nastavit `Only to members of group`, `Send to new members` vypnuto.<br>3. Na `Summary` zkontrolovat hodnoty a kliknout na `Save`.<br>4. Otevřít `Notifications` v administraci skupiny a zkopírovat URL detailu notifikace.<br>5. Přihlásit se jako člen skupiny před `24/10/2026 10:00`, otevřít záložku `Notifications` skupiny a zkusit i zkopírovaný odkaz.<br>6. Po `24/10/2026 10:00` stránku obnovit a znovu otevřít záložku `Notifications`.<br>7. Otevřít detail notifikace. |
| **Očekávaný výsledek** | 1. Formulář přijme údaje a notifikace se uloží.<br>2. Viditelnost je nastavena pro členy skupiny.<br>3. Správce notifikaci v administraci vidí i před časem vydání.<br>4. Člen notifikaci před `Release date` nevidí v přehledu ani přes přímý odkaz.<br>5. Po uplynutí `Release date` se notifikace v přehledu skupiny i na dashboardu člena zobrazí.<br>6. Detail notifikace zobrazuje správně název, popis a text. |
| **Skutečný výsledek** | Skutečný výsledek odpovídá očekávanému. Notifikace před `Release date` není pro člena viditelná v přehledu ani přes URL; notifikace po `Release date` se zobrazuje v přehledu skupiny i na dashboardu. |
| **Výsledek / stav** | `PASS` |
| **ID vady / poznámka** | — (automatizováno v `tests/scenarios.spec.ts`) |

---

### 📋 Šablona pro TC-004 (TK): Správa členských údajů, prevence duplicitní přihlášky a ochrana viditelnosti karty člena

| Pole šablony | Hodnota a specifikace |
|---|---|
| **TC-ID** | `TC-004 (TK)` |
| **Název** | Správa členských údajů (Member information), prevence duplicitní přihlášky a ochrana viditelnosti karty člena |
| **Požadavek / reference** | `Populon → Society → Basic info → Member information → Edit` (`REQ-SOC-06`, `REQ-FLD-02`, `REQ-FLD-04`) |
| **Cíl testu** | Ověřit, že aktivní člen skupiny `uu_2026_BQAS_team_1` nemá na kartě skupiny možnost odeslat duplicitní přihlášku (vidí odkaz `Member information` na své existující členství), může na své členské kartě upravit a uložit členské údaje (adresu a souhlas se zobrazením), a že členská karta (`membercard`) je chráněna proti neoprávněnému zobrazení nepřihlášeným uživatelem. |
| **Priorita** | `Vysoká` |
| **Předpoklady** | Člen (`Tomáš Kanský`) je přihlášen do Populonu a má aktivní členství ve skupině `uu_2026_BQAS_team_1` (`societyId=4516`, `memberId=24096`). |
| **Testovací data** | • **Skupina:** `uu_2026_BQAS_team_1`<br>• **Karta člena:** `/membercard?memberId=24096`<br>• **Street address:** `Parukářka 4`<br>• **Zip code:** `130 00`<br>• **City:** `Praha 3`<br>• **Country:** `Czechia` (`CZ`)<br>• **Allow to display personal data in attendee lists:** `Ano (zaškrtnuto)` |
| **Kroky** | 1. Přihlásit se jako aktivní člen skupiny `uu_2026_BQAS_team_1` a z horní navigace (`My groups`) otevřít stránku skupiny `uu_2026_BQAS_team_1`.<br>2. V sekci `Basic info` skupiny ověřit, že systém nenabízí tlačítko pro novou registraci do skupiny (`Join group`), ale zobrazuje tlačítko `Member information` pro přístup k existujícímu členství.<br>3. Kliknout na `Member information` a otevřít členskou kartu (`membercard`) přihlášeného člena.<br>4. Kliknout na `Edit`, ve formuláři `Member information` vyplnit `Street address`, `Zip code`, `City` a zapnout volbu `Allow to display personal data in attendee lists`, a kliknout na `Save`.<br>5. Ověřit zobrazení potvrzovací hlášky `Data saved!`, zkontrolovat zobrazení na přehledové kartě člena a po opětovném otevření `Edit` ověřit, že uložené hodnoty zůstaly v polích formuláře zachovány.<br>6. Zkopírovat přímou URL adresu členské karty (`/membercard?memberId=24096`) a odhlásit se z aplikace.<br>7. Jako nepřihlášený uživatel zadat do prohlížeče zkopírovanou URL členské karty (`/membercard?memberId=24096`). |
| **Očekávaný výsledek** | 1. Stránka skupiny `uu_2026_BQAS_team_1` se načte.<br>2. Tlačítko pro podání duplicitní přihlášky není zobrazeno; je viditelné tlačítko `Member information`.<br>3. Zobrazí se detail členské karty s kontaktními údaji člena a záložkami `Activities` a `Notifications`.<br>4. Formulář přijme zadané členské údaje a umožní jejich uložení.<br>5. Systém zobrazí potvrzení `Data saved!`, hodnoty jsou ve formuláři perzistentně uloženy a adresa se zobrazí i na přehledové kartě člena.<br>6. Uživatel je úspěšně odhlášen.<br>7. Systém zablokuje přístup k osobním údajům člena, zobrazí varování `This page has restricted access and you don't have permission to see it at the moment. Please, log in.` a osobní údaje člena nevykreslí. |
| **Skutečný výsledek** | Kroky 1–4 a 6–7 prošly (prevence duplicity i ochrana osobních údajů před nepřihlášeným uživatelem fungují správně). V kroku 5 se zobrazí `Data saved!` a hodnoty v databázi zůstanou, avšak na přehledové kartě člena se u ikony adresy vykreslí pouze `CZ` bez ulice a města. |
| **Výsledek / stav** | `PASS` *(s evidovanou vadou `BUG-001`)* |
| **ID vady / poznámka** | `BUG-001` (automatizováno v `tests/scenarios.spec.ts`) |

---

## 3. Souhrnná tabulka Test Casů (pro export do Excelu / uuManagementKit)

| TC-ID | Název | Požadavek / reference | Cíl testu | Priorita | Předpoklady | Testovací data | Kroky | Očekávaný výsledek | Skutečný výsledek | Výsledek / stav | ID vady / poznámka |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **TC-001 (MK)** | Vytvoření a zobrazení notifikace ve skupině | `REQ-NOT-01`, `REQ-NOT-02` | Ověřit vytvoření notifikace adminem, určení viditelnosti pro členy a její zobrazení ve skupině. | Vysoká | Správce přihlášen, spravuje skupinu `uu_2026_BQAS_team_1`, otevřeny `Notifications`. | Skupina `uu_2026_BQAS_team_1`, Title: První testovací notifikace, Visibility: Only to members of group | 1. Otevřít Notifications. 2. Vyplnit Basic info. 3. Nastavit Visibility. 4. Zkontrolovat Summary. 5. Save. 6. Otevřít skupinu. 7. Ověřit detail. | 1. 3krokový průvodce. 2. Pole přijmou data. 3. Viditelnost nastavena. 4. Summary správné. 5. Uloženo. 6. Zobrazeno v záložce. 7. Detail odpovídá. | Notifikace je vytvořena a zobrazuje se členům skupiny. | **PASS** | — |
| **TC-002 (AS)** | Viditelnost notifikace pouze pro členy skupiny | `REQ-NOT-02` | Ověřit, že notifikaci `Only to members of group` vidí člen skupiny, ale nevidí ji nepřihlášený uživatel (ani přes přímou URL). | Vysoká | Ve skupině existuje notifikace z TC-001 s viditelností pro členy. | Účet člena, přímá URL `/notificationcard?notificationId=7447` | 1. Zkontrolovat jako člen a zkopírovat URL. 2. Odhlásit se a otevřít Notifications skupiny. 3. Otevřít přímou URL jako anonym. | 1. Člen notifikaci vidí. 2. Anonym ji v přehledu nevidí. 3. Přímá URL odepře přístup a vyzve k přihlášení. | Člen notifikaci vidí, anonymnímu návštěvníkovi se v přehledu nezobrazuje a přímá URL zablokuje přístup. | **PASS** | — |
| **TC-003 (JM)** | Časování: Notifikace se před Release date nezobrazí a po něm ano | `REQ-NOT-01`, `REQ-NOT-02` | Ověřit, že notifikace s Release date v budoucnosti není členovi dostupná před časem zveřejnění a po něm ano. | Vysoká | Správce přihlášen do skupiny `uu_2026_BQAS_team_1`, účet člena k dispozici. | Title: Druhá testovací notifikace, Release date: 24/10/2026 10:00, Visibility: Only to members | 1. Vytvořit notifikaci s budoucím datem. 2. Nastavit viditelnost. 3. Save. 4. Zkopírovat URL. 5. Přihlásit se jako člen před časem vydání. 6. Obnovit po čase vydání. 7. Otevřít detail. | 1. Notifikace uložena. 2. Viditelná pro admina. 3. Člen ji před časem nevidí v přehledu ani přes URL. 4. Po Release date se zobrazí. 5. Detail odpovídá. | Notifikace před Release date není pro člena viditelná; po uplynutí času vydání se zobrazuje v přehledu i v detailu. | **PASS** | — |
| **TC-004 (TK)** | Správa členských údajů, prevence duplicity a ochrana viditelnosti | `REQ-SOC-06`, `REQ-FLD-02`, `REQ-FLD-04` | Ověřit prevenci duplicitního členství, možnost editace a uložení členských údajů a ochranu URL karty člena před anonymním uživatelem. | Vysoká | Člen přihlášen, aktivní členství ve skupině `uu_2026_BQAS_team_1` (`memberId=24096`). | Parukářka 4, 130 00 Praha 3, CZ, Allow to display: Yes | 1. Otevřít skupinu z My groups. 2. Zkontrolovat nepřítomnost Join group. 3. Otevřít Member info. 4. Editovat adresu a Save. 5. Zkontrolovat uložení. 6. Odhlásit se. 7. Otevřít URL člena jako anonym. | 1. Skupina načtena. 2. Nabídnuto Member info místo registrace. 3. Karta člena otevřena. 4. Formulář přijme data. 5. Data saved a uloženo. 6. Odhlášeno. 7. Odepření přístupu k osobním údajům. | Prevence duplicity i ochrana dat funguje. Po uložení se zobrazí Data saved!, na přehledu karty se však zobrazí jen CZ bez adresy (`BUG-001`). | **PASS** | `BUG-001` |

---

## 3. Otevřené otázky a nápady na další Test Casy (`BQAS | Otevřené otázky a nápady`)

> Přesná kopie diskusního listu z týmového Excelu (*„Diskusní pracovní list • nápady nejsou hotové testy ani schválené požadavky • Co nás napadlo, co je třeba rozhodnout?“*):

| Oblast | Námět | Otázka / hypotéza k diskusi | Stav | Vazba na požadavek |
|---|---|---|---|---|
| **Výběr týmového tématu** | FAT/SIT – agilní vs. FAT/SIT – vodopád - nezávislý testovací tým, (DEV) součást vývoje, (UAT) za zákazníka | Jaký přístup nejlépe obhájíme? Jsme tým nezkušených v této oblasti. Dostaneme přiřazeno? = **UAT** | **Schváleno** | Strategie kap. 2 |
| **Identita aplikace** | Populon Core - představení real app na 1. konzultaci | Cílová testovací aplikace je ve volném výběru, lze i excel? | K ověření | `demo.populon.app` |
| **Členství** | Opakovaná přihláška bývalého člena | Nesmí vzniknout duplicitní členství = lze na stejný mail, ale ne UserName, upozornění na duplicitu, lze i obnovit členství | Nápad | `REQ-SOC-06` (`TC-004`) |
| **Členství** | Jedna osoba ve více spolcích | Členství musí být nezávislá; může být ve vícero skupinách | Nápad | `REQ-SOC-04` |
| **Oprávnění** | Správce nadřazené organizace | Nemá automaticky práva v podspolku; hierarchie skupin - routy | Nápad | `REQ-SOC-05` |
| **Vlastní pole** | Změna povolených hodnot | Staré uložené hodnoty zůstávají platné. | Nápad | `REQ-FLD-03` |
| **Vlastní pole** | Nové pole u existujícího členství | Pole se má projevit i u starších členství. | Nápad | `REQ-FLD-04` (`TC-004`) |
| **Aktivity** | Naplněná kapacita akce | Jak se systém zachová při další registraci? | Nápad | `REQ-ACT-01` |
| **Aktivity** | Zrušená akce | Upozornění účastníků a blokace nových registrací. | Otevřené | `REQ-ACT-04` |
| **Oznámení** | Různé úrovně viditelnosti | Neoprávněný uživatel nesmí obsah vidět. | Nápad | `REQ-NOT-02` (`TC-001`–`TC-003`) |
| **Organizace práce** | Rozdělení odpovědností v týmu | Kdo připraví strategii a kdo šablonu? | Otevřené | Strategie kap. 3 |

---

## 4. Mapování na automatizované Playwright E2E testy v repozitáři

Všechny vypracované týmové scénáře (`TC-001` až `TC-004`) i infrastrukturní testy jsou plně automatizované ve složce [`tests/`](../tests/):

| Soubor v `tests/` | Pokryté scénáře | Tagy | Stav automatizace |
|---|---|---|---|
| [`tests/scenarios.spec.ts`](../tests/scenarios.spec.ts) | • **`TC-001 (MK)`**: Vytvoření a zobrazení notifikace ve skupině `uu_2026_BQAS_team_1`<br>• **`TC-002 (AS)`**: Viditelnost notifikace pouze pro členy skupiny (`Only to members of group` vs. anonymní uživatel a přímá URL)<br>• **`TC-003 (JM)`**: Časování notifikace (`Release date` – nedostupnost před vydáním a zobrazení po vydání)<br>• **`TC-004 (TK)`**: Správa členských údajů (`Member information`), prevence duplicitní přihlášky a ochrana viditelnosti karty člena | `@scenarios`, `@tc001`, `@tc002`, `@tc003`, `@tc004`, `@demo` | ✅ Hotovo (4 E2E scénáře) |
| [`tests/auth.spec.ts`](../tests/auth.spec.ts) | • Vykreslení prvků přihlašovacího formuláře<br>• Negativní test: neplatné přihlašovací údaje zobrazí chybový alert<br>• Negativní test: prázdný formulář neautentizuje<br>• Navigace na obnovu hesla (`password-recovery`)<br>• Pozitivní přihlášení platným účtem z `.env`<br>• Odhlášení uživatele (Logout) | `@auth`, `@smoke`, `@regression` | ✅ Hotovo (6 testů) |
| [`tests/search.spec.ts`](../tests/search.spec.ts) | • Přechod na vyhledávání skupin přes navbar (`robot-test="nav:searchGroups"`)<br>• Přímý přístup na `/search`<br>• Vyhledání komunity/skupiny podle dotazu | `@search`, `@smoke`, `@regression` | ✅ Hotovo (3 testy) |
| [`tests/dashboard.spec.ts`](../tests/dashboard.spec.ts) | • Přístup přihlášeného uživatele na Dashboard<br>• Lokalizace: přepnutí jazyka v navigaci (FI ↔ EN) | `@dashboard`, `@smoke`, `@regression` | ✅ Hotovo (2 testy) |
