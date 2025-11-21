


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
   VITE_APP_TITLE=Sistema de Recrutamento 
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
- 📈 **Métricas de progresso** em tempo real.

