import { test } from '../fixtures/auth.fixture.js';
import { DashboardPage, StatisticsPage } from '../pages/index.js';
import { StatisticsApi } from '../api/statistics.api.js';

test('Should increase clicks in report after opening referral link', async ({ page, api }) => {
  const dashboard = new DashboardPage(page);
  const statistics = new StatisticsPage(page);
  const statisticsApi = new StatisticsApi(api);

  const initialClicks = await statisticsApi.getClicks();

  await dashboard.open();
  await dashboard.openReferralLinkFromClipboard();

  await statistics.open();
  await statistics.todayFilter.click();
  await statistics.waitForClicksIncrease(initialClicks);
});
