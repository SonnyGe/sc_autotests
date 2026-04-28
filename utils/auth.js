import { request } from '@playwright/test';
import { AuthApi } from '../api/auth.api.js';

export async function getAuthStorageState() {
  const apiContext = await request.newContext({
    baseURL: process.env.API_URL,
  });

  try {
    const authApi = new AuthApi(apiContext);
    await authApi.login(process.env.TEST_EMAIL, process.env.TEST_PASSWORD);
    return await apiContext.storageState();
  } finally {
    await apiContext.dispose();
  }
}

export async function createAuthorizedContext(browser) {
  const storageState = await getAuthStorageState();
  return browser.newContext({ storageState });
}
