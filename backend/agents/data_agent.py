import yfinance as yf
import pandas as pd
from datetime import datetime

def fetch_stock_history(ticker: str, years: int = 5, interval: str = "1d"):
    """
    Fetch Indian stock data for free using yfinance.
    NSE tickers need .NS suffix.
    Example: TCS.NS, RELIANCE.NS, SBIN.NS
    """
    full_ticker = ticker + ".NS"

    df = yf.download(
        full_ticker,
        period=f"{years}y",
        interval=interval,
        auto_adjust=False
    )

    df = df.reset_index()
    df["ticker"] = ticker
    return df



