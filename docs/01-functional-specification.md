# 📄 Populon Core — Functional Specification

> **Zdrojový dokument:** `Populon Core — Functional Specification`  
> **Datum a autor:** Oct 3, 2026 · `@Lenka` (Lenka Jendželovská)  
> **Účel tohoto souboru:** Přesný přepis oficiálního zadání a funkční specifikace systému Populon Core doplněný o jednoznačné identifikátory požadavků (`REQ-*`) pro snadné odkazování z Testovacích případů (`docs/03-test-cases.md`) a Testovací strategie (`docs/02-test-strategy.md`).

---

## 1. Originální znění specifikace (Verbatim)

### Overview
Populon is a membership-management platform for societies — clubs, associations and similar member organisations — to manage memberships, communicate with members, and run activities. This document describes its intended functionality at a conceptual level, as the basis for a detailed implementation discussion with the development team.

**Scope:** Societies & Membership, Custom Member Data Fields, Activities, and Notifications. Items not covered here are listed under Out of Scope at the end.

---

### Societies & Membership
A Society is a group that people and companies can belong to; societies can be organized into a hierarchy, where a parent society (a "union") has one or more subsocieties.

- A user may hold a **Member** membership (an individual) or represent a **Company** membership (one or more people act as its representatives).
- A membership shall move through a lifecycle: `application submitted` → `approved` or `rejected` → `active` → `renewed`, `expired`, `cancelled`, or `resigned`.
- A single user may hold multiple memberships at once across different societies, including being a member of both a parent union and one of its subsocieties simultaneously.
- Each society shall have its own admins. An admin of a union shall **not** automatically become an admin of its subsocieties — admin rights must be granted per society.
- When a user requests to join a society they already have a membership record for (in any status, including expired or resigned), the system shall find and offer to reactivate that existing membership rather than create a duplicate.

---

### Custom Member Data Fields
A society admin shall be able to define custom data fields ("features") to collect additional information from members, without any code change.

- Each feature has: a name, an optional description, a data type (`string` / `integer` / `decimal` / `date`), an optional list of allowed values restricting what a member may enter, a flag marking it as a **system feature** (managed by the platform, not editable by the society admin) versus a society-defined feature, and a **visibility level**.
- Visibility levels shall include at least:
  - visible to everyone who can view the member,
  - visible to the member only,
  - visible to society admins only, and
  - invisible (used internally, never shown to anyone).
- Restricting or changing a feature's allowed values shall affect only new or changed answers — values already stored shall never be invalidated retroactively.
- A feature's value shall be visible and editable (where the visibility level allows) on every membership it applies to, including memberships that existed in the society before the feature itself was created.

---

### Activities
A society shall be able to create Activities (events) for its members, each with a scheduled date range, an optional participation fee, and an optional maximum number of participants.

- Each activity has a visibility level, at minimum:
  - visible to everyone (including users with no society membership at all),
  - visible to any registered/logged-in user,
  - visible to members of the organizing society only,
  - visible only to a hand-picked list of members, and
  - visible to admins only.
- A member shall be able to join or decline an activity they can see. The system shall track each participant's state (e.g. `invited`, `accepted`, `declined`, `joined by themselves`).
- Cancelling an activity shall notify its existing participants and block any new registrations.

---

### Notifications
A society admin shall be able to publish Notifications to communicate with members — news, announcements, reminders.

- Each notification has a visibility level controlling its audience, at minimum:
  - visible to everyone (including anonymous site visitors),
  - visible to any registered user,
  - visible to all members of the organizing society,
  - visible only to a hand-picked list of members, and
  - visible to admins of the organizing society only.
- Members shall optionally receive eligible notifications as push messages, in addition to seeing them in-app.

---

### Out of Scope
The following areas exist in the wider product vision but are not covered by this initial specification:

- The Suomi.fi self-registration and guardian/renewal flow for Helsinki city youth centres.
- The native mobile app.
- The reporting application.
- Payment processing details beyond what is needed to understand an Activity's participation fee.

---

## 2. Strukturovaný katalog požadavků (Requirement Matrix)

Pro přehledné mapování v Testovacích případech (pole `Požadavek / reference`) jsou požadavky ze specifikace rozděleny do jednoznačných identifikátorů:

| ID požadavku | Oblast | Stručný popis požadavku (CZ) | Riziko / Priorita |
|---|---|---|---|
| **REQ-SOC-01** | Societies & Membership | Hierarchie spolků: nadřazený spolek (`union`) může mít jeden nebo více podspolků (`subsocieties`). | High |
| **REQ-SOC-02** | Societies & Membership | Typy členství: individuální (`Member`) nebo firemní (`Company` s jedním či více zástupci). | Medium |
| **REQ-SOC-03** | Societies & Membership | Životní cyklus členství: `application submitted` → `approved` / `rejected` → `active` → `renewed` / `expired` / `cancelled` / `resigned`. | High |
| **REQ-SOC-04** | Societies & Membership | Souběžná členství: jeden uživatel může mít více nezávislých členství v různých spolcích (včetně `union` i `subsociety` současně). | High |
| **REQ-SOC-05** | Societies & Membership | Izolace admin práv: admin nadřazeného spolku (`union`) se **nestává** automaticky adminem podspolků (`subsocieties`). | **Critical** |
| **REQ-SOC-06** | Societies & Membership | Prevence duplicitního členství: při opakované žádosti o vstup (i po `expired` / `resigned`) systém nabídne reaktivaci existujícího záznamu místo vytvoření duplicity. | High |
| **REQ-FLD-01** | Custom Member Data Fields | Definice vlastního pole (`feature`) adminem: název, volitelný popis, datový typ (`string`, `integer`, `decimal`, `date`), povolené hodnoty, příznak `system feature` vs. `society-defined`, úroveň viditelnosti. | High |
| **REQ-FLD-02** | Custom Member Data Fields | Úrovně viditelnosti vlastních polí: (1) všichni, kdo vidí člena, (2) pouze daný člen, (3) pouze admini spolku, (4) neviditelné (interní). | **Critical** |
| **REQ-FLD-03** | Custom Member Data Fields | Změna povolených hodnot: omezení/úprava povolených hodnot ovlivní jen nové/měněné odpovědi – dříve uložené hodnoty nejsou retroaktivně zneplatněny. | High |
| **REQ-FLD-04** | Custom Member Data Fields | Zpětná dostupnost pole: nové vlastní pole je viditelné a editovatelné (dle oprávnění) i u členství, která vznikla před vytvořením pole. | High |
| **REQ-ACT-01** | Activities | Vytvoření aktivity (události): termín od–do, volitelný účastnický poplatek, volitelná maximální kapacita účastníků. | Medium |
| **REQ-ACT-02** | Activities | 5 úrovní viditelnosti aktivity: (1) všichni vč. nepřihlášených, (2) jakýkoliv přihlášený uživatel, (3) pouze členové pořádajícího spolku, (4) ručně vybraný seznam členů, (5) pouze admini. | **Critical** |
| **REQ-ACT-03** | Activities | Účast na aktivitě a sledování stavů: člen se může přihlásit/odmítnout; systém eviduje stav (`invited`, `accepted`, `declined`, `joined by themselves`). | Medium |
| **REQ-ACT-04** | Activities | Zrušení aktivity: zrušení akce odešle notifikaci stávajícím účastníkům a zablokuje jakékoliv nové registrace. | High |
| **REQ-NOT-01** | Notifications | Publikace notifikací adminem spolku: novinky, oznámení, připomínky (vč. časování `Release date` a volitelného `Ending date`). | Medium |
| **REQ-NOT-02** | Notifications | 5 úrovní viditelnosti notifikací: (1) všichni vč. anonymních návštěvníků, (2) jakýkoliv registrovaný uživatel, (3) všichni členové pořádajícího spolku, (4) ručně vybraný seznam členů, (5) pouze admini pořádajícího spolku. | **Critical** |
| **REQ-NOT-03** | Notifications | Kanály doručení: kromě zobrazení v aplikaci (in-app) mohou členové volitelně dostávat notifikace jako push zprávy. | Low |
