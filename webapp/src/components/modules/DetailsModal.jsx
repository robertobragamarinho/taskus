// components/DetailsModal.jsx
import React, { useEffect, useState } from 'react';
import { useProcess } from '@/hooks/useProcess.js';
import Imputs from '../modules/Imputs';

const DetailsModal = ({ open, onClose, candidate }) => {
  const { processData } = useProcess();

  const [form, setForm] = useState({
    nome: '', email: '', cpf: '', cidade: '', estado: '',
    disponibilidade: '', pretensao: '', experiencia: '', formacao: '',
  });

  useEffect(() => {
    if (open && processData) {
      // Buscar dados do contexto
      const userData = processData.userData || {};
      const curriculoData = processData.processes?.curriculo?.data || {};
      
      // Nome completo
      const firstName = userData.firstName || '';
      const lastName = userData.lastName || '';
      const nomeCompleto = `${firstName} ${lastName}`.trim();
      
      // Email e telefone
      const email = userData.email || '';
      const cpf = userData.cpf || '';
      
      // Localização
      const estado = userData.endereco?.Estado || userData.Estado || curriculoData.localizacao?.estado || '';
      const cidade = userData.endereco?.Cidade || userData.Cidade || curriculoData.localizacao?.cidade || '';
      
      // Outros dados
      const disponibilidade = userData.availability || userData.disponibilidade || '';
      const pretensao = userData.salaryExpectation || userData.pretensao || '';
      const experiencia = userData.experience || userData.experiencia || '';
      const formacao = curriculoData.escolaridade || userData.education || userData.formacao || '';

      setForm({
        nome: nomeCompleto,
        email: email,
        cpf: cpf,
        cidade: cidade,
        estado: estado,
        disponibilidade: disponibilidade,
        pretensao: pretensao,
        experiencia: experiencia,
        formacao: formacao,
      });
    }
  }, [open, processData]);

  const onChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
  const onSave = () => {
    console.log('Dados salvos:', form);
    onClose?.();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl mx-5">
        <div className="bg-white rounded-2xl  overflow-hidden animate-[slideDown_.4s_ease-out] max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between shrink-0" style={{ backgroundColor: '#00005f', color: '#fff' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <path d="M10 6C6.229 6 4.343 6 3.172 7.172S2 10.229 2 14s0 5.657 1.172 6.828S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22 14c0-1.17 0-2.158-.035-3" />
                  <path d="m18 2l.295.797c.386 1.044.58 1.566.96 1.947c.382.381.904.575 1.948.961L22 6l-.797.295c-1.044.386-1.566.58-1.947.96c-.381.382-.575.904-.961 1.948L18 10l-.295-.797c-.386-1.044-.58-1.566-.96-1.947c-.382-.381-.904-.575-1.948-.961L14 6l.797-.295c1.044-.386 1.566-.58 1.947-.96c.381-.382.575-.904.961-1.948z" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-semibold">Detalhes da entrevista</div>
              </div>
            </div>

            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-white" aria-label="Fechar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-5 overflow-y-auto grow" style={{ maxHeight: 'calc(85vh - 64px - 72px)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Imputs id="det-nome" label="Candidato(a)" placeholder="Nome completo" value={form.nome} onChange={onChange('nome')} />
              <Imputs id="det-email" type="email" label="E-mail" placeholder="email@exemplo.com" value={form.email} onChange={onChange('email')} className="break-all" />
              <Imputs id="det-estado" label="Estado" placeholder="UF" value={form.estado} onChange={onChange('estado')} />
              <Imputs id="det-cidade" label="Cidade" placeholder="Cidade" value={form.cidade} onChange={onChange('cidade')} />
              <Imputs id="det-disponibilidade" label="Disponibilidade" placeholder="Ex.: Integral, Meio período..." value={form.disponibilidade} onChange={onChange('disponibilidade')} />             
              {/* Bloco de vaga */}
              <div className="sm:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <span className="font-hendrix-semibold text-gray-400 text-sm">Vaga pretendida</span>
                  <div className="flex items-center mb-5">
                    <span className="font-hendrix-semibold text-blue-600 text-2xl">Atendente Home Office</span>
                  </div>
                  <div className="flex items-center mb-2 space-x-3 border-y py-2">
                    <div>
                      <span className="font-hendrix-medium text-gray-700 text-xs" style={{ fontSize: '10pt' }}>Salário mensal</span><br />
                      <span className="font-hendrix-semibold text-gray-900 text-lg" style={{ fontSize: '18pt', lineHeight: '1vw' }}>R$2.450,00</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-2 space-x-3 border-b py-2">
                    <div>
                      <span className="font-hendrix-medium text-gray-700 text-xs" style={{ fontSize: '10pt' }}>Vale alimentação</span><br />
                      <span className="font-hendrix-semibold text-gray-900 text-lg" style={{ fontSize: '18pt', lineHeight: '1vw' }}>R$450,00</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="font-hendrix-bold text-gray-700 text-xs" style={{ fontSize: '12pt' }}>+ Benefícios</span><br />
                    <p className="font-hendrix-regular text-gray-700 text-sm" style={{ fontSize: '11pt' }}>
                      Plano de saúde, plano odontológico e férias remuneradas.
                    </p>
                  </div>
                </div>
              </div>

            
            </div>
          </div>

          <div className="px-5 py-4 bg-white shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;