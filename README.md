# 🎭 Populon Automated E2E Testing Suite

<p align="center">
  <a href="https://github.com/tomas-kansky/populon-automated-testing/actions/workflows/playwright.yml">
    <img src="https://github.com/tomas-kansky/populon-automated-testing/actions/workflows/playwright.yml/badge.svg" alt="Playwright Tests" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.7+-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://playwright.dev/">
    <img src="https://img.shields.io/badge/Playwright-v1.50+-2EAD33.svg?logo=playwright&logoColor=white" alt="Playwright" />
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-v20+-339933.svg?logo=node.js&logoColor=white" alt="Node.js" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
  </a>
</p>

An automated End-to-End (E2E) test automation suite designed for [Populon](https://demo.populon.app/) (association, sports club & community management platform). Built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern, featuring automated synthetic monitoring via **GitHub Actions**.

---

## 🌟 Highlights

- 🏛️ **Page Object Model (POM)**: Robust architecture cleanly separating test specifications from application locators and UI logic.
- ⚡ **Playwright Framework**: High-performance test execution with built-in auto-waiting, isolated browser contexts, and trace debugging.
- 🧩 **Custom Test Fixtures**: Dependency-injected page instances (`loginPage`, `dashboardPage`, `searchPage`) via typed Playwright fixtures.
- ⏰ **Scheduled Synthetic Monitoring**: GitHub Actions cron triggers a daily healthcheck at **06:00 UTC** to ensure demo availability.
- 🏷️ **Tag-based Filtering**: Flexible execution via `@smoke`, `@regression`, `@auth`, `@dashboard`, and `@search` tags.
- 🛡️ **Zero Secret Exposure**: Secure credential handling via `.env` locally and GitHub Secrets in CI/CD.
- 📊 **Rich Artifacts & Tracing**: Automatic generation of HTML test reports, failure screenshots, and full trace recordings.

---

## 📂 Project Structure

```text
populon-automated-testing/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI & Scheduled Cron
├── src/
│   ├── pages/                     # Page Object Model layer
│   │   ├── BasePage.ts            # Common helpers (language switcher, wait methods)
│   │   ├── LoginPage.ts           # Login screen locators, validations & actions
│   │   ├── DashboardPage.ts       # Authenticated dashboard verifications & logout
│   │   └── SearchPage.ts          # Group & community discovery interactions
│   └── fixtures/
│       └── testFixtures.ts        # Extended Playwright test fixture definitions
├── tests/
│   ├── auth.spec.ts               # Authentication suite (positive, negative, recovery, logout)
│   ├── search.spec.ts             # Community search & exploration suite
│   └── dashboard.spec.ts          # Authenticated dashboard & localization suite
├── .env.example                   # Environment variable template
├── .gitignore                     # Git ignore configuration
├── LICENSE                        # MIT License
├── package.json                   # Dependencies and npm scripts
├── playwright.config.ts           # Playwright runner configuration
├── tsconfig.json                  # TypeScript compiler settings
└── README.md                      # Project documentation
```

---

## 🧪 Test Suites & Coverage

| Suite | File | Tags | Scenarios Covered |
|---|---|---|---|
| **Authentication** | `tests/auth.spec.ts` | `@auth`, `@smoke`, `@regression` | • Form controls rendering<br>• Negative: Invalid credentials alert<br>• Negative: Empty credentials submission<br>• Navigation: Password recovery redirect<br>• Positive: Authenticated login from `.env`<br>• Session: User logout sequence |
| **Community Search** | `tests/search.spec.ts` | `@search`, `@smoke`, `@regression` | • Navbar button redirection (`robot-test="nav:searchGroups"`)<br>• Direct URL access to `/search`<br>• Query submission & results check |
| **Dashboard** | `tests/dashboard.spec.ts` | `@dashboard`, `@smoke`, `@regression` | • Authenticated dashboard access<br>• Navbar language switching (FI ↔ EN) |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or newer (LTS recommended)
- **npm**: v9.x or newer

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/tomas-kansky/populon-automated-testing.git
cd populon-automated-testing
npm install
```

Install Playwright browser binaries:
```bash
npx playwright install chromium
```

### 3. Environment Configuration
Create a local `.env` file based on the template:
```bash
cp .env.example .env
```
Fill in your test credentials:
```env
BASE_URL=https://demo.populon.app
TEST_USER_EMAIL=your_email@example.com
TEST_USER_PASSWORD=your_password
```
> **Security Note:** The `.env` file is git-ignored and will never be committed to source control.

---

## 💻 Running Tests Locally

| Command | Description |
|---|---|
| `npm test` | Run all 11 test scenarios in headless mode |
| `npm run test:smoke` | Run core smoke tests (`@smoke`) |
| `npm run test:regression` | Run regression tests (`@regression`) |
| `npm run test:auth` | Run authentication test suite |
| `npm run test:search` | Run community search test suite |
| `npm run test:dashboard` | Run dashboard & navigation test suite |
| `npm run test:ui` | Open Playwright interactive UI mode |
| `npm run test:headed` | Run tests with visible browser window |
| `npm run report` | Open latest HTML test report |
| `npm run lint` | Run TypeScript type checks (`tsc --noEmit`) |

---

## ⏰ CI/CD & Scheduled Cron (GitHub Actions)

The workflow [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs:
1. **Push & Pull Requests**: Automatically on every change to `main`.
2. **Scheduled Cron**: Every day at **06:00 UTC** (`0 6 * * *`) for automated synthetic health monitoring.
3. **Manual Trigger (`workflow_dispatch`)**: Execute specific suites (`all`, `smoke`, `regression`, `auth`, `search`, `dashboard`) directly from the GitHub Actions UI.

### Configuring GitHub Repository Secrets:
To enable authenticated tests in GitHub Actions:
1. Navigate to **Settings > Secrets and variables > Actions** in your GitHub repository.
2. Add the following repository secrets:
   - `BASE_URL`: `https://demo.populon.app`
   - `TEST_USER_EMAIL`: `<your demo user email>`
   - `TEST_USER_PASSWORD`: `<your demo user password>`

HTML reports and failure traces are automatically saved as build artifacts with a 14-day retention period.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Developed by <b>Tomáš Kanský</b>
</p>
