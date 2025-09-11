# Servidor Backend FastAPI para Sistema de Recrutamento
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from datetime import datetime

# Importar serviços
from services.cosmos_service import CosmosService
from models.user_models import UserCreate, UserResponse, UserUpdate, ProgressUpdate, ProgressResponse

# Inicializar FastAPI
app = FastAPI(
    title="Sistema de Recrutamento API",
    description="API para sistema de recrutamento com Cosmos DB",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar serviço do Cosmos DB
cosmos_service = CosmosService()

# Rotas da API
@app.get("/api/health")
async def health_check():
    """Verificar se a API está funcionando"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Sistema de Recrutamento API"
    }

@app.get("/api/cosmos-status")
async def cosmos_status():
    """Verificar status da conexão com Cosmos DB"""
    try:
        if cosmos_service.client is None:
            return {
                "status": "disconnected",
                "error": cosmos_service.connection_error,
                "endpoint": cosmos_service.endpoint,
                "database": cosmos_service.database_name,
                "container": cosmos_service.container_name,
                "key_configured": len(cosmos_service.key) > 0,
                "key_length": len(cosmos_service.key)
            }
        else:
            # Testar conexão fazendo uma consulta simples
            try:
                # Tentar acessar informações do banco
                database_info = cosmos_service.database.read()
                return {
                    "status": "connected",
                    "endpoint": cosmos_service.endpoint,
                    "database": cosmos_service.database_name,
                    "container": cosmos_service.container_name,
                    "database_info": database_info,
                    "message": "Conexão ativa com Cosmos DB"
                }
            except Exception as e:
                return {
                    "status": "connection_error",
                    "error": str(e),
                    "endpoint": cosmos_service.endpoint,
                    "database": cosmos_service.database_name,
                    "container": cosmos_service.container_name
                }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

@app.post("/api/user", response_model=UserResponse)
async def create_user(user_data: UserCreate):
    """Cadastrar novo usuário no sistema"""
    try:
        print("[API] Dados recebidos para cadastro:", user_data)
        result = await cosmos_service.create_user(user_data.model_dump())
        print("[API] Resultado do CosmosService:", result)
        if result.get("success"):
            return UserResponse(
                success=True,
                userId=result.get("userId"),
                message="Usuário cadastrado com sucesso",
                data=result.get("data")
            )
        else:
            print("[API] Erro ao cadastrar usuário:", result.get("message"))
            raise HTTPException(status_code=400, detail=result.get("message", "Erro desconhecido ao cadastrar usuário"))
    except Exception as e:
        import traceback
        print("[API] Erro interno ao cadastrar usuário:", str(e))
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/api/users/{user_id}")
async def get_user(user_id: str):
    """Buscar usuário por ID"""
    try:
        result = await cosmos_service.get_user(user_id)
        if result:
            return {
                "success": True,
                "userId": user_id,
                "message": "Usuário encontrado",
                "data": result
            }
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/users")
async def list_users(limit: int = 50):
    """Listar todos os usuários cadastrados"""
    try:
        users = await cosmos_service.list_users(limit)
        return {
            "success": True,
            "message": f"{len(users)} usuários encontrados",
            "total": len(users),
            "limit": limit,
            "data": users
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/user/{user_id}")
async def update_user(user_id: str, user_data: UserUpdate):
    """Atualizar dados do usuário"""
    try:
        # Converter para dict apenas os campos não nulos
        update_data = user_data.model_dump(exclude_unset=True)
        result = await cosmos_service.update_user(user_id, update_data)
        if result["success"]:
            return {
                "success": True,
                "message": "Usuário atualizado com sucesso",
                "data": result["data"]
            }
        else:
            raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/users/{user_id}")
async def delete_user(user_id: str):
    """Deletar usuário por ID"""
    try:
        result = await cosmos_service.delete_user(user_id)
        if result["success"]:
            return {
                "success": True,
                "message": "Usuário deletado com sucesso"
            }
        else:
            raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/progress/{user_id}", response_model=ProgressResponse)
async def update_progress(user_id: str, progress_data: ProgressUpdate):
    """Atualizar progresso do processo de recrutamento"""
    try:
        print(f"🔍 Recebendo progresso para user: {user_id}")
        print(f"📋 Dados recebidos: {progress_data}")
        
        # Converter para dict e adicionar timestamp
        process_data = progress_data.model_dump()
        process_data["timestamp"] = datetime.now().isoformat()
        
        print(f"📊 Dados processados: {process_data}")
        
        result = await cosmos_service.update_process_progress(user_id, process_data)
        if result["success"]:
            return ProgressResponse(
                success=True,
                userId=user_id,
                message="Progresso atualizado com sucesso",
                data=result["data"]
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
    """Obter progresso do usuário no processo de recrutamento"""
    try:
        result = await cosmos_service.get_user_progress(user_id)
        if result["success"]:
            return {
                "success": True,
                "userId": user_id,
                "message": "Progresso obtido com sucesso",
                "data": result["data"]
            }
        else:
            raise HTTPException(status_code=404, detail=result["message"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Configurar servir arquivos estáticos (build do frontend)
build_path = os.path.join(os.path.dirname(__file__), "build")
if os.path.exists(build_path):
    app.mount("/static", StaticFiles(directory=build_path), name="static")

# Rota principal para servir o frontend (SPA)
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    """Servir a aplicação React buildada"""
    # Verificar se existe arquivo estático
    static_file_path = os.path.join(build_path, full_path)
    
    if os.path.exists(static_file_path) and os.path.isfile(static_file_path):
        return FileResponse(static_file_path)
    
    # Se não encontrar arquivo específico, servir index.html (SPA)
    index_path = os.path.join(build_path, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    # Se não tiver build, mostrar mensagem
    return {
        "message": "Frontend não encontrado. Execute 'npm run build' na pasta webapp primeiro.",
        "api_docs": "/api/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
