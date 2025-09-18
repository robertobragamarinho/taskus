# Script para executar o servidor FastAPI
import uvicorn
from dotenv import load_dotenv
import os

# Carregar variáveis de ambiente
load_dotenv()

if __name__ == "__main__":
    # Configurações do servidor
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "False").lower() == "true"
    
    print(f"🚀 Iniciando servidor FastAPI em http://{host}:{port}")
    print(f"📚 Documentação da API disponível em http://{host}:{port}/api/docs")
    
    uvicorn.run(
        "app:app",
        host=host,
        port=port,
        reload=debug,
        log_level="info" if not debug else "debug"
    )
