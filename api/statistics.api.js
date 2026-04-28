export class StatisticsApi {
  constructor(request) {
    this.request = request;
  }

  async getClicks() {
    const today = new Date().toISOString().split('T')[0];

    const response = await this.request.get('/front/trafficStatistics', {
      params: {
        'groups[0]': 'groupDay',
        'filters[includeImpressions]': true,
        'filters[includeClicks]': true,
        'filters[from]': today,
        'filters[to]': today,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to get statistics: ${response.status()}`);
    }

    const body = await response.json();

    const totals = body?.statistics?.data?.totals;

    if (!totals) {
      throw new Error(`Invalid response structure: ${JSON.stringify(body)}`);
    }

    return totals.clicks ?? 0;
  }
}
