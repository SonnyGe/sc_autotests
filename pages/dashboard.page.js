import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;

    this.headerDropdown = page.locator('[qa-element="header-dropdown"]');
    this.copyLinkBtn = page.getByTestId('LinkAfter');
  }

  async open() {
    await this.page.goto('/overview/dashboard', {
      waitUntil: 'domcontentloaded',
    });
    await expect(this.headerDropdown).toBeVisible();
  }

  async openReferralLinkFromClipboard() {
    await this.copyLinkBtn.click();

    const link = await this.page.evaluate(() => navigator.clipboard.readText());

    await this.page.goto(link);
  }
}
