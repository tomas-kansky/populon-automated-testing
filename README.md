# 🎭 Populon Automated E2E Testing Suite

[![Playwright Tests](https://github.com/USERNAME/populon-automated-testing/actions/workflows/playwright.yml/badge.svg)](https://github.com/USERNAME/populon-automated-testing/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.50+-green.svg)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Enterprise-grade End-to-End (E2E) automated testing suite for [Populon](https://demo.populon.app/) built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

---

## 📋 Key Architecture & Features

- 🏗️ **Page Object Model (POM)**: Complete UI abstraction layer (`BasePage`, `LoginPage`, `DashboardPage`, `SearchPage`).
- ⚡ **Playwright Test Runner**: Fast parallel execution, auto-wait mechanics, isolated browser contexts, and trace debugging.
- 🧩 **Custom Test Fixtures**: Dependency-injected page instances (`loginPage`, `dashboardPage`, `searchPage`) via custom fixtures.
- ⏰ **Scheduled Synthetic Monitoring**: Daily scheduled runs at 06:00 UTC via GitHub Actions cron to continuously monitor application availability.
- 🏷️ **Tag-based Suite Filtering**: Fine-grained execution via tags (`@smoke`, `@regression`, `@auth`, `@search`, `@dashboard`).
- 🛡️ **Zero Secret Leakage**: Environment-driven credentials via `.env` locally and GitHub Secrets in CI/CD.
- 📊 **Rich Artifacts**: HTML reports, screenshots on failure, and trace recordings.

---

## 📂 Project Structure

```text
populon-automated-testing/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI & Scheduled Cron
├── src/
│   ├── pages/                     # Page Object Model classes
│   │   ├── BasePage.ts            # Common methods (language switcher, wait helpers)
│   │   ├── LoginPage.ts           # Login screen locators and actions
│   │   ├── DashboardPage.ts       # Authenticated dashboard verifications & logout
│   │   └── SearchPage.ts          # Search groups & community exploration
│   └── fixtures/
│       └── testFixtures.ts        # Extended Playwright test fixtures
├── tests/
│   ├── auth.spec.ts               # Authentication tests (positive, negative, recovery, logout)
│   ├── search.spec.ts             # Community search & exploration tests
│   └── dashboard.spec.ts          # Authenticated dashboard & localization tests
├── .env.example                   # Environment variable template
├── .env                           # Local credentials (git-ignored)
├── .gitignore                     # Git ignore rules
├── package.json                   # NPM dependencies and scripts
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript compiler settings
└── README.md                      # Documentation
```

---

## 🛠️ Prerequisites

- **Node.js**: v18.x or newer (recommended LTS)
- **npm**: v9.x or newer

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/USERNAME/populon-automated-testing.git
cd populon-automated-testing
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browser binaries
```bash
npx playwright install chromium
```

### 4. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
BASE_URL=https://demo.populon.app
TEST_USER_EMAIL=your_email@example.com
TEST_USER_PASSWORD=your_password
```

---

## 🧪 Running Tests Locally

| Command | Description |
|---|---|
| `npm test` | Run all test suites in headless mode |
| `npm run test:smoke` | Run only core smoke tests (`@smoke`) |
| `npm run test:regression` | Run regression tests (`@regression`) |
| `npm run test:auth` | Run authentication test suite |
| `npm run test:search` | Run community search test suite |
| `npm run test:dashboard` | Run dashboard & navigation test suite |
| `npm run test:ui` | Open Playwright interactive UI mode |
| `npm run test:headed` | Run tests with browser window visible |
| `npm run report` | Open latest HTML test report |
| `npm run lint` | Run TypeScript type checks (`tsc --noEmit`) |

---

## 📊 Test Scenarios Overview

### 🔐 Authentication (`tests/auth.spec.ts`)
- **UI Elements Validation** (`@smoke`): Verifies login form inputs, labels, branding, recovery links.
- **Negative Authentication** (`@regression`): Asserts error alert feedback on incorrect credentials.
- **Empty Credentials Submission** (`@regression`): Validates prevented authentication on blank submission.
- **Password Recovery Navigation** (`@regression`): Validates redirect to `/password-recovery`.
- **Positive Login** (`@smoke`): Authenticates using `.env` credentials and asserts dashboard load.
- **Session Logout** (`@smoke`): Terminates user session and verifies redirect.

### 🔍 Community Search (`tests/search.spec.ts`)
- **Navbar Search** (`@smoke`): Validates `nav:searchGroups` link redirection to `/search`.
- **Direct Search Page** (`@regression`): Direct URL access and editable input check.
- **Search Execution** (`@regression`): Submits query and checks result container.

### 📈 Dashboard & Navigation (`tests/dashboard.spec.ts`)
- **Dashboard Access** (`@smoke`): Verifies authenticated dashboard content.
- **Localization** (`@regression`): Verifies language switching across navbar links.

---

## ⏰ CI/CD & Scheduled Cron (GitHub Actions)

The workflow [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs:
1. **On Push & Pull Request** to `main`.
2. **On Schedule (Cron)**: Daily at **06:00 UTC** (`0 6 * * *`).
3. **Manual Trigger (`workflow_dispatch`)**: Choose specific suites (`smoke`, `regression`, `auth`, `search`, `dashboard`, `all`).

### Setting up GitHub Secrets:
In your repository: **Settings > Secrets and variables > Actions**:
- `BASE_URL`: `https://demo.populon.app`
- `TEST_USER_EMAIL`: `<demo user email>`
- `TEST_USER_PASSWORD`: `<demo user password>`

Test reports are uploaded as GitHub workflow artifacts and retained for 14 days.

---

## 📜 License

MIT License - see the [LICENSE](LICENSE) file for details.
