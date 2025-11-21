# Modelos Pydantic para validação de dados
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, Any

from pydantic import root_validator

class UserCreate(BaseModel):
    """Modelo para criação de usuário"""
    firstName: str = Field(..., min_length=2, max_length=100, description="Primeiro Nome")
    lastName: str = Field(..., min_length=2, max_length=100, description="Sobrenome")
    nome: Optional[str] = Field(None, min_length=2, max_length=200, description="Nome completo do usuário")
    email: EmailStr = Field(..., description="Email válido do usuário")
    phone: str = Field(..., min_length=10, max_length=15, description="Telefone do usuário")
    idade: Optional[int] = Field(None, ge=16, le=100, description="Idade do usuário (16-100)")
    age: Optional[int] = Field(None, ge=16, le=100, description="Idade do usuário (16-100) (alias para idade)")

    @root_validator(pre=True)
    def set_idade_from_age(cls, values):
        # Permite aceitar tanto 'idade' quanto 'age' do frontend
        idade = values.get('idade')
        age = values.get('age')
        if idade is None and age is not None:
            values['idade'] = age
        if values.get('idade') is None:
            raise ValueError("Campo 'idade' ou 'age' é obrigatório.")
        return values

    class Config:
        json_schema_extra = {
            "example": {
                "firstName": "João",
                "lastName": "Silva",
                "nome": "João Silva",
                "email": "joao@example.com",
                "phone": "11999999999",
                "idade": 25
            }
        }

class UserUpdate(BaseModel):
    """Modelo para atualização de dados do usuário"""
    firstName: Optional[str] = Field(None, min_length=2, max_length=100, description="Primeiro Nome")
    lastName: Optional[str] = Field(None, min_length=2, max_length=100, description="Sobrenome")
    nome: Optional[str] = Field(None, min_length=2, max_length=200, description="Nome completo do usuário")
    email: Optional[EmailStr] = Field(None, description="Email válido do usuário")
    phone: Optional[str] = Field(None, min_length=10, max_length=15, description="Telefone do usuário")
    idade: Optional[int] = Field(None, ge=16, le=100, description="Idade do usuário (16-100)")

    class Config:
        json_schema_extra = {
            "example": {
                "firstName": "João",
                "lastName": "Silva Atualizado",
                "nome": "João Silva Atualizado",
                "email": "joao.novo@email.com",
                "phone": "11888888888",
                "idade": 26
            }
        }

# Modelo para API de conversão do Facebook
class FacebookConversionEvent(BaseModel):
    ip_adress: str = Field(..., min_length=1, max_length=100, description="Ip do usuario")
    fbc: str = Field(..., min_length=1, max_length=100, description="FBC")
    fbp: str = Field(..., min_length=1, max_length=100, description="FBP")
    event_name: str = Field(..., min_length=1, max_length=100, description="event_name")
    event_time: str = Field(..., min_length=1, max_length=100, description="event_time")
    action_source: str = Field(..., min_length=1, max_length=100, description="action_source")
    event_source_url: str = Field(..., min_length=1, max_length=100, description="event_source_url")
    client_user_agent: str = Field(..., min_length=1, max_length=100, description="client_user_agent")

class UserResponse(BaseModel):
    """Modelo para resposta de operações com usuário"""
    success: bool
    userId: Optional[str] = None
    message: str
    data: Optional[Dict[str, Any]] = None

class ProgressUpdate(BaseModel):
    """Modelo para atualização de progresso do usuário"""
    etapa: str = Field(..., description="Nome da etapa atual")
    respostas: Dict[str, Any] = Field(default_factory=dict, description="Respostas coletadas nesta etapa")
    porcentagem: Optional[int] = Field(None, ge=0, le=100, description="Porcentagem de progresso (0-100)")
    metadados: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Dados adicionais da etapa")

    class Config:
        json_schema_extra = {
            "example": {
                "etapa": "analise-perfil",
                "respostas": {
                    "pergunta1": "resposta do usuário",
                    "pergunta2": "outra resposta"
                },
                "porcentagem": 25,
                "metadados": {
                    "tempo_inicio": "2024-01-01T10:00:00Z",
                    "tempo_resposta": "2024-01-01T10:05:00Z"
                }
            }
        }

class ProgressResponse(BaseModel):
    """Modelo para resposta de operações de progresso"""
    success: bool
    userId: str
    message: str
    data: Optional[Dict[str, Any]] = None
