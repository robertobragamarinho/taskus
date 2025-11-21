import os
from datetime import datetime
import hashlib
import requests
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query

from services.cosmos_service import CosmosService
from models.user_models import (
    UserCreate,
    UserResponse,
    UserUpdate,
    ProgressUpdate,
    ProgressResponse,
    FacebookConversionEvent,
)

# ================================
# Configurações Facebook Conversions API
# ================================
PIXEL_ID = os.getenv("FB_PIXEL_ID")
ACCESS_TOKEN = os.getenv("FB_ACCESS_TOKEN")
API_VERSION = "v18.0"


def hash_sha256(value: str) -> str:
    return hashlib.sha256(value.strip().lower().encode()).hexdigest()


# ================================
# Instância FastAPI
# ================================
app = FastAPI(
    title="Sistema de Recrutamento API",
    description="API para sistema de recrutamento com Cosmos DB",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# ================================
# CORS
# ================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # depois você pode restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================================
# Cosmos DB - inicialização protegida
# ================================
cosmos_service = None
cosmos_init_error = None

try:
    cosmos_service = CosmosService()
    print("✅ CosmosService inicializado com sucesso")
except Exception as e:
    cosmos_init_error = str(e)
    cosmos_service = None
    print("❌ Erro ao inicializar CosmosService:", cosmos_init_error)


# ================================
# Rotas de saúde / status
# ================================
@app.get("/api/health")
async def health_check():
    """
    Health check simples – sempre deve funcionar.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Sistema de Recrutamento API",
        "cosmos_initialized": cosmos_service is not None,
        "cosmos_init_error": cosmos_init_error,
    }


@app.get("/api/cosmos-status")
async def cosmos_status():
    """
    Status detalhado da conexão com o Cosmos DB.
    Não deve derrubar a API se der erro.
    """
    try:
        if cosmos_service is None:
            return {
                "status": "not_initialized",
                "error": cosmos_init_error or "CosmosService não foi inicializado",
            }

        if getattr(cosmos_service, "client", None) is None:
            return {
                "status": "disconnected",
                "error": cosmos_service.connection_error,
                "endpoint": cosmos_service.endpoint,
                "database": cosmos_service.database_name,
                "container": cosmos_service.container_name,
                "key_configured": len(cosmos_service.key) > 0,
                "key_length": len(cosmos_service.key),
            }

        try:
            database_info = cosmos_service.database.read()
            return {
                "status": "connected",
                "endpoint": cosmos_service.endpoint,
                "database": cosmos_service.database_name,
                "container": cosmos_service.container_name,
                "database_info": database_info,
                "message": "Conexão ativa com Cosmos DB",
            }
        except Exception as e:
            return {
                "status": "connection_error",
                "error": str(e),
                "endpoint": cosmos_service.endpoint,
                "database": cosmos_service.database_name,
                "container": cosmos_service.container_name,
            }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
        }


# ================================
# Rotas de Usuário
# ================================
@app.post("/api/user", response_model=UserResponse)
async def create_user(user_data: UserCreate):
    if cosmos_service is None:
        raise HTTPException(
            status_code=500,
            detail="CosmosService não inicializado. Verifique as variáveis de ambiente na Azure.",
        )

    try:
        print("[API] Dados recebidos para cadastro:", user_data)
        result = await cosmos_service.create_user(user_data.model_dump())
        print("[API] Resultado do CosmosService:", result)

        if result.get("success"):
            return UserResponse(
                success=True,
                userId=result.get("userId"),
                message="Usuário cadastrado com sucesso",
                data=result.get("data"),
            )
        else:
            print("[API] Erro ao cadastrar usuário:", result.get("message"))
            raise HTTPException(
                status_code=400,
                detail=result.get("message", "Erro desconhecido ao cadastrar usuário"),
            )
    except Exception as e:
        import traceback

        print("[API] Erro interno ao cadastrar usuário:", str(e))
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")


@app.get("/api/users/{user_id}")
async def get_user(user_id: str):
    if cosmos_service is None:
        raise HTTPException(
            status_code=500,
            detail="CosmosService não inicializado. Verifique as variáveis de ambiente na Azure.",
        )
    try:
        result = await cosmos_service.get_user(user_id)
        if result:
            return {
                "success": True,
                "userId": user_id,
                "message": "Usuário encontrado",
                "data": result,
            }
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/users")
async def list_users(limit: int = 50):
    if cosmos_service is None:
        raise HTTPException(
            status_code=500,
            detail="CosmosService não inicializado. Verifique as variáveis de ambiente na Azure.",
        )
    try:
        users = await cosmos_service.list_users(limit)
        return {
            "success": True,
            "message": f"{len(users)} usuários encontrados",
            "total": len(users),
            "limit": limit,
            "data": users,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/api/user/{user_id}")
async def update_user(user_id: str, user_data: UserUpdate):
    if cosmos_service is None:
        raise HTTPException(
            status_code=500,
            detail="CosmosService não inicializado. Verifique as variáveis de ambiente na Azure.",
        )
    try:
        update_data = user_data.model_dump(exclude_unset=True)
        result = await cosmos_service.update_user(user_id, update_data)
        if result["success"]:
            return {
                "success": True,
                "message": "Usuário atualizado com sucesso",
                "data": result["data"],
            }
        else:
            raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/users/{user_id}")
async def delete_user(user_id: str):
    if cosmos_service is None:
        raise HTTPException(
            status_code=500,
            detail="CosmosService não inicializado. Verifique as variáveis de ambiente na Azure.",
        )
    try:
        result = await cosmos_service.delete_user(user_id)
        if result["success"]:
            return {
                "success": True,
                "message": "Usuário deletado com sucesso",
            }
        else:
            raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ================================
# Rotas de Progresso
# ================================
@app.post("/api/progress/{user_id}", response_model=ProgressResponse)
async def update_progress(user_id: str, progress_data: ProgressUpdate):
    if cosmos_service is None:
        raise HTTPException(
            status_code=500,
            detail="CosmosService não inicializado. Verifique as variáveis de ambiente na Azure.",
        )
    try:
        print(f"🔍 Recebendo progresso para user: {user_id}")
        print(f"📋 Dados recebidos: {progress_data}")
        process_data = progress_data.model_dump()
        process_data["timestamp"] = datetime.now().isoformat()
        print(f"📊 Dados processados: {process_data}")
        result = await cosmos_service.update_process_progress(user_id, process_data)
        if result["success"]:
            return ProgressResponse(
                success=True,
                userId=user_id,
                message="Progresso atualizado com sucesso",
                data=result["data"],
            )
        else:
            raise HTTPException(status_code=400, detail=result["message"])
    except ValueError as ve:
        print(f"❌ Erro de validação: {str(ve)}")
        raise HTTPException(status_code=422, detail=f"Erro de validação: {str(ve)}")
    except Exception as e:
        print(f"❌ Erro geral: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/progress/{user_id}")
async def get_progress(user_id: str):
    if cosmos_service is None:
        raise HTTPException(
            status_code=500,
            detail="CosmosService não inicializado. Verifique as variáveis de ambiente na Azure.",
        )
    try:
        result = await cosmos_service.get_user_progress(user_id)
        if result["success"]:
            return {
                "success": True,
                "userId": user_id,
                "message": "Progresso obtido com sucesso",
                "data": result["data"],
            }
        else:
            raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ================================
# Facebook Conversions API
# ================================
@app.post("/api/conversion")
async def conversion_event(event: FacebookConversionEvent):
    """
    Receber evento do frontend, preparar e enviar para Facebook Conversions API.
    """
    user_data = {
        "client_ip_address": event.ip_adress,
        "client_user_agent": event.client_user_agent,
        "fbc": event.fbc,
        "fbp": event.fbp,
    }

    event_dict = {
        "event_name": event.event_name,
        "event_time": int(event.event_time),
        "event_source_url": event.event_source_url,
        "action_source": event.action_source,
        "user_data": user_data,
    }

    payload = {
        "data": [event_dict],
    }

    url = f"https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={ACCESS_TOKEN}"
    response = requests.post(url, json=payload)
    try:
        return {"status": response.status_code, "response": response.json()}
    except Exception:
        return {"status": response.status_code, "response": response.text}


# ================================
# Envio de e-mail (Mailgun)
# ================================
@app.get("/api/confirm-email")
async def confirm_email(email: str, codigo: str = Query(..., min_length=6, max_length=6)):
    MAILGUN_API_KEY = os.getenv("API_Key", "")
    MAILGUN_DOMAIN = os.getenv("Sandbox_domain", "")
    MAILGUN_BASE_URL = os.getenv("Base_URL", "https://api.mailgun.net")

    FROM_EMAIL = f"Mailgun Sandbox <postmaster@{MAILGUN_DOMAIN}>"
    TO_EMAIL = email
    SUBJECT = "Confirmação de e-mail - TaskUs Brasil"
    TEXT = (
        "Olá,\n\n"
        "Seu e-mail foi cadastrado com sucesso na TaskUs Brasil!\n\n"
        f"Seu código de confirmação é: {codigo}\n\n"
        "Se você não reconhece esta ação, ignore esta mensagem.\n\n"
        "Atenciosamente,\nEquipe TaskUs Brasil"
    )

    try:
        response = requests.post(
            f"{MAILGUN_BASE_URL}/v3/{MAILGUN_DOMAIN}/messages",
            auth=("api", MAILGUN_API_KEY),
            data={
                "from": FROM_EMAIL,
                "to": TO_EMAIL,
                "subject": SUBJECT,
                "text": TEXT,
            },
        )
        if response.status_code == 200:
            return {
                "success": True,
                "message": "E-mail enviado com sucesso!",
                "mailgun_response": response.json(),
                "status_code": response.status_code,
            }
        else:
            return {
                "success": False,
                "message": "Falha ao enviar e-mail",
                "mailgun_response": response.text,
                "status_code": response.status_code,
                "error_details": response.text,
            }
    except Exception as e:
        import traceback

        return {
            "success": False,
            "message": f"Erro ao enviar e-mail: {str(e)}",
            "traceback": traceback.format_exc(),
        }


# ================================
# Servir SPA (build do frontend)
# ================================
build_path = os.path.join(os.path.dirname(__file__), "build")
if os.path.exists(build_path):
    app.mount("/static", StaticFiles(directory=build_path), name="static")


@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    static_file_path = os.path.join(build_path, full_path)
    if os.path.exists(static_file_path) and os.path.isfile(static_file_path):
        return FileResponse(static_file_path)

    index_path = os.path.join(build_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)

    return {
        "message": "Frontend não encontrado. Execute 'npm run build' na pasta webapp primeiro.",
        "api_docs": "/api/docs",
        "health": "/api/health",
    }


# ================================
# Execução local (dev)
# ================================
if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
