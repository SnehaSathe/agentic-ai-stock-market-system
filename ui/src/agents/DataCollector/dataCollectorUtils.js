// Free NSE data source using "nseindia" website scraping through CORS proxy
// (Works without API key)

export async function fetchStockData(symbol, days = 30) {
  try {
    const url =
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS?range=${days}d&interval=1d`;

    const res = await fetch(url);
    const json = await res.json();

    if (!json.chart || !json.chart.result) {
      return { error: "Invalid symbol or API blocked." };
    }

    const data = json.chart.result[0];

    const timestamps = data.timestamp;
    const close = data.indicators.quote[0].close;

    let finalData = timestamps.map((t, i) => ({
      date: new Date(t * 1000).toISOString().split("T")[0],
      close: close[i]
    }));

    return { symbol, data: finalData };
  } catch (err) {
    return { error: "Error fetching stock data", details: err };
  }
}
