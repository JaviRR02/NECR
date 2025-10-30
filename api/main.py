# api/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.personas import router as personas_router
from database.connection import Base, engine

app = FastAPI(title="NECR API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crea tablas
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(personas_router)

@app.get("/")
def root():
    return {"message": "NECR API - Fiscalía General del Estado de Querétaro"}