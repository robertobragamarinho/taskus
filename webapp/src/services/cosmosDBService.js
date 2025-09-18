import axios from 'axios';
import { COSMOS_DB_CONFIG } from '../config/cosmosConfig.js';

// Classe para gerenciar operações do Cosmos DB usando axios
class CosmosDBService {
  constructor() {
    // Verificar se estamos em desenvolvimento para usar o proxy
    const isDevelopment = import.meta.env.DEV;
    
    // URL base para as operações do Cosmos DB
    if (isDevelopment) {
      // Em desenvolvimento, usar o proxy do Vite
      this.baseUrl = `/cosmos/dbs/${COSMOS_DB_CONFIG.databaseId}/colls/${COSMOS_DB_CONFIG.containerId}`;
    } else {
      // Em produção, usar a URL direta (vai precisar de um backend)
      this.baseUrl = `${COSMOS_DB_CONFIG.endpoint}dbs/${COSMOS_DB_CONFIG.databaseId}/colls/${COSMOS_DB_CONFIG.containerId}`;
    }
    
    // Configurar axios com interceptors para autenticação
    this.axiosInstance = axios.create({
      timeout: 10000, // 10 segundos de timeout
    });
    
    // Interceptor para adicionar headers de autenticação automaticamente
    this.axiosInstance.interceptors.request.use((config) => {
      const date = new Date().toUTCString();
      
      // Headers básicos sempre presentes
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      // Em desenvolvimento, o proxy já adiciona os headers de auth
      if (!isDevelopment) {
        headers['Authorization'] = `type=master&ver=1.0&sig=${COSMOS_DB_CONFIG.key}`;
        headers['x-ms-version'] = '2018-12-31';
        headers['x-ms-date'] = date;
      }
      
      config.headers = {
        ...config.headers,
        ...headers
      };
      
      return config;
    });
    
    // Interceptor para tratar respostas e erros
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log('Resposta do Cosmos DB:', response.status, response.statusText);
        return response;
      },
      (error) => {
        console.error('Erro na requisição ao Cosmos DB:', error.response?.status, error.response?.statusText);
        console.error('Detalhes do erro:', error.response?.data);
        return Promise.reject(error);
      }
    );
    
    console.log(`CosmosDBService inicializado com axios (${isDevelopment ? 'desenvolvimento' : 'produção'})`);
    console.log('Base URL:', this.baseUrl);
  }

  // Método para criar/cadastrar usuário
  async createUser(userData) {
    try {
      const userDocument = {
        id: this.generateUserId(),
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        idade: userData.idade,
        processo: 'cadastro',
        etapa: 6,
        dataInicioProcesso: new Date().toISOString(),
        ultimaAtualizacao: new Date().toISOString(),
        status: 'cadastro_concluido',
        respostas: {
          cadastro: userData,
          analisePerfil: {},
          testeHabilidades: {}
        }
      };

      console.log('Criando usuário no Cosmos DB:', userDocument);
      
      // Usar axios para criar o documento
      const response = await this.axiosInstance.post(`${this.baseUrl}/docs`, userDocument, {
        headers: {
          'x-ms-documentdb-is-upsert': 'true'
        }
      });
      
      console.log('Usuário cadastrado com sucesso:', response.data);
      
      return {
        success: true,
        userId: response.data.id,
        data: response.data
      };
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      
      // Se for erro de CORS, vamos tentar uma abordagem alternativa
      if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
        console.warn('Erro de CORS detectado. Salvando dados localmente...');
        
        // Salvar dados no localStorage como fallback
        const userDocument = {
          id: this.generateUserId(),
          nome: userData.nome,
          email: userData.email,
          telefone: userData.telefone,
          idade: userData.idade,
          processo: 'cadastro',
          etapa: 6,
          dataInicioProcesso: new Date().toISOString(),
          ultimaAtualizacao: new Date().toISOString(),
          status: 'cadastro_concluido',
          respostas: {
            cadastro: userData,
            analisePerfil: {},
            testeHabilidades: {}
          }
        };
        
        localStorage.setItem(`cosmos_user_${userDocument.id}`, JSON.stringify(userDocument));
        
        return {
          success: true,
          userId: userDocument.id,
          data: userDocument,
          fallback: true
        };
      }
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Método para atualizar progresso do usuário
  async updateUserProgress(userId, processo, etapa, resposta = null, perguntaId = null) {
    try {
      console.log('Atualizando progresso:', { userId, processo, etapa, resposta, perguntaId });
      
      // Primeiro, tentar buscar o documento atual
      let currentUser;
      try {
        const getUserResponse = await this.axiosInstance.get(`${this.baseUrl}/docs/${userId}`);
        currentUser = getUserResponse.data;
      } catch {
        // Se falhar, verificar localStorage como fallback
        const localData = localStorage.getItem(`cosmos_user_${userId}`);
        if (localData) {
          currentUser = JSON.parse(localData);
          console.log('Usando dados do localStorage como fallback');
        } else {
          throw new Error(`Usuário não encontrado: ${userId}`);
        }
      }

      // Atualizar os dados
      const updatedUser = {
        ...currentUser,
        processo: processo,
        etapa: etapa,
        ultimaAtualizacao: new Date().toISOString(),
        status: `${processo}_etapa_${etapa}`
      };

      // Se há uma resposta, adicionar às respostas do processo
      if (resposta && perguntaId) {
        if (!updatedUser.respostas[processo]) {
          updatedUser.respostas[processo] = {};
        }
        updatedUser.respostas[processo][perguntaId] = resposta;
      }

      // Tentar fazer update no Cosmos DB
      try {
        const response = await this.axiosInstance.put(`${this.baseUrl}/docs/${userId}`, updatedUser, {
          headers: {
            'x-ms-documentdb-is-upsert': 'true'
          }
        });
        
        console.log('Progresso atualizado no Cosmos DB:', { processo, etapa, resposta, perguntaId });
        
        return {
          success: true,
          data: response.data
        };
      } catch (updateError) {
        // Se falhar, salvar no localStorage como fallback
        console.warn('Erro ao atualizar no Cosmos DB, salvando localmente:', updateError.message);
        localStorage.setItem(`cosmos_user_${userId}`, JSON.stringify(updatedUser));
        
        return {
          success: true,
          data: updatedUser,
          fallback: true
        };
      }
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Método para buscar usuário por ID
  async getUserById(userId) {
    try {
      // Primeiro, tentar buscar no Cosmos DB
      try {
        const response = await this.axiosInstance.get(`${this.baseUrl}/docs/${userId}`);
        return {
          success: true,
          data: response.data
        };
      } catch {
        // Se falhar, verificar localStorage como fallback
        const localData = localStorage.getItem(`cosmos_user_${userId}`);
        if (localData) {
          console.log('Usuário encontrado no localStorage');
          return {
            success: true,
            data: JSON.parse(localData),
            fallback: true
          };
        } else {
          throw new Error(`Usuário não encontrado: ${userId}`);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Método para completar processo
  async completeProcess(userId, processo, respostasFinais) {
    try {
      return await this.updateUserProgress(userId, processo, 'concluido', respostasFinais, 'final');
    } catch (error) {
      console.error('Erro ao completar processo:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Gerar ID único para usuário
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Instância singleton do serviço
const cosmosDBService = new CosmosDBService();

export default cosmosDBService;
