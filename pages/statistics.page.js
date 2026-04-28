import { expect } from '@playwright/test';

export class StatisticsPage {
  constructor(page) {
    this.page = page;

    this.todayFilter = page.getByRole('button', { name: 'Today' });
    this.runReportBtn = page.getByRole('button', { name: 'Run report' });
    this.spinner = page.locator('[qa-element="spinner"]');
  }

  async open() {
    await this.page.goto('/analytics/statistics');
  }

  getCell(rowIndex, columnIndex) {
    return this.page.locator(
      `[data-testid="TableCell"][data-row-index="${rowIndex}"][data-column-index="${columnIndex}"]`
    );
  }

  async getClicksFromTable() {
    const cell = this.getCell(0, 1);

    await expect(cell).toBeVisible();
    const text = await cell.textContent();

    return Number(text);
  }

  async runReportAndWait() {
    await this.runReportBtn.click();

    // Wait for spinner to appear (it may not show up if the response is fast)
    await this.spinner.waitFor({ state: 'visible' }).catch(() => {});

    // Wait until spinner disappears, indicating that the report is fully loaded
    await this.spinner.waitFor({ state: 'hidden' });
  }

  async waitForClicksIncrease(initialClicks) {
    const expectedClicks = initialClicks + 1;

    // Data is not updated instantly, so we poll until the report reflects the new value
    await expect
      .poll(
        async () => {
          await this.runReportAndWait();
          return await this.getClicksFromTable();
        },
        {
          timeout: 60000,
          interval: 3000,
          message: `Waiting for clicks to increase from ${initialClicks} to ${expectedClicks}`,
        }
      )
      .toBe(expectedClicks);
  }
}
