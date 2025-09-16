import React, { useState, useEffect } from 'react';
import { ProcessContext } from './ProcessContextDefinition.js';

// Provider do contexto
const ProcessProvider = ({ children }) => {
  
  const [processData, setProcessData] = useState({
    // Dados do usuário
    userData: {},
    
    // ID do usuário no banco de dados
    userId: null,
    
    // Status dos processos
    processes: {
      cadastro: {
        completed: false,
        currentStep: 1,
        totalSteps: 6,
        data: {}
      },
      analisePerfil: {
        completed: false,
        currentStep: 1,
        totalSteps: 10,
        data: {}
      },
      testeHabilidades: {
        completed: false,
        currentStep: 1,
        totalSteps: 6, // 1 intro + 5 simulações de conversa
        data: {}
      },
      curriculo: {
        completed: false,
        currentStep: 1,
        totalSteps: 5, // 1 intro + 4 etapas de criação
        data: {}
      }
    }
  });

  // Carregar dados da sessão na inicialização
  useEffect(() => {
    const savedUserId = sessionStorage.getItem('userId');
    const savedData = localStorage.getItem('processData');

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProcessData(prev => ({
          ...prev,
          ...parsed,
          userData: parsed.userData || {},
          userId: parsed.userId || savedUserId || null
        }));
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    } else if (savedUserId) {
      setProcessData(prev => ({
        ...prev,
        userId: savedUserId
      }));
    }
  }, []);

  // Salvar dados no localStorage sempre que processData mudar
  useEffect(() => {
    localStorage.setItem('processData', JSON.stringify(processData));
  }, [processData]);

  // Função para atualizar dados do usuário
  const updateUserData = (data) => {
    setProcessData(prev => ({
      ...prev,
      userData: { ...prev.userData, ...data }
    }));
  };

  // Função para cadastrar usuário no banco e SEMPRE salvar no contexto
  const registerUser = async (userData) => {
    try {
      // Import dinâmico do novo serviço do backend
      const { default: backendAPI } = await import('../services/backendAPIService.js');

      // Criar usuário via API backend
      const result = await backendAPI.createUser(userData);

      if (result.success) {
        // Salvar ID do usuário na sessão
        sessionStorage.setItem('userId', result.userId);

        // Atualizar contexto com dados completos retornados da API
        setProcessData(prev => ({
          ...prev,
          userId: result.userId,
          userData: result.data || userData // prioriza dados do backend, fallback para enviados
        }));

        return result;
      } else {
        throw new Error(result.message || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('❌ Erro ao cadastrar usuário:', error);

      // Fallback para localStorage se o backend falhar
      const fallbackUserId = `user_offline_${Date.now()}`;
      sessionStorage.setItem('userId', fallbackUserId);

      // Salva no contexto mesmo em caso de erro
      setProcessData(prev => ({
        ...prev,
        userId: fallbackUserId,
        userData: userData
      }));

      console.warn('⚠️ Usando modo offline - dados salvos localmente : ', userData);
      return {
        success: true,
        userId: fallbackUserId,
        message: 'Dados salvos localmente (modo offline)',
        offline: true
      };
    }
  };

  // Função para atualizar etapa de um processo (com salvamento no banco)
  const updateProcessStep = async (processName, step, resposta = null, perguntaId = null) => {
    try {
      console.log('Atualizando step:', { processName, step, resposta, perguntaId });

      // Atualizar estado local
        let userIdToUse;
        setProcessData(prev => {
          userIdToUse = prev.userId || sessionStorage.getItem('userId');
          const safeProcess = prev.processes?.[processName] || { currentStep: 1, data: {} };
          const safeData = safeProcess.data || {};
          return {
            ...prev,
            processes: {
              ...prev.processes,
              [processName]: {
                ...safeProcess,
                currentStep: step,
                data: { ...safeData, ...resposta }
              }
            }
          };
        });

      // Buscar userId do estado ou sessionStorage
        // Se temos userId, salvar no backend
        if (userIdToUse) {
          // Import dinâmico para evitar problemas de dependência circular
          const { default: backendAPI } = await import('../services/backendAPIService.js');

          // Extrair a resposta corretamente - pode ser string direta ou objeto
          let respostaTexto = null;
          if (resposta) {
            if (typeof resposta === 'string') {
              respostaTexto = resposta;
            } else if (typeof resposta === 'object') {
              respostaTexto = Object.values(resposta)[0] || resposta;
            }
          }

          // Preparar dados do progresso
          const progressData = {
            etapa: `${processName}_${step}`,
            respostas: {
              [perguntaId || step]: respostaTexto || "sem_resposta"
            },
            metadados: {
              processName,
              perguntaId,
              timestamp: new Date().toISOString()
            }
          };

          console.log('Salvando progresso no backend:', {
            userId: userIdToUse,
            progressData
          });

          try {
            const result = await backendAPI.updateProgress(userIdToUse, progressData);

            if (result.success) {
              console.log('✅ Progresso salvo com sucesso no backend');
            } else {
              console.error('❌ Erro ao salvar progresso:', result.message);
            }
          } catch (backendError) {
            console.error('❌ Erro de conexão com backend:', backendError);
            // Fallback para localStorage se o backend falhar
            localStorage.setItem(`progress_${userIdToUse}`, JSON.stringify({
              etapa: `${processName}_${step}`,
              respostas: {
                [perguntaId || step]: respostaTexto || "sem_resposta"
              },
              metadados: {
                processName,
                perguntaId,
                timestamp: new Date().toISOString()
              }
            }));
          }
        }

      // Se temos userId, salvar no backend
      if (userIdToUse) {
        // Import dinâmico para evitar problemas de dependência circular
        const { default: backendAPI } = await import('../services/backendAPIService.js');

        // Extrair a resposta corretamente - pode ser string direta ou objeto
        let respostaTexto = null;
        if (resposta) {
          if (typeof resposta === 'string') {
            respostaTexto = resposta;
          } else if (typeof resposta === 'object') {
            respostaTexto = Object.values(resposta)[0] || resposta;
          }
        }

        // Preparar dados do progresso
        const progressData = {
          etapa: `${processName}_${step}`,
          respostas: {
            [perguntaId || step]: respostaTexto || "sem_resposta"
          },
          metadados: {
            processName,
            perguntaId,
            timestamp: new Date().toISOString()
          }
        };

        console.log('Salvando progresso no backend:', {
          userId: userIdToUse,
          progressData
        });

        try {
          const result = await backendAPI.updateProgress(userIdToUse, progressData);

          if (result.success) {
            console.log('✅ Progresso salvo com sucesso no backend');
          } else {
            console.error('❌ Erro ao salvar progresso:', result.message);
          }
        } catch (backendError) {
          console.error('❌ Erro de conexão com backend:', backendError);
          // Fallback para localStorage se o backend falhar
          localStorage.setItem(`progress_${userIdToUse}`, JSON.stringify({
            ...progressData,
            saved_offline: true,
            timestamp: new Date().toISOString()
          }));
          console.warn('⚠️ Progresso salvo localmente (backend indisponível)');
        }
      } else {
        console.warn('UserId não encontrado - não salvando no banco');
      }

      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar etapa:', error);
      return { success: false, error: error.message };
    }
  };

  // Função para completar um processo (com salvamento no banco)
  const completeProcess = async (processName, finalData = {}) => {
    try {
      // Atualizar estado local
      setProcessData(prev => ({
        ...prev,
        processes: {
          ...prev.processes,
          [processName]: {
            ...prev.processes[processName],
            completed: true,
            data: { ...prev.processes[processName].data, ...finalData }
          }
        }
      }));

      // Se temos userId, salvar no backend
      if (processData.userId) {
        // Import dinâmico para evitar problemas de dependência circular
        const { default: backendAPI } = await import('../services/backendAPIService.js');
        
        // Preparar dados finais do processo
        const progressData = {
          etapa: `${processName}_completed`,
          respostas: finalData,
          porcentagem: 100,
          metadados: {
            processName,
            completed: true,
            completion_time: new Date().toISOString()
          }
        };
        
        try {
          const result = await backendAPI.updateProgress(processData.userId, progressData);
          
          if (result.success) {
            console.log('✅ Processo completado com sucesso no backend');
          } else {
            console.error('❌ Erro ao completar processo:', result.message);
          }
        } catch (backendError) {
          console.error('❌ Erro de conexão com backend:', backendError);
          // Fallback para localStorage se o backend falhar
          localStorage.setItem(`completed_${processData.userId}_${processName}`, JSON.stringify({
            ...progressData,
            saved_offline: true
          }));
          console.warn('⚠️ Conclusão salva localmente (backend indisponível)');
        }
      }
    } catch (error) {
      console.error('Erro ao completar processo:', error);
    }
  };

  // Função para verificar se um processo pode ser acessado
  const canAccessProcess = (processName) => {
    // Durante desenvolvimento, permitir acesso direto digitando ?dev=true na URL
    const isDev = window.location.search.includes('dev=true');
    
    switch (processName) {
      case 'cadastro':
        return true; // Sempre pode acessar o cadastro
      
      case 'analisePerfil':
        return isDev || processData.processes.cadastro.completed;
      
      case 'testeHabilidades':
        return isDev || (processData.processes.cadastro.completed && 
               processData.processes.analisePerfil.completed);
      
      case 'curriculo':
        return isDev || (processData.processes.cadastro.completed && 
               processData.processes.analisePerfil.completed &&
               processData.processes.testeHabilidades.completed);
      
      default:
        return false;
    }
  };

  // Função para obter dados completos para envio à API
  const getProcessDataForAPI = (processName) => {
    const baseData = {
      ...processData.userData,
      ...processData.processes[processName].data,
      processo: processName,
      etapa: processData.processes[processName].currentStep
    };

    return baseData;
  };

  // Função para resetar todos os dados (útil para desenvolvimento/testes)
  const resetAllData = () => {
    setProcessData({
      userData: {},
      userId: null,
      processes: {
        cadastro: {
          completed: false,
          currentStep: 1,
          totalSteps: 6,
          data: {}
        },
        analisePerfil: {
          completed: false,
          currentStep: 1,
          totalSteps: 10,
          data: {}
        },
        testeHabilidades: {
          completed: false,
          currentStep: 1,
          totalSteps: 6,
          data: {}
        },
        curriculo: {
          completed: false,
          currentStep: 1,
          totalSteps: 5,
          data: {}
        }
      }
    });
    localStorage.removeItem('processData');
    sessionStorage.removeItem('userId');
  };

  const value = {
    processData,
    updateUserData,
    registerUser,
    updateProcessStep,
    completeProcess,
    canAccessProcess,
    getProcessDataForAPI,
    resetAllData
  };


  return (
    <ProcessContext.Provider value={value}>
      {children}
    </ProcessContext.Provider>
  );
};

// Exportar o ProcessProvider como export nomeado
export { ProcessProvider };
