from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import engine, Base
from app.routers import tickets
from app.models import note


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Support CRM API",
    version="1.0.0"
)

# CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Route
@app.get("/")
def home():
    return {
        "message": "Support CRM API Running Successfully"
    }

# Register Routers
app.include_router(tickets.router)