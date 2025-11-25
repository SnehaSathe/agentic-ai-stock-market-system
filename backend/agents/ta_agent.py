import pandas as pd
import ta

def add_all_ta(df: pd.DataFrame) -> pd.DataFrame:

    # Standard OHLCV columns
    df = df.rename(columns={
        "Open": "open",
        "High": "high",
        "Low": "low",
        "Close": "close",
        "Adj Close": "adj_close",
        "Volume": "volume"
    })

    # Convert numeric columns
    numeric_cols = ["open", "high", "low", "close", "volume", "adj_close"]
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    # RSI
    df["rsi"] = ta.momentum.RSIIndicator(df["close"], window=14).rsi()

    # MACD
    macd = ta.trend.MACD(df["close"])
    df["macd"] = macd.macd()
    df["macd_signal"] = macd.macd_signal()
    df["macd_hist"] = macd.macd_diff()

    # EMA
    df["ema_20"] = ta.trend.EMAIndicator(df["close"], window=20).ema_indicator()
    df["ema_50"] = ta.trend.EMAIndicator(df["close"], window=50).ema_indicator()

    # SMA
    df["sma_20"] = df["close"].rolling(20).mean()
    df["sma_50"] = df["close"].rolling(50).mean()

    # Bollinger Bands
    bb = ta.volatility.BollingerBands(df["close"], window=20, window_dev=2)
    df["bb_upper"] = bb.bollinger_hband()
    df["bb_lower"] = bb.bollinger_lband()
    df["bb_width"] = df["bb_upper"] - df["bb_lower"]

    # ATR
    df["atr"] = ta.volatility.AverageTrueRange(
        df["high"], df["low"], df["close"], window=14
    ).average_true_range()

    return df
