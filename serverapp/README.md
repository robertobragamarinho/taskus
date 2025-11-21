# 🔄 Backend - Sistema de Recrutamento TaskUs

## 📋 Visão Geral

Backend FastAPI integrado com **MongoDB** para gerenciamento completo do sistema de recrutamento.

## 🏗️ Arquitetura

```
Backend (FastAPI + MongoDB)
├── API REST
├── Validação com Pydantic
├── MongoDB para persistência
└── Integrações externas (Facebook, Mailgun)
```

## 🛠️ Tecnologias

- **FastAPI** - Framework web moderno
- **MongoDB** - Banco de dados NoSQL (migrado do Azure Cosmos DB)
- **PyMongo** - Driver oficial MongoDB para Python
- **Motor** - Driver assíncrono MongoDB
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI

## 📁 Estrutura

```
serverapp/
├── app.py                      # Aplicação principal FastAPI
├── run.py                      # Script de inicialização
├── requirements.txt            # Dependências Python
├── test_mongodb.py            # Script de teste MongoDB
├── .env                        # Variáveis de ambiente (não commitar)
├── .env.example               # Exemplo de configuração
├── models/
│   ├── __init__.py
│   └── user_models.py         # Modelos Pydantic
└── services/
    ├── __init__.py
    ├── mongodb_service.py     # ✨ NOVO - Serviço MongoDB
    └── cosmos_service.py      # DEPRECATED - Removível
```

## ⚙️ Configuração

### 1. Instalar Dependências

```bash
cd serverapp
pip install -r requirements.txt
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```bash
# Servidor
HOST=0.0.0.0
PORT=8000
DEBUG=True

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=YourApp
MONGODB_DATABASE=taskus_db
MONGODB_COLLECTION=users

# Facebook Conversions API (opcional)
FB_PIXEL_ID=your_pixel_id
FB_ACCESS_TOKEN=your_token

# Mailgun (opcional)
API_Key=your_key
Sandbox_domain=your_domain.mailgun.org
Base_URL=https://api.mailgun.net
```

### 3. Testar Conexão MongoDB

```bash
python test_mongodb.py
```

**Saída esperada:**
```
============================================================
🧪 TESTE DE CONEXÃO COM MONGODB
============================================================

📋 Configurações:
   Database: taskus_db
   Collection: users
   URI configurada: ✅ Sim

🔄 Tentando conectar ao MongoDB...
✅ Conexão estabelecida com sucesso!

📊 Informações do Servidor:
   Versão MongoDB: 7.0.x
   
============================================================
✅ TESTE CONCLUÍDO COM SUCESSO!
============================================================
```

## 🚀 Executar Servidor

### Método 1: Usando run.py (Recomendado)

```bash
python run.py
```

### Método 2: Diretamente

```bash
python app.py
```

### Método 3: Com Uvicorn

```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

**Saída esperada:**
```
🔧 Configurações MongoDB:
   Database: taskus_db
   Collection: users
   URI configurada: Sim
🔄 Tentando conectar ao MongoDB...
✅ Conectado ao MongoDB: taskus_db/users
INFO: Uvicorn running on http://0.0.0.0:8000
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Status da API
- `GET /api/mongodb-status` - Status da conexão MongoDB

### Usuários (CRUD)
- `POST /api/user` - Criar usuário
- `GET /api/users/{user_id}` - Buscar usuário
- `GET /api/users?limit=50` - Listar usuários
- `PUT /api/user/{user_id}` - Atualizar usuário
- `DELETE /api/users/{user_id}` - Deletar usuário

### Progresso
- `POST /api/progress/{user_id}` - Atualizar progresso
- `GET /api/progress/{user_id}` - Obter progresso

### Integrações
- `POST /api/conversion` - Facebook Conversions API
- `GET /api/confirm-email` - Enviar email via Mailgun

### Documentação
- `GET /api/docs` - Swagger UI
- `GET /api/redoc` - ReDoc

## 🔄 Migração do Cosmos DB para MongoDB

### ✅ Mudanças Realizadas

1. **Dependências atualizadas** (`requirements.txt`)
   - ❌ Removido: `azure-cosmos`
   - ✅ Adicionado: `pymongo`, `motor`

2. **Novo serviço criado** (`mongodb_service.py`)
   - Classe `MongoDBService` com mesma interface
   - Métodos compatíveis com o código anterior
   - Tratamento de erros MongoDB específico

3. **app.py atualizado**
   - Importação alterada de `CosmosService` para `MongoDBService`
   - Endpoint `/api/cosmos-status` → `/api/mongodb-status`
   - Todas as chamadas redirecionadas para MongoDB

4. **Variáveis de ambiente atualizadas**
   - Removido: `COSMOS_*`
   - Adicionado: `MONGODB_URI`, `MONGODB_DATABASE`, `MONGODB_COLLECTION`

### 🗄️ Estrutura de Dados MongoDB

```json
{
  "_id": "user_20241119_143025_12",
  "userId": "user_20241119_143025_12",
  "type": "user",
  
  "nome": "João Silva",
  "firstName": "João",
  "lastName": "Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "idade": 25,
  "estado": "SP",
  "cidade": "São Paulo",
  
  "ip_adress": "192.168.1.1",
  "fbc": "fb.1.123456789",
  "fbp": "fb.1.987654321",
  "event_name": "PageView",
  "event_time": "1700412025",
  "action_source": "website",
  "event_source_url": "https://site.com",
  "client_user_agent": "Mozilla/5.0...",
  
  "currentStep": 0,
  "responses": {},
  "isCompleted": false,
  
  "progress": {
    "analisePerfil": {
      "respostas": {
        "pergunta1": {
          "resposta": "Opção A",
          "etapa": "step-1",
          "timestamp": "2024-11-19T14:30:25Z"
        }
      },
      "etapas": ["step-1", "step-2"],
      "ultimaAtualizacao": "2024-11-19T14:31:00Z",
      "completed": false
    }
  },
  
  "createdAt": "2024-11-19T14:30:25Z",
  "updatedAt": "2024-11-19T14:31:00Z"
}
```

### 🔍 Diferenças Principais

| Aspecto | Cosmos DB | MongoDB |
|---------|-----------|---------|
| Campo ID | `id` (string) | `_id` (ObjectId ou string) |
| Partition Key | Obrigatório | Não necessário |
| Consultas | SQL-like | MQL (MongoDB Query Language) |
| SDK | `azure-cosmos` | `pymongo` |
| Índices | Automáticos | Criados manualmente |

### 🔒 Índices Criados

```python
collection.create_index("email", unique=True)  # Email único
collection.create_index("createdAt")           # Ordenação por data
```

## 🐛 Troubleshooting

### Erro: "Não foi possível conectar ao MongoDB"

**Causas possíveis:**
1. URI incorreta no `.env`
2. IP não está na whitelist do MongoDB Atlas
3. Credenciais inválidas
4. Firewall bloqueando conexão

**Solução:**
```bash
# 1. Verificar variáveis de ambiente
cat .env | grep MONGODB

# 2. Testar conexão
python test_mongodb.py

# 3. Verificar IP whitelist no MongoDB Atlas
# Vá em: Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
```

### Erro: "ModuleNotFoundError: No module named 'pymongo'"

**Solução:**
```bash
pip install -r requirements.txt
```

### Erro: "duplicate key error"

**Causa:** Email já cadastrado

**Solução:** Use um email diferente ou delete o usuário existente

## 📊 Monitoramento

### Verificar Status

```bash
curl http://localhost:8000/api/health
curl http://localhost:8000/api/mongodb-status
```

### Logs Detalhados

O servidor imprime logs coloridos:
- 🔧 Configuração
- 🔄 Tentativas de conexão
- ✅ Sucesso
- ❌ Erros
- 📊 Informações

## 🔐 Segurança

### ⚠️ IMPORTANTE

1. **Nunca commite o arquivo `.env`**
   - Já está no `.gitignore`
   - Contém credenciais sensíveis

2. **CORS em Produção**
   - Altere `CORS_ORIGINS=*` para domínios específicos

3. **MongoDB Atlas**
   - Configure IP whitelist adequadamente
   - Use usuários com permissões mínimas necessárias

## 📝 Próximos Passos

- [ ] Implementar autenticação JWT
- [ ] Adicionar rate limiting
- [ ] Implementar cache com Redis
- [ ] Logs estruturados (logging module)
- [ ] Testes automatizados (pytest)
- [ ] CI/CD pipeline
- [ ] Monitoramento com Prometheus
- [ ] Documentação OpenAPI completa

## 🤝 Contribuindo

1. Sempre teste com `python test_mongodb.py` antes de commitar
2. Mantenha `.env.example` atualizado
3. Documente mudanças significativas
4. Siga o padrão de código existente

---

**Versão:** 2.0.0 (MongoDB)  
**Data:** 19 de Novembro de 2025  
**Autor:** Sistema de Recrutamento TaskUs
