import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcess } from '../hooks/useProcess.js';
import CurriculoIntroStep from '../components/steps/CurriculoIntroStep.jsx';
import CurriculoCriacaoStep from '../components/steps/CurriculoCriacaoStep.jsx';
import CurriculoLocalizacaoStep from '../components/steps/CurriculoLocalizacaoStep.jsx';
import CurriculoEscolaridadeStep from '../components/steps/CurriculoEscolaridadeStep.jsx';
import CurriculoExperienciaStep from '../components/steps/CurriculoExperienciaStep.jsx';
import CurriculoFotoPadroesStep from '../components/steps/CurriculoFotoPadroesStep.jsx';
import CurriculoFotoVisualizacaoStep from '../components/steps/CurriculoFotoVisualizacaoStep.jsx';
import CurriculoFinalizadoStep from '../components/steps/CurriculoFinalizadoStep.jsx';
import CurriculoFotoEscolha from '@/components/steps/CurriculoFotoEscolhaStep.jsx';
import CurriculoHabilidadesStep from '@/components/steps/CurriculoHabilidades.jsx';

import ConfirmacaoCurriculo from '../components/steps/ConfirmacaoCurriculo.jsx';
import CurriculoLoadingStep from '../components/steps/CurriculoLoadingStep.jsx';



import LogoTaskUs from '../assets/logo-min.webp';

const  CurriculoPage = () => {
  const navigate = useNavigate();
  const { processData, updateProcessStep } = useProcess();
  const [currentStep, setCurrentStep] = useState(1);
  const [showLoadingStep, setShowLoadingStep] = useState(false);
  const [curriculoData, setCurriculoData] = useState({});
  const [dadosUsuario, setDadosUsuario] = useState();
  const [fotoUrl, setFotoUrl] = useState(null);
  const [arqivoPDf, setArquivoPdf] = useState({
    arquivo: null,
    usuario: null
  });


  useEffect(() => {
    // Carregar dados do usuário da sessionStorage e API
    const loadUserData = async () => {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        try {
          const { default: backendAPI } = await import('../services/backendAPIService.js');
          const result = await backendAPI.getUser(userId);
          if (result.success && result.data) {
            const user = result.data;
            // Preencher os campos do formulário
            setDadosUsuario({
              firstName: user.nome?.split(' ')[0] || '',
              lastName: user.nome?.split(' ').slice(1).join(' ') || '',
              email: user.email || '',
              phone: user.telefone || '',
              age: user.idade ? String(user.idade) : '',
              termsAccepted: true // Assume que já aceitou se está cadastrado
            });
          }
          // eslint-disable-next-line no-unused-vars
        } catch (err) {
          // Silencioso, não impede o fluxo
        }
      }
    };
    loadUserData();
    // eslint-disable-next-line
  }, []);

  const handleEnviarArquivo = async (arquivo) => {
    try {
      // Simular processamento do arquivo
      const dadosArquivo = {
        nome: arquivo.name,
        tipo: arquivo.type,
        tamanho: arquivo.size,
        dataEnvio: new Date().toISOString()
      };

      setArquivoPdf({
        arquivo: dadosArquivo,
        usuario: dadosUsuario
      });

      await updateProcessStep(
        'curriculo',
        1,
        { arquivo: dadosArquivo, metodo: 'envio_arquivo' },
        'arquivo_enviado'
      );

      // Avançar para próxima etapa ou finalizar
      setCurrentStep(10);

    } catch (error) {
      console.error('❌ Erro ao processar arquivo:', error);
    }
  };

  const handleCriarCurriculo = async () => {
    try {
      // Marcar que escolheu criar currículo
      const dadosCriacao = {
        metodo: 'criar_curriculo',
        inicioProcesso: new Date().toISOString()
      };

      setCurriculoData(prev => ({
        ...prev,
        ...dadosCriacao
      }));

      await updateProcessStep(
        'curriculo',
        1,
        dadosCriacao,
        'criar_curriculo'
      );

      console.log('✅ Processo de criação de currículo iniciado');

      // Avançar para formulário de criação
      setCurrentStep(2);

    } catch (error) {
      console.error('❌ Erro ao iniciar criação de currículo:', error);
    }
  };

  const handleConfirmarFoto = async () => {
    try {
      console.log('📷 Foto enviada, ir para visualização');
      // Simular URL da foto enviada com uma imagem SVG de perfil
      const fotoSimulada = "https://images.pexels.com/photos/2328141/pexels-photo-2328141.jpeg";

      setFotoUrl(fotoSimulada);
      setCurrentStep(9);


    } catch (error) {
      console.error('❌ Erro ao confirmar foto:', error);
    }
  };

  const handlePularFoto = async () => {
    setCurrentStep(10)
  };

  const handleFotoConfirmada = async () => {
    try {
      // Salvar foto confirmada
      const dadosFotoFinal = {
        foto: fotoUrl,
        fotoConfirmada: true,
        dataConfirmacao: new Date().toISOString()
      };

      setCurriculoData(prev => ({
        ...prev,
        ...dadosFotoFinal
      }));

      // Atualizar usuário com a URL da foto
      const userId = sessionStorage.getItem('userId');
      if (userId && fotoUrl) {
        const { default: backendAPI } = await import('../services/backendAPIService.js');
        await backendAPI.updateUser(userId, { foto: fotoUrl });
      }

      await updateProcessStep(
        'curriculo',
        2,
        dadosFotoFinal,
        'foto_confirmada'
      );

      console.log('✅ Foto confirmada e salva, indo para currículo finalizado');
      setCurrentStep(10);
    } catch (error) {
      console.error('❌ Erro ao confirmar foto final:', error);
    }
  };

  const handleEnviarParaAvaliacao = async () => {
    try {

      // Salvar que o currículo foi enviado para avaliação
      const dadosFinais = {
        ...curriculoData,
        enviadoParaAvaliacao: true,
        dataEnvio: new Date().toISOString()
      };

      await updateProcessStep(
        'curriculo',
        6,
        dadosFinais,
        'enviado_para_avaliacao'
      );


      setCurrentStep(11);

    } catch (error) {
      console.error('❌ Erro ao enviar para avaliação:', error);
    }
  };

  const handlePrecisoEditar = async () => {
    try {
      console.log('📝 Usuário quer editar dados');
      // Aqui você pode implementar a lógica para editar dados
      // Por exemplo, ir para uma tela de edição
      setCurrentStep(7); // Etapa de edição
    } catch (error) {
      console.error('❌ Erro ao iniciar edição:', error);
    }
  };

  const handleDadosCorretos = async () => {
    try {
      console.log('✅ Dados confirmados pelo usuário');

      // Atualizar dados do usuário no backend
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const { default: backendAPI } = await import('../services/backendAPIService.js');
        await backendAPI.updateUser(userId, {
          nome: dadosUsuario.nome,
          email: dadosUsuario.email,
          telefone: dadosUsuario.telefone,
          idade: dadosUsuario.idade ? parseInt(dadosUsuario.idade) : ''
        });
      }

      // Salvar confirmação dos dados
      await updateProcessStep(
        'curriculo',
        2,
        {
          ...curriculoData,
          ...dadosUsuario,
          dadosConfirmados: true,
          dataConfirmacao: new Date().toISOString()
        },
        'dados_confirmados'
      );

      // Avançar para etapa de localização
      setCurrentStep(3);

    } catch (error) {
      console.error('❌ Erro ao confirmar dados:', error);
    }
  };

  const handleVoltarLocalizacao = async () => {
    try {
      console.log('🔙 Voltando para dados salvos');
      setCurrentStep(2);
    } catch (error) {
      console.error('❌ Erro ao voltar:', error);
    }
  };

  const handleContinuarLocalizacao = async (dadosLocalizacao) => {
    try {
      // Extrair apenas nomes
      const dadosLocalizacaoSimples = {
        estado: dadosLocalizacao.estado?.nome || '',
        cidade: dadosLocalizacao.municipio?.nome || ''
      };
      console.log('📍 Dados de localização (simples):', dadosLocalizacaoSimples);

      // Salvar localização no cadastro do usuário
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const { default: backendAPI } = await import('../services/backendAPIService.js');
        await backendAPI.updateUser(userId, {
          estado: dadosLocalizacaoSimples.estado,
          cidade: dadosLocalizacaoSimples.cidade
        });
      }

      // Salvar dados de localização no progresso
      await updateProcessStep(
        'curriculo',
        3,
        dadosLocalizacaoSimples,
        'localizacao_confirmada'
      );

      setCurriculoData(prev => ({
        ...prev,
        localizacao: dadosLocalizacaoSimples
      }));

      // Avançar para etapa de escolaridade
      setCurrentStep(4);

    } catch (error) {
      console.error('❌ Erro ao salvar localização:', error);
    }
  };

  const handleVoltarEscolaridade = async () => {
    try {
      console.log('🔙 Voltando para localização');
      setCurrentStep(3);
    } catch (error) {
      console.error('❌ Erro ao voltar:', error);
    }
  };

  const handleSelecionarEscolaridade = async (escolaridade) => {
    try {
      console.log('🎓 Escolaridade selecionada:', escolaridade);

      // Salvar dados de escolaridade
      await updateProcessStep(
        'curriculo',
        4,
        {
          ...curriculoData,
          escolaridade: escolaridade,
          dataEscolaridade: new Date().toISOString()
        },
        'escolaridade_selecionada'
      );

      setCurriculoData(prev => ({
        ...prev,
        escolaridade: escolaridade
      }));

      // Avançar para etapa de experiência
      setCurrentStep(5);

    } catch (error) {
      console.error('❌ Erro ao salvar escolaridade:', error);
    }
  };

  const handleVoltarExperiencia = async () => {
    try {
      console.log('🔙 Voltando para escolaridade');
      setCurrentStep(4);
    } catch (error) {
      console.error('❌ Erro ao voltar:', error);
    }
  };

  const handleContinuarExperiencia = async (experiencias) => {
    try {
      // Padronizar campos para o formato desejado
      const experienciasFormatadas = experiencias.map(exp => ({
        nome: exp.nomeEmpresa,
        cargo: exp.funcao,
        inicio: exp.inicio,
        fim: exp.fim
      }));
      console.log('💼 Experiências adicionadas (formatadas):', experienciasFormatadas);

      // Salvar dados de experiência
      await updateProcessStep(
        'curriculo',
        5,
        experienciasFormatadas,
        'experiencias_adicionadas'
      );

      setCurriculoData(prev => ({
        ...prev,
        experiencias: experienciasFormatadas
      }));

      // Avançar para próxima etapa
      setCurrentStep(7);

    } catch (error) {
      console.error('❌ Erro ao salvar experiências:', error);
    }
  };


  const handleContinuarHabilidades = async (habilidades) => {
    try {
      // Salvar habilidades selecionadas no progresso
      await updateProcessStep(
        'curriculo',
        6,
        { habilidades },
        'habilidades_adicionadas'
      );

      setCurriculoData(prev => ({
        ...prev,
        habilidades: habilidades
      }));

      // Avançar para próxima etapa
      setCurrentStep(6);

    } catch (error) {
      console.error('❌ Erro ao salvar habilidades:', error);
    }
  };


  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo TaskUs */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <img
                  className='h-5'
                  src={LogoTaskUs}
                />
              </div>
            </div>

            {/* Logo Recrutamento Online */}
            <div className="flex items-center space-x-2">
              <span className="font-hendrix-medium text-xs text-gray-600">Recrutamento Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 pb-8">
            {/* Etapa 1: Introdução do currículo */}
            {currentStep === 1 && (
              <CurriculoIntroStep
                onEnviarArquivo={handleEnviarArquivo}
                onCriarCurriculo={handleCriarCurriculo}
              />
            )}

            {/* Etapa 2: Confirmação dos dados salvos */}
            {currentStep === 2 && (
              <CurriculoCriacaoStep
                dadosUsuario={dadosUsuario}
                onChange={setDadosUsuario}
                onPrecisoEditar={handlePrecisoEditar}
                onDadosCorretos={handleDadosCorretos}
              />
            )}

            {/* Etapa 3: Localização do usuário */}
            {currentStep === 3 && (
              <CurriculoLocalizacaoStep
                onVoltar={handleVoltarLocalizacao}
                onContinuar={handleContinuarLocalizacao}
              />
            )}

            {/* Etapa 4: Escolaridade do usuário */}
            {currentStep === 4 && (
              <CurriculoEscolaridadeStep
                onVoltar={handleVoltarEscolaridade}
                onSelecionarEscolaridade={handleSelecionarEscolaridade}
              />
            )}
  
            {currentStep === 5 && (

              <CurriculoHabilidadesStep
                onVoltar={handleVoltarExperiencia}
                onContinuar={handleContinuarHabilidades}
              />


              
            )}

            {currentStep === 6 && (
              <CurriculoExperienciaStep
                onVoltar={handleVoltarExperiencia}
                onContinuar={handleContinuarExperiencia}
              />
            )}

            {/* Etapa 6: Próximas etapas do currículo */}
            {currentStep === 7 && (
              <CurriculoFotoEscolha
                enviarFoto={() => {
                  setCurrentStep(8)
                }}
                pularEnvioFoto={() => {
                  setCurrentStep(10)
                }}
              />
            )}



            {/* Etapa Foto - Padrões */}
            {currentStep === 8 && (
              <CurriculoFotoPadroesStep
                onEnviarAgora={handleConfirmarFoto}
                onPular={handlePularFoto}
              />
            )}

            {/* Etapa Foto - Visualização */}
            {currentStep === 9 && (
              <CurriculoFotoVisualizacaoStep
                fotoUrl={fotoUrl}
                onConfirmar={handleFotoConfirmada}
              />
            )}

            {/* Etapa Currículo Finalizado */}
            {currentStep === 10 && (
              <CurriculoFinalizadoStep
                curriculoData={{
                  ...processData.userData,
                  ...processData.processes?.curriculo?.data,
                  ...curriculoData
                }}
                fotoUrl={fotoUrl}
                onEnviarParaAvaliacao={handleEnviarParaAvaliacao}
                dados={arqivoPDf}
              />
            )}

            {/* Etapa 11: Confirmação do Currículo */}
            {currentStep === 11 && !showLoadingStep && (
              <ConfirmacaoCurriculo
                dadosUsuario={dadosUsuario}
                onContinuar={() => {
                  setShowLoadingStep(true);
                }}
              />
            )}

            {/* Novo step de loading após confirmação do currículo */}
            {currentStep === 11 && showLoadingStep && (
              <CurriculoLoadingStep
                seconds={10}
                onCountdownFinish={() => {
                  navigate('/onConfirm');
                }}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculoPage;
