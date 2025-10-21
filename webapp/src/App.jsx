import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProcessProvider } from './contexts/ProcessContext.jsx';
import CadastroPage from './pages/CadastroPage.jsx';
import AnalisePerfilPage from './pages/AnalisePerfilPage.jsx';
import TesteHabilidadesPage from './pages/TesteHabilidadesPage.jsx';
import CurriculoPage from './pages/CurriculoPage.jsx';
import TelaPagamento from './pages/TelaPagamento.jsx';
import TelaContratacao from './pages/ContratacaoPage.jsx';
import TelaFinal from './pages/FinishPage.jsx';
import RealTimeAnalysisPage from './pages/RealTimeAnalysisPage.jsx';


import { LanguageProvider } from './contexts/LanguageContext.jsx';
import './App.css';
import './custom.css';
import './assets/fonts.css';

function App() {

  return (
    <LanguageProvider>
      <ProcessProvider>
        <Router>
          <Routes>
            {/* Rotas livres para desenvolvimento */}
            <Route path="/" element={<Navigate to="/cadastro" replace />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/analisePerfil" element={<AnalisePerfilPage />} />
            <Route path="/testeHabilidades" element={<TesteHabilidadesPage />} />
            <Route path="/curriculo" element={<CurriculoPage />} />
            <Route path="/realTimeAnalysis" element={<RealTimeAnalysisPage />} />
            <Route path="/onConfirm" element={<TelaContratacao />} />
            <Route path="/payment" element={<TelaPagamento />} />
            <Route path="/finally" element={<TelaFinal />} />
            {/*  */}
            {/* Rota de fallback - redireciona para cadastro */}
            <Route path="*" element={ <Navigate to="/" replace/> } />
          </Routes>
        </Router>
      </ProcessProvider>
    </LanguageProvider>
  );
}

export default App
