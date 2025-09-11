# Serviço para integração com Azure Cosmos DB
import os
from datetime import datetime
from typing import Optional, Dict, Any, List
from azure.cosmos import CosmosClient
from azure.cosmos.exceptions import CosmosResourceNotFoundError, CosmosHttpResponseError
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()


class CosmosService:
    """Serviço para operações com Azure Cosmos DB"""
    
    def __init__(self):
        # Configurações do Cosmos DB
        self.endpoint = os.getenv("COSMOS_ENDPOINT")
        self.key = os.getenv("COSMOS_KEY")
        self.database_name = os.getenv("COSMOS_DATABASE")
        self.container_name = os.getenv("COSMOS_CONTAINER")
        
        # Debug das configurações
        print("🔧 Configurações Cosmos DB:")
        print(f"   Endpoint: {self.endpoint}")
        print(f"   Database: {self.database_name}")
        print(f"   Container: {self.container_name}")
        print(f"   Key Length: {len(self.key)} caracteres")
        
        if not self.key:
            print("❌ COSMOS_KEY não foi carregada do arquivo .env!")
            self.connection_error = "Chave do Cosmos DB não configurada"
            self.client = None
            self.database = None
            self.container = None
            return
        
        # Inicializar cliente (sem bloquear o servidor se der erro)
        self.client = None
        self.database = None
        self.container = None
        self.connection_error = None
        
        try:
            print("🔄 Tentando conectar ao Cosmos DB...")
            self.client = CosmosClient(self.endpoint, self.key)
            self.database = self.client.get_database_client(self.database_name)
            self.container = self.database.get_container_client(self.container_name)
            print(f"✅ Conectado ao Cosmos DB: {self.database_name}/{self.container_name}")
        except Exception as e:
            self.connection_error = str(e)
            print(f"❌ Erro ao conectar com Cosmos DB: {str(e)}")
            print("⚠️  Servidor continuará funcionando em modo offline")
    
    def _check_connection(self):
        """Verificar se há conexão com o Cosmos DB"""
        if self.client is None:
            return {
                "success": False,
                "message": f"Sem conexão com Cosmos DB: {self.connection_error}",
                "data": None
            }
        return None

    async def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Criar um novo usuário no Cosmos DB"""
        # Verificar conexão
        connection_check = self._check_connection()
        if connection_check:
            return connection_check

        try:
            # Gerar nome completo
            nome_completo = user_data.get("nome") or f"{user_data.get('firstName', '')} {user_data.get('lastName', '')}".strip()
            # Gerar ID único
            user_id = f"user_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{len(nome_completo)}"

            # Preparar documento
            document = {
                "id": user_id,
                "nome": nome_completo,
                "firstName": user_data.get("firstName", ""),
                "lastName": user_data.get("lastName", ""),
                "email": user_data.get("email", ""),
                "phone": user_data.get("phone", ""),
                "ip_adress": user_data.get("ip_adress", ""),
                "fbc": user_data.get("fbc", ""),
                "fbp": user_data.get("fbp", ""),
                "event_name": user_data.get("event_name", ""),
                "event_time": user_data.get("event_time", ""),
                "action_source": user_data.get("action_source", ""),
                "event_source_url": user_data.get("event_source_url", ""),
                "client_user_agent": user_data.get("client_user_agent", ""),
                "idade": user_data.get("idade", 0),
                "currentStep": 0,
                "responses": {},
                "isCompleted": False,
                "createdAt": datetime.now().isoformat(),
                "updatedAt": datetime.now().isoformat(),
                "type": "user"
            }

            # Criar documento no Cosmos DB
            response = self.container.create_item(body=document)
            print(f"✅ Usuário criado: {user_id}")

            return {
                "success": True,
                "userId": user_id,
                "message": "Usuário criado com sucesso",
                "data": response
            }

        except CosmosHttpResponseError as e:
            print(f"❌ Erro HTTP do Cosmos DB: {e.status_code} - {e.message}")
            return {
                "success": False,
                "userId": None,
                "message": f"Erro ao criar usuário: {e.message}",
                "data": None
            }
        except Exception as e:
            print(f"❌ Erro inesperado: {str(e)}")
            return {
                "success": False,
                "userId": None,
                "message": f"Erro inesperado: {str(e)}",
                "data": None
            }

    async def get_user(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Buscar usuário por ID"""
        # Verificar conexão
        connection_check = self._check_connection()
        if connection_check:
            return None
            
        try:
            response = self.container.read_item(item=user_id, partition_key=user_id)
            print(f"✅ Usuário encontrado: {user_id}")
            return response
            
        except CosmosResourceNotFoundError:
            print(f"❌ Usuário não encontrado: {user_id}")
            return None
        except Exception as e:
            print(f"❌ Erro ao buscar usuário: {str(e)}")
            return None

    async def update_user(self, user_id: str, update_data: Dict[str, Any]) -> Dict[str, Any]:
        """Atualizar dados do usuário"""
        # Verificar conexão
        connection_check = self._check_connection()
        if connection_check:
            return connection_check
            
        try:
            # Buscar usuário existente
            existing_user = await self.get_user(user_id)
            if not existing_user:
                return {
                    "success": False,
                    "message": "Usuário não encontrado",
                    "data": None
                }
            
            # Atualizar campos
            for key, value in update_data.items():
                if value is not None:  # Só atualiza valores não nulos
                    existing_user[key] = value
            
            existing_user["updatedAt"] = datetime.now().isoformat()
            
            # Salvar no Cosmos DB
            response = self.container.replace_item(item=user_id, body=existing_user)
            print(f"✅ Usuário atualizado: {user_id}")
            
            return {
                "success": True,
                "message": "Usuário atualizado com sucesso",
                "data": response
            }
            
        except Exception as e:
            print(f"❌ Erro ao atualizar usuário: {str(e)}")
            return {
                "success": False,
                "message": f"Erro ao atualizar usuário: {str(e)}",
                "data": None
            }

    async def update_process_progress(self, user_id: str, process_data: Dict[str, Any]) -> Dict[str, Any]:
        """Atualizar progresso do processo de recrutamento"""
        try:
            # Buscar usuário existente
            existing_user = await self.get_user(user_id)
            if not existing_user:
                return {
                    "success": False,
                    "message": "Usuário não encontrado",
                    "data": None
                }

            # Extrair dados do novo formato
            etapa = process_data.get("etapa", "unknown")
            respostas = process_data.get("respostas", {})
            metadados = process_data.get("metadados", {})
            process_name = metadados.get("processName", "analisePerfil")

            # Inicializar progress se não existir
            if "progress" not in existing_user:
                existing_user["progress"] = {}

            if process_name not in existing_user["progress"]:
                existing_user["progress"][process_name] = {
                    "respostas": {},
                    "etapas": [],
                    "ultimaAtualizacao": None
                }

            # Salvar respostas

            for pergunta, resposta in respostas.items():
                # Se for resposta de localização, salva como string simples
                if pergunta == "localizacao_confirmada" and isinstance(resposta, dict):
                    estado = resposta.get("estado")
                    cidade = resposta.get("cidade")
                    if estado:
                        existing_user["estado"] = estado
                    if cidade:
                        existing_user["cidade"] = cidade
                    # Salvar no progresso como string
                    existing_user["progress"][process_name]["respostas"][pergunta] = {
                        "resposta": {"estado": estado, "cidade": cidade},
                        "etapa": etapa,
                        "timestamp": process_data.get("timestamp", datetime.now().isoformat())
                    }
                else:
                    existing_user["progress"][process_name]["respostas"][pergunta] = {
                        "resposta": resposta,
                        "etapa": etapa,
                        "timestamp": process_data.get("timestamp", datetime.now().isoformat())
                    }

            # Adicionar etapa ao histórico se não existir
            if etapa not in existing_user["progress"][process_name]["etapas"]:
                existing_user["progress"][process_name]["etapas"].append(etapa)

            # Atualizar metadados
            existing_user["progress"][process_name]["ultimaAtualizacao"] = process_data.get("timestamp", datetime.now().isoformat())
            existing_user["updatedAt"] = datetime.now().isoformat()

            # Verificar se completou (baseado no número de respostas)
            total_respostas = len(existing_user["progress"][process_name]["respostas"])
            if total_respostas >= 10:  # 10 perguntas na análise de perfil
                existing_user["progress"][process_name]["completed"] = True

            # Salvar no Cosmos DB
            response = self.container.replace_item(item=user_id, body=existing_user)
            print(f"✅ Progresso atualizado: {user_id} - Etapa {etapa}")

            # Retornar localização explicitamente se foi salva
            localizacao_salva = None
            estado_salvo = existing_user.get("estado")
            cidade_salva = existing_user.get("cidade")
            if estado_salvo and cidade_salva:
                localizacao_salva = {
                    "estado": estado_salvo,
                    "cidade": cidade_salva
                }

            return {
                "success": True,
                "message": "Progresso atualizado com sucesso",
                "data": {
                    **response,
                    "localizacao": localizacao_salva
                }
            }

        except Exception as e:
            print(f"❌ Erro ao atualizar progresso: {str(e)}")
            return {
                "success": False,
                "message": f"Erro ao atualizar progresso: {str(e)}",
                "data": None
            }

    async def delete_user(self, user_id: str) -> Dict[str, Any]:
        """Deletar usuário do Cosmos DB"""
        # Verificar conexão
        connection_check = self._check_connection()
        if connection_check:
            return connection_check
            
        try:
            self.container.delete_item(item=user_id, partition_key=user_id)
            print(f"✅ Usuário deletado: {user_id}")
            
            return {
                "success": True,
                "message": "Usuário deletado com sucesso",
                "data": None
            }
            
        except CosmosResourceNotFoundError:
            return {
                "success": False,
                "message": "Usuário não encontrado",
                "data": None
            }
        except Exception as e:
            print(f"❌ Erro ao deletar usuário: {str(e)}")
            return {
                "success": False,
                "message": f"Erro ao deletar usuário: {str(e)}",
                "data": None
            }

    async def list_users(self, limit: int = 50) -> List[Dict[str, Any]]:
        """Listar usuários do sistema"""
        # Verificar conexão
        connection_check = self._check_connection()
        if connection_check:
            print("⚠️ Sem conexão com Cosmos DB - retornando lista vazia")
            return []
            
        try:
            query = "SELECT * FROM c WHERE c.type = 'user' ORDER BY c.createdAt DESC"
            items = list(self.container.query_items(
                query=query,
                enable_cross_partition_query=True,
                max_item_count=limit
            ))
            
            print(f"✅ {len(items)} usuários encontrados")
            return items
            
        except Exception as e:
            print(f"❌ Erro ao listar usuários: {str(e)}")
            return []

    async def get_user_progress(self, user_id: str) -> Dict[str, Any]:
        """Obter progresso específico do usuário"""
        try:
            user = await self.get_user(user_id)
            if not user:
                return {
                    "success": False,
                    "message": "Usuário não encontrado",
                    "data": None
                }
            
            progress_data = {
                "userId": user_id,
                "currentStep": user.get("currentStep", 0),
                "isCompleted": user.get("isCompleted", False),
                "responses": user.get("responses", {}),
                "lastUpdate": user.get("updatedAt"),
                "createdAt": user.get("createdAt")
            }
            
            return {
                "success": True,
                "message": "Progresso obtido com sucesso",
                "data": progress_data
            }
            
        except Exception as e:
            print(f"❌ Erro ao obter progresso: {str(e)}")
            return {
                "success": False,
                "message": f"Erro ao obter progresso: {str(e)}",
                "data": None
            }
