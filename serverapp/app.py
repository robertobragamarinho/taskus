import os
from datetime import datetime
import hashlib
import requests
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from services.cosmos_service import CosmosService
from models.user_models import (UserCreate, UserResponse, UserUpdate,
                                ProgressUpdate, ProgressResponse,
                                FacebookConversionEvent)

# Configurações
PIXEL_ID = os.getenv("FB_PIXEL_ID")
ACCESS_TOKEN = os.getenv("FB_ACCESS_TOKEN")
API_VERSION = "v18.0"

def hash_sha256(value: str) -> str:
    return hashlib.sha256(value.strip().lower().encode()).hexdigest()

app = FastAPI(
    title="Sistema de Recrutamento API",
    description="API para sistema de recrutamento com Cosmos DB",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serviço
cosmos_service = CosmosService()

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Sistema de Recrutamento API"
    }

# (… demais endpoints iguais ao que você já tem …)

# Montar arquivos estáticos do frontend — se existir build
build_path = os.path.join(os.path.dirname(__file__), "build")
if os.path.isdir(build_path):
    app.mount("/static", StaticFiles(directory=build_path), name="static")

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    static_file_path = os.path.join(build_path, full_path)
    if os.path.isfile(static_file_path):
        return FileResponse(static_file_path)
    index_path = os.path.join(build_path, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="Página não encontrada")

# Nota: removi o bloco if __name__ == "__main__" para produção — o App Service vai identificar automáticamente.
