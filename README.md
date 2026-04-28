# 📊 Playwright E2E Test Automation

This project contains automated tests for verifying that clicks count in the statistics report increases after opening a referral link.

---

## 🚀 Tech Stack

- **Playwright**
- **Node.js**
- **JavaScript (ES6)**
- **Allure Report**
- **ESLint + Prettier**

---

## 🧠 Test Scenario

The test verifies the following flow:

1. Authenticate user via API
2. Get current clicks count from statistics API
3. Open dashboard page
4. Copy referral link
5. Open referral link (simulates user visit)
6. Open statistics page
7. Apply "Today" filter
8. Wait until report updates
9. Verify that clicks count increased by 1

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

---

### 2. Configure environment variables (⚠️ Required)

This project requires a `.env` file to run.
Create a `.env` file in the root directory with the following variables:

```env
BASE_URL=https://stripcash.com
API_URL=https://api.stripcash.com

TEST_EMAIL=your_email
TEST_PASSWORD=your_password
```

---

## ▶️ Running Tests Locally

```bash
npm test
```

---

## 📊 Allure Report

Generate report:

```bash
npm run allure:generate
```

Open report:

```bash
npm run allure:open
```

---

## 🐳 Running in Docker

🔹 Option 1: Using prebuilt image (recommended).
This approach builds an image with the project inside.
It ensures consistent and reproducible execution (similar to CI/CD).

Build image:

```bash
docker build -t playwright-tests .
```

Run tests:

```bash
docker run --rm --env-file .env playwright-tests
```

🔹 Option 2: Using mounted volume.
This approach runs tests using the project files from the host machine.

```bash
docker run --rm -it \
  -v $PWD:/app \
  -w /app \
  --env-file .env \
  mcr.microsoft.com/playwright:v1.59.1-jammy \
  sh -c "npm install && npx playwright test"
```

---

## 🧪 Project Structure

```
api/        → API layer (auth, statistics)
fixtures/   → custom Playwright fixtures (API auth, context setup)
pages/      → Page Objects (UI interactions)
tests/      → test scenarios
utils/      → helper functions
```

---

## 🧩 Key Design Decisions

### ✅ API-based authentication

Authentication is performed via API and injected into browser context using `storageState`.
This makes tests faster and more stable compared to UI login.

---

### ✅ Separation of concerns

- **Tests** → business logic
- **Page Objects** → UI interaction & synchronization
- **API layer** → data retrieval

---

### ✅ Polling for async updates

Statistics are not updated instantly, so `expect.poll` is used to wait until backend processing is complete and UI reflects the new value.

---
