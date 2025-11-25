// =========================
// 📌 RSI CALCULATION
// =========================
export function calculateRSI(data, period = 14) {
  if (data.length < period) return null;

  let gains = [];
  let losses = [];

  for (let i = 1; i < period + 1; i++) {
    let diff = data[i] - data[i - 1];

    if (diff >= 0) gains.push(diff);
    else losses.push(Math.abs(diff));
  }

  let avgGain = average(gains);
  let avgLoss = average(losses);

  let rs = avgGain / avgLoss;
  let rsi = 100 - 100 / (1 + rs);

  return Number(rsi.toFixed(2));
}

// =========================
// 📌 EMA CALCULATION
// =========================
export function calculateEMA(data, period = 14) {
  const k = 2 / (period + 1);
  let emaArray = [];
  emaArray[0] = average(data.slice(0, period));

  for (let i = period; i < data.length; i++) {
    emaArray.push(
      data[i] * k + emaArray[emaArray.length - 1] * (1 - k)
    );
  }

  return emaArray;
}

// =========================
// 📌 SMA CALCULATION
// =========================
export function calculateSMA(data, period = 14) {
  let sma = [];

  for (let i = 0; i <= data.length - period; i++) {
    let window = data.slice(i, i + period);
    sma.push(average(window));
  }

  return sma;
}

// =========================
// 📌 MACD CALCULATION
// =========================
export function calculateMACD(data) {
  const ema12 = calculateEMA(data, 12);
  const ema26 = calculateEMA(data, 26);

  const macd = ema12.map((val, index) => val - ema26[index]);

  const signal = calculateEMA(macd.slice(ema26.length - ema12.length), 9);

  return { macd, signal };
}

// =========================
// 📌 HELPER
// =========================
function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
