from fastapi import APIRouter
from agents.data_agent import fetch_stock_history
from agents.ta_agent import add_all_ta

router = APIRouter()

@router.get("/{ticker}")
async def get_ta_features(ticker: str):
    df = await fetch_stock_history(ticker, years=1)  # ✅ await added
    df = add_all_ta(df)
    df = df.dropna()

    return {
        "ticker": ticker,
        "rows": len(df),
        "data": df.tail(5).to_dict(orient="records")
    }
