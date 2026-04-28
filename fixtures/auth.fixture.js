import { test as base, expect, request } from '@playwright/test';
import { AuthApi } from '../api/auth.api.js';

export const test = base.extend({
  api: async ({}, use) => {
    if (!process.env.API_URL) {
      throw new Error('API_URL is not defined. Please provide .env file');
    }

    const apiContext = await request.newContext({
      baseURL: process.env.API_URL,
    });

    const authApi = new AuthApi(apiContext);
    await authApi.login(process.env.TEST_EMAIL, process.env.TEST_PASSWORD);
    await use(apiContext);
    await apiContext.dispose();
  },

  page: async ({ browser, api }, use) => {
    const storageState = await api.storageState();

    const context = await browser.newContext({
      storageState,
      permissions: ['clipboard-read', 'clipboard-write'],
    });

    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect };
