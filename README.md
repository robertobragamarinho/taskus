
# 🚀 Sistema de Recrutamento ProfitSeller

Sistema completo de recrutamento com formulário multi-etapas, análise de perfil e salvamento em tempo real no Azure Cosmos DB.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Como Executar Localmente](#como-executar-localmente)
- [Funcionalidades](#funcionalidades)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contribuição](#contribuição)

## 🎯 Visão Geral

O **Sistema de Recrutamento ProfitSeller** é uma aplicação completa que permite:

- **Cadastro de candidatos** com validação de dados
- **Análise de perfil interativa** com questionário multi-etapas
- **Salvamento em tempo real** de todas as respostas
- **Interface responsiva** e moderna
- **Fallback offline** para garantir que nenhum dado seja perdido

### ✨ Características Principais

- 🔄 **Salvamento Automático**: Cada resposta é salva automaticamente no banco de dados
- 📱 **Responsivo**: Interface adaptada para desktop e mobile
- 🌐 **Multilíngue**: Suporte a português e inglês
- ☁️ **Cloud Ready**: Integração com Azure Cosmos DB
- 🔒 **Validação**: Validação completa de dados no frontend e backend
- 📊 **Monitoramento**: Logs detalhados para debugging e auditoria

## 🏗 Arquitetura do Sistema

```text
┌───────────────┐    HTTP/REST    ┌───────────────┐    SDK    ┌───────────────┐
│   Frontend    │ ──────────────> │   Backend     │ ────────> │ Azure Cosmos  │
│   (React)     │ <────────────── │   (FastAPI)   │ <──────── │     DB        │
└───────────────┘   JSON Response └───────────────┘  Response └───────────────┘
   Port 5173                       Port 8000           Cloud Database
```

### Fluxo de Dados

1. **Usuário** interage com o frontend React
2. **Frontend** envia dados via API REST para o backend
3. **Backend** valida e processa os dados
4. **Backend** salva no Azure Cosmos DB
5. **Backend** retorna confirmação para o frontend
6. **Frontend** atualiza a interface e logs

## 📁 Estrutura do Projeto

```text
projetoForm/
├── README.md                    # Este arquivo
├── CHANGELOG.md                 # Histórico de mudanças
├── webapp/                      # Frontend React
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── elements/        # Elementos reutilizáveis
│   │   │   ├── forms/           # Formulários
│   │   │   ├── steps/           # Etapas do processo
│   │   │   └── ui/              # Componentes de UI (shadcn/ui)
│   │   ├── contexts/            # Contextos React
│   │   │   ├── ProcessContext.jsx  # Gerenciamento de estado
│   │   │   └── LanguageContext.jsx # Controle de idioma
│   │   ├── hooks/               # Custom hooks
│   │   ├── lib/                 # Utilitários e configurações
│   │   ├── pages/               # Páginas da aplicação
│   │   ├── services/            # Serviços de API
│   │   │   └── backendAPIService.js # Comunicação com backend
│   │   ├── App.jsx                 # Componente principal
│   │   └── main.jsx               # Ponto de entrada
│   ├── package.json               # Dependências do frontend
│   ├── vite.config.js             # Configuração do Vite
│   └── .env.example               # Variáveis de ambiente exemplo
└── serverapp/                   # Backend FastAPI
   ├── models/                  # Modelos de dados
   │   └── user_models.py          # Modelos Pydantic
   ├── services/                # Serviços
   │   └── cosmos_service.py       # Integração Cosmos DB
   ├── app.py                      # Aplicação principal FastAPI
   ├── requirements.txt            # Dependências Python
   ├── .env.example                # Variáveis de ambiente exemplo
   └── test_cosmos.py              # Testes de conexão
```

## 🛠 Tecnologias Utilizadas

### Frontend (webapp/)
- **React 18** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e dev server rápido
- **React Router** - Roteamento de páginas
- **Axios** - Cliente HTTP para APIs
- **Framer Motion** - Animações e transições
- **Lucide React** - Ícones modernos
- **Radix UI** - Componentes acessíveis
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI prontos

### Backend (serverapp/)
- **FastAPI** - Framework web moderno para Python
- **Uvicorn** - Servidor ASGI de alta performance
- **Pydantic** - Validação de dados e modelos
- **Azure Cosmos SDK** - Integração com Cosmos DB
- **Python-dotenv** - Gerenciamento de variáveis de ambiente

### Banco de Dados
- **Azure Cosmos DB** - Banco NoSQL distribuído globalmente

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **Python** (versão 3.9 ou superior)
- **npm** ou **yarn**
- **Azure Cosmos DB** (conta e chaves de acesso)

### 1. Configuração do Backend

1. **Navegar para a pasta do servidor**:
   ```bash
   cd serverapp
   ```

2. **Criar ambiente virtual** (recomendado):
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Instalar dependências**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar variáveis de ambiente**:
   ```bash
   # Copiar arquivo de exemplo
   copy .env.example .env
   
   # Editar .env com suas credenciais do Azure
   ```

   **Arquivo .env**:
   ```bash
   # Configurações do Azure Cosmos DB
   COSMOS_ENDPOINT=https://sua-conta.documents.azure.com:443/
   COSMOS_KEY=sua_chave_primaria_aqui
   COSMOS_DATABASE=Users
   COSMOS_CONTAINER=Users
   
   # Configurações do Servidor
   HOST=0.0.0.0
   PORT=8000
   DEBUG=True
   
   # CORS
   CORS_ORIGINS=*
   ```

### 2. Configuração do Frontend

1. **Navegar para a pasta do webapp**:
   ```bash
   cd webapp
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente**:
   ```bash
   # Copiar arquivo de exemplo
   copy .env.example .env
   
   # Geralmente não precisa alterar para desenvolvimento local
   ```

   **Arquivo .env**:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   VITE_APP_TITLE=Sistema de Recrutamento ProfitSeller
   ```

## 🚀 Como Executar Localmente

### Método 1: Execução Manual (Recomendado para desenvolvimento)

#### 1. Iniciar o Backend
```bash
# Terminal 1 - Backend
cd serverapp
python app.py
```

**Saída esperada**:
```
✅ Conectado ao Cosmos DB: Users/Users
INFO: Uvicorn running on http://0.0.0.0:8000
```

#### 2. Iniciar o Frontend
```bash
# Terminal 2 - Frontend
cd webapp
npm run dev
```

**Saída esperada**:
```
VITE v6.3.5 ready in 5893 ms
➜ Local: http://localhost:5173/
```

#### 3. Acessar a Aplicação
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs

### Método 2: Scripts Automatizados

#### Para Windows (PowerShell):
```powershell
# Criar script start.ps1
$backend = Start-Process powershell -ArgumentList "cd serverapp; python app.py" -PassThru
$frontend = Start-Process powershell -ArgumentList "cd webapp; npm run dev" -PassThru

Write-Host "Backend PID: $($backend.Id)"
Write-Host "Frontend PID: $($frontend.Id)"
Write-Host "Acesse: http://localhost:5173"
```

## ⭐ Funcionalidades

### 1. **Sistema de Cadastro**
- Formulário com validação em tempo real
- Campos: Nome, Email, Telefone, Idade
- Criação automática do usuário no banco
- Geração de ID único para sessão

### 2. **Análise de Perfil Interativa**
- **10 perguntas estratégicas** sobre motivação e perfil
- **Múltipla escolha** com seleção intuitiva
- **Salvamento automático** de cada resposta
- **Progresso visual** com barra de porcentagem
- **Navegação fluida** entre perguntas

### 3. **Salvamento em Tempo Real**
- 🔄 **Cada resposta é salva imediatamente** no Cosmos DB
- 📱 **Fallback offline** com localStorage
- 🔍 **Logs detalhados** para monitoramento
- ⚡ **Performance otimizada** com validação rápida

### 4. **Interface Moderna**
- 🎨 **Design responsivo** (mobile-first)
- 🌗 **Animações suaves** com Framer Motion
- 🌍 **Suporte a idiomas** (PT/EN)
- ♿ **Acessibilidade** com Radix UI

### 5. **Monitoramento e Logs**
- 📊 **Console logs** detalhados no frontend
- 🔍 **API logs** estruturados no backend
- ❌ **Error handling** robusto
- 📈 **Métricas de progresso** em tempo real

## 📚 API Documentation

### Endpoints Principais

#### **Usuários**
```http
POST /api/users              # Criar usuário
GET  /api/users/{user_id}    # Obter usuário específico
PUT  /api/users/{user_id}    # Atualizar usuário
DELETE /api/users/{user_id}  # Deletar usuário
GET  /api/users              # Listar usuários
```

#### **Progresso**
```http
POST /api/progress/{user_id} # Atualizar progresso
GET  /api/progress/{user_id} # Obter progresso
```

#### **Sistema**
```http
GET /api/health              # Verificar saúde da API
GET /api/cosmos-status       # Status do Cosmos DB
```

### Exemplo de Uso da API

#### Criar Usuário
```bash
curl -X POST "http://localhost:8000/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com", 
    "telefone": "(11) 99999-9999",
    "idade": 25
  }'
```

#### Salvar Progresso
```bash
curl -X POST "http://localhost:8000/api/progress/user_123" \
  -H "Content-Type: application/json" \
  -d '{
    "etapa": "analise-perfil",
    "respostas": {
      "pergunta1": "Quero trabalhar de casa e ter mais liberdade"
    },
    "porcentagem": 10,
    "metadados": {
      "timestamp": "2025-07-30T10:00:00Z"
    }
  }'
```

### Documentação Interativa

Acesse **http://localhost:8000/api/docs** para ver a documentação interativa do Swagger UI.

## 🔧 Troubleshooting

### Problemas Comuns

#### ❌ "Erro de conexão com Cosmos DB"
**Causa**: Credenciais incorretas ou serviço indisponível  
**Solução**:
1. Verificar variáveis no arquivo `.env`
2. Confirmar que a conta Cosmos DB está ativa
3. Testar conexão: `cd serverapp && python test_cosmos.py`

#### ❌ "CORS error no frontend"
**Causa**: Política CORS mal configurada  
**Solução**:
1. Verificar se backend está rodando na porta 8000
2. Confirmar configuração CORS no `app.py`
3. Limpar cache do navegador (Ctrl+Shift+R)

#### ❌ "Módulo não encontrado"
**Causa**: Dependências não instaladas  
**Solução**:
```bash
# Backend
cd serverapp && pip install -r requirements.txt

# Frontend  
cd webapp && npm install
```

#### ❌ "motion is not defined" ou "ReferenceError"
**Causa**: Import do Framer Motion incorreto ou faltando  
**Solução**:
1. Verificar se `framer-motion` está instalado: `npm list framer-motion`
2. Corrigir imports nos arquivos React:
```jsx
// ✅ Correto
import { motion, AnimatePresence } from 'framer-motion';

// ❌ Incorreto (faltando motion)
import { AnimatePresence } from 'framer-motion';
```
3. Se necessário, reinstalar: `npm install framer-motion`

#### ❌ "Port already in use"
**Causa**: Porta já está sendo usada  
**Solução**:
```bash
# Verificar processos na porta
netstat -ano | findstr :8000
netstat -ano | findstr :5173

# Matar processo se necessário
taskkill /PID <numero_do_pid> /F
```

### Verificação do Sistema

#### Checklist de Funcionamento ✅

1. **Backend**:
   - [ ] Cosmos DB conectado
   - [ ] API respondendo em http://localhost:8000/api/health
   - [ ] Logs sem erros no terminal

2. **Frontend**:
   - [ ] Vite rodando em http://localhost:5173
   - [ ] Página carregando sem erros
   - [ ] Console sem erros críticos

3. **Integração**:
   - [ ] Cadastro de usuário funcionando
   - [ ] Análise de perfil salvando respostas
   - [ ] Logs de sucesso no console

### Logs Importantes

#### Frontend (F12 > Console)
```
✅ Usuário cadastrado com sucesso: user_12345
🔄 Atualizando progresso do usuário user_12345
✅ Progresso atualizado com sucesso
```

#### Backend (Terminal)
```
✅ Conectado ao Cosmos DB: Users/Users
✅ Usuário criado: user_12345
✅ Progresso atualizado: user_12345 - Etapa 1
INFO: POST /api/users - Status 200
```

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o repositório
2. **Clone** sua fork localmente
3. **Crie uma branch** para sua feature: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
5. **Push** para a branch: `git push origin feature/nova-funcionalidade`
6. **Abra um Pull Request**

### Padrões de Código

#### Frontend
- **ESLint** configurado
- **Prettier** para formatação
- **Componentes funcionais** com hooks
- **TypeScript** quando necessário

#### Backend
- **PEP 8** para Python
- **Type hints** obrigatórias
- **Docstrings** em funções públicas
- **Testes unitários** com pytest

### Estrutura de Commits

```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: mudanças de formatação
refactor: refatora código existente
test: adiciona ou corrige testes
chore: mudanças de build/configuração
```

---

## 📞 Suporte

Para dúvidas, problemas ou sugestões:

- **Documentação**: Consulte este README
- **Logs**: Verifique console do navegador e terminal do backend
- **API Docs**: http://localhost:8000/api/docs
- **Issues**: Abra uma issue no repositório

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">

**🚀 Sistema de Recrutamento ProfitSeller**  
*Desenvolvido com ❤️ para otimizar processos de recrutamento*

</div>
