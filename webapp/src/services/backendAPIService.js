// Serviço para comunicação com o backend FastAPI
import axios from 'axios';

class BackendAPIService {
  constructor() {
    // Verificar se estamos em desenvolvimento
    const isDevelopment = import.meta.env.DEV;

    // URL base da API backend
    this.baseUrl = isDevelopment
      ? 'http://127.0.0.1:8000/api'  // Desenvolvimento
      : '/api';  // Produção (servido pelo mesmo servidor)

    // Configurar axios com timeout e interceptors
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000, // 10 segundos
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Interceptor para logs de request (apenas em dev)
    this.axiosInstance.interceptors.request.use((config) => {
      if (isDevelopment) {
        console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.url}`, config.data);
      }
      return config;
    });

    // Interceptor para tratamento de response
    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (isDevelopment) {
          console.log(`✅ API Response: ${response.config.method.toUpperCase()} ${response.config.url}`, response.data);
        }
        return response;
      },
      (error) => {
        console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Métodos para usuários
  async createUser(userData) {
    try {
      const response = await this.axiosInstance.post('/user', userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error(error.response?.data?.detail || 'Erro ao criar usuário');
    }
  }

  async getUser(userId) {
    try {
      const response = await this.axiosInstance.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error(error.response?.data?.detail || 'Erro ao buscar usuário');
    }
  }

  async updateUser(userId, userData) {
    try {
      const response = await this.axiosInstance.put(`/user/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error(error.response?.data?.detail || 'Erro ao atualizar usuário');
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.axiosInstance.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw new Error(error.response?.data?.detail || 'Erro ao deletar usuário');
    }
  }

  async listUsers(limit = 50) {
    try {
      const response = await this.axiosInstance.get(`/users?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw new Error(error.response?.data?.detail || 'Erro ao listar usuários');
    }
  }

  /**
   * Atualizar progresso do usuário
   * @param {string} userId - ID do usuário
   * @param {Object} progressData - Dados do progresso
   * @returns {Promise<Object>} Resposta da API
   */
  async updateProgress(userId, progressData) {
    try {
      console.log(`🔄 Atualizando progresso do usuário ${userId}:`, progressData);
      const response = await this.axiosInstance.post(`/progress/${userId}`, progressData);
      console.log('✅ Progresso atualizado com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar progresso:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obter progresso do usuário
   * @param {string} userId - ID do usuário
   * @returns {Promise<Object>} Progresso do usuário
   */
  async getProgress(userId) {
    try {
      const response = await this.axiosInstance.get(`/progress/${userId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao obter progresso:', error);
      throw this.handleError(error);
    }
  }

  // Métodos para verificações de status
  async checkHealth() {
    try {
      const response = await this.axiosInstance.get('/health');
      return response.data;
    } catch (error) {
      console.error('Erro no health check:', error);
      throw new Error(error.response?.data?.detail || 'Erro no health check');
    }
  }

  async checkCosmosStatus() {
    try {
      const response = await this.axiosInstance.get('/cosmos-status');
      return response.data;
    } catch (error) {
      console.error('Erro ao verificar status do Cosmos:', error);
      throw new Error(error.response?.data?.detail || 'Erro ao verificar status do Cosmos');
    }
  }

  /**
   * Envia evento de conversão para o backend (Meta/Facebook Conversion API)
   * @param {Object} conversionData - Dados do evento de conversão
   * @returns {Promise<Object>} Resposta da API
   */
  async sendConversionEvent(conversionData) {
    try {
      const response = await this.axiosInstance.post('/conversion', conversionData);
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar evento de conversão:', error);
      throw new Error(error.response?.data?.detail || 'Erro ao enviar evento de conversão');
    }
  }
}
// Exportar instância única do serviço
export const backendAPI = new BackendAPIService();
export default backendAPI;
