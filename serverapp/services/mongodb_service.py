# Serviço para integração com MongoDB
import os
from datetime import datetime
from typing import Optional, Dict, Any, List
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, DuplicateKeyError, PyMongoError
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()


class MongoDBService:
    """Serviço para operações com MongoDB"""
    
    def __init__(self):
        # Configurações do MongoDB
        self.mongodb_uri = os.getenv("MONGODB_URI")
        self.database_name = os.getenv("MONGODB_DATABASE", "taskus_db")
        self.collection_name = os.getenv("MONGODB_COLLECTION", "users")
        
        # Debug das configurações
        print("🔧 Configurações MongoDB:")
        print(f"   Database: {self.database_name}")
        print(f"   Collection: {self.collection_name}")
        print(f"   URI configurada: {'Sim' if self.mongodb_uri else 'Não'}")
        
        if not self.mongodb_uri:
            print("❌ MONGODB_URI não foi carregada do arquivo .env!")
            self.connection_error = "URI do MongoDB não configurada"
            self.client = None
            self.database = None
            self.collection = None
            return
        
        # Inicializar cliente (sem bloquear o servidor se der erro)
        self.client = None
        self.database = None
        self.collection = None
        self.connection_error = None
        
        try:
            print("🔄 Tentando conectar ao MongoDB...")
            
            self.client = MongoClient(
                self.mongodb_uri, 
                serverSelectionTimeoutMS=10000,
                tlsAllowInvalidCertificates=True
            )
            
            # Testar conexão
            self.client.admin.command('ping')
            
            self.database = self.client[self.database_name]
            self.collection = self.database[self.collection_name]
            
            # Criar índices
            self.collection.create_index("email", unique=True)
            self.collection.create_index("createdAt")
            
            print(f"✅ Conectado ao MongoDB: {self.database_name}/{self.collection_name}")
        except Exception as e:
            self.connection_error = str(e)
            print(f"❌ Erro ao conectar com MongoDB: {str(e)}")
            print("⚠️  Servidor continuará funcionando em modo offline")
    
    def _check_connection(self):
        """Verificar se há conexão com o MongoDB"""
        if self.client is None:
            return {
                "success": False,
                "message": f"Sem conexão com MongoDB: {self.connection_error}",
                "data": None
            }
        return None

    async def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Criar um novo usuário no MongoDB"""
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
                "_id": user_id,
                "userId": user_id,
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
                "progress": {},
                "isCompleted": False,
                "createdAt": datetime.now().isoformat(),
                "updatedAt": datetime.now().isoformat(),
                "type": "user"
            }

            # Inserir documento no MongoDB
            result = self.collection.insert_one(document)
            print(f"✅ Usuário criado: {user_id}")

            # Buscar documento inserido
            inserted_doc = self.collection.find_one({"_id": user_id})
            
            # Converter ObjectId para string se necessário
            if inserted_doc and "_id" in inserted_doc:
                inserted_doc["id"] = str(inserted_doc["_id"])

            return {
                "success": True,
                "userId": user_id,
                "message": "Usuário criado com sucesso",
                "data": inserted_doc
            }

        except DuplicateKeyError:
            print(f"❌ Email já cadastrado")
            return {
                "success": False,
                "userId": None,
                "message": "Email já cadastrado no sistema",
                "data": None
            }
        except PyMongoError as e:
            print(f"❌ Erro do MongoDB: {str(e)}")
            return {
                "success": False,
                "userId": None,
                "message": f"Erro ao criar usuário: {str(e)}",
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
            user = self.collection.find_one({"_id": user_id})
            
            if user:
                # Converter _id para id
                user["id"] = str(user["_id"])
                print(f"✅ Usuário encontrado: {user_id}")
                return user
            else:
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
            
            # Preparar dados de atualização
            update_data["updatedAt"] = datetime.now().isoformat()
            
            # Atualizar no MongoDB
            result = self.collection.update_one(
                {"_id": user_id},
                {"$set": update_data}
            )
            
            if result.modified_count > 0:
                # Buscar usuário atualizado
                updated_user = await self.get_user(user_id)
                print(f"✅ Usuário atualizado: {user_id}")
                
                return {
                    "success": True,
                    "message": "Usuário atualizado com sucesso",
                    "data": updated_user
                }
            else:
                return {
                    "success": True,
                    "message": "Nenhuma alteração realizada",
                    "data": existing_user
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
                    # Salvar no progresso como objeto
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

            # Atualizar no MongoDB
            result = self.collection.replace_one(
                {"_id": user_id},
                existing_user
            )
            
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

            # Buscar documento atualizado
            updated_user = await self.get_user(user_id)

            return {
                "success": True,
                "message": "Progresso atualizado com sucesso",
                "data": {
                    **updated_user,
                    "localizacao": localizacao_salva
                }
            }

        except Exception as e:
            print(f"❌ Erro ao atualizar progresso: {str(e)}")
            import traceback
            print(traceback.format_exc())
            return {
                "success": False,
                "message": f"Erro ao atualizar progresso: {str(e)}",
                "data": None
            }

    async def delete_user(self, user_id: str) -> Dict[str, Any]:
        """Deletar usuário do MongoDB"""
        # Verificar conexão
        connection_check = self._check_connection()
        if connection_check:
            return connection_check
            
        try:
            result = self.collection.delete_one({"_id": user_id})
            
            if result.deleted_count > 0:
                print(f"✅ Usuário deletado: {user_id}")
                return {
                    "success": True,
                    "message": "Usuário deletado com sucesso",
                    "data": None
                }
            else:
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
            print("⚠️ Sem conexão com MongoDB - retornando lista vazia")
            return []
            
        try:
            # Buscar usuários ordenados por data de criação
            cursor = self.collection.find(
                {"type": "user"}
            ).sort("createdAt", -1).limit(limit)
            
            users = []
            for user in cursor:
                user["id"] = str(user["_id"])
                users.append(user)
            
            print(f"✅ {len(users)} usuários encontrados")
            return users
            
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
                "progress": user.get("progress", {}),
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
    
    def get_connection_status(self) -> Dict[str, Any]:
        """Obter status detalhado da conexão"""
        try:
            if self.client is None:
                return {
                    "status": "disconnected",
                    "error": self.connection_error,
                    "database": self.database_name,
                    "collection": self.collection_name
                }
            
            # Testar conexão
            self.client.admin.command('ping')
            
            # Obter informações do servidor
            server_info = self.client.server_info()
            
            return {
                "status": "connected",
                "database": self.database_name,
                "collection": self.collection_name,
                "server_version": server_info.get("version"),
                "message": "Conexão ativa com MongoDB"
            }
            
        except Exception as e:
            return {
                "status": "connection_error",
                "error": str(e),
                "database": self.database_name,
                "collection": self.collection_name
            }
