from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.data_router import router as data_router
from routers.ta_router import router as ta_router

app = FastAPI()

# ✅ CORS MUST COME BEFORE ROUTERS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_router, prefix="/data", tags=["Data Collector"])
app.include_router(ta_router, prefix="/ta", tags=["Technical Analysis"])

@app.get("/")
def home():
    return {"message": "Backend running successfully!"}



@app.get("/data/history")
def get_history(symbol: str, days: int):
    return {"data": [...]}