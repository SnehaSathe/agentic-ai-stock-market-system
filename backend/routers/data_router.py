from fastapi import APIRouter
import yfinance as yf
import pandas as pd

router = APIRouter()

@router.get("/history")
async def get_stock_history(symbol: str, days: int = 30):
    try:
        stock = yf.Ticker(symbol + ".NS")   # For NSE
        df = stock.history(period=f"{days}d")

        if df.empty:
            return {"error": "No data found"}

        df.reset_index(inplace=True)
        data = df.to_dict(orient="records")

        return {
            "symbol": symbol,
            "days": days,
            "data": data
        }
    except Exception as e:
        return {"error": str(e)}
