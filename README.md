# 🎭 Populon Automated Testing Suite

[![Playwright Tests](https://github.com/USERNAME/populon-automated-testing/actions/workflows/playwright.yml/badge.svg)](https://github.com/USERNAME/populon-automated-testing/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.50+-green.svg)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Robust, scalable End-to-End (E2E) automated testing suite for [Populon](https://demo.populon.app/) built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

---

## 📋 Features

- 🏗️ **Page Object Model (POM)**: Clean abstraction layer decoupling tests from DOM selectors and UI implementation.
- ⚡ **Playwright Test Runner**: Native auto-waiting, parallel execution, isolated browser contexts, and trace debugging.
- 🧩 **Custom Test Fixtures**: Dependency-injected page instances (`loginPage`, `dashboardPage`, `searchPage`) via custom fixtures.
- 🛡️ **Environment Configuration**: Secure credential management via `.env` (`dotenv`), preventing secret leakage in public repositories.
- 📊 **Rich Reporting & Artifacts**: Playwright HTML reports, automatic screenshots on failure, and trace recordings.
- 🚀 **GitHub Actions CI/CD**: Pre-configured CI pipeline executing on push/PR with artifact archiving.

---

## 📂 Project Structure

```text
populon-automated-testing/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI workflow
├── src/
│   ├── pages/                     # Page Object Model definitions
│   │   ├── BasePage.ts            # Common base page functionality
│   │   ├── LoginPage.ts           # Login page actions & locators
│   │   ├── DashboardPage.ts       # Post-login dashboard assertions
│   │   └── SearchPage.ts          # Search groups & community exploration
│   └── fixtures/
│       └── testFixtures.ts        # Extended Playwright test runner with fixtures
├── tests/
│   ├── auth.spec.ts               # Authentication & login test scenarios
│   └── search.spec.ts             # Search & navigation test scenarios
├── .env.example                   # Environment variable template
├── .env                           # Local secrets (git-ignored)
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies & npm scripts
├── playwright.config.ts           # Playwright test configuration
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
*(Or run `npx playwright install` to install all browsers: Chromium, Firefox, WebKit).*

### 4. Configure environment variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your test credentials:
```env
BASE_URL=https://demo.populon.app
TEST_USER_EMAIL=your_email@example.com
TEST_USER_PASSWORD=your_password
```

> **Note:** The positive login test will be automatically skipped if `TEST_USER_EMAIL` or `TEST_USER_PASSWORD` is not set in `.env`.

---

## 🧪 Running Tests

| Command | Description |
|---|---|
| `npm test` | Runs all tests in headless mode |
| `npm run test:headed` | Runs tests with visible browser window |
| `npm run test:ui` | Opens Playwright Interactive UI Mode (recommended for debugging) |
| `npm run test:smoke` | Runs only tests tagged with `@smoke` |
| `npm run test:auth` | Runs authentication test suite |
| `npm run test:debug` | Runs tests in Playwright Inspector debug mode |
| `npm run report` | Opens latest HTML test report in browser |
| `npm run lint` | Runs TypeScript type checking |

---

## 📊 Test Scenarios Included

### 🔐 Authentication (`tests/auth.spec.ts`)
- **UI Elements Validation** (`@smoke`): Verifies presence of email, password, submit button, remember me, and branding.
- **Negative Authentication**: Verifies feedback error message when logging in with invalid credentials.
- **Empty Credentials Submission**: Verifies submission validation without input.
- **Password Recovery Navigation**: Verifies redirect to password recovery page.
- **Positive Login** (`@smoke`): Authenticates using `.env` credentials and asserts dashboard load.

### 🔍 Community Search (`tests/search.spec.ts`)
- **Navbar Navigation** (`@smoke`): Verifies clicking *Etsi yhteisö* redirects to `/search`.
- **Direct Navigation**: Verifies `/search` page loads properly with search inputs.

---

## 🔄 CI/CD (GitHub Actions)

When pushed to GitHub, the workflow automatically runs all tests on Ubuntu with Chromium.

To run authenticated tests in GitHub Actions:
1. Navigate to your repository on GitHub.
2. Go to **Settings > Secrets and variables > Actions**.
3. Add the following repository secrets:
   - `BASE_URL`: `https://demo.populon.app`
   - `TEST_USER_EMAIL`: `<your test email>`
   - `TEST_USER_PASSWORD`: `<your test password>`

After every workflow run, the **Playwright HTML Report** is uploaded as an artifact and stored for 14 days.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
