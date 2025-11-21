import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProcessProvider } from './contexts/ProcessContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

import CadastroPage from './pages/CadastroPage.jsx';
import AnalisePerfilPage from './pages/AnalisePerfilPage.jsx';
import TesteHabilidadesPage from './pages/TesteHabilidadesPage.jsx';
import CurriculoPage from './pages/CurriculoPage.jsx';
import TelaPagamento from './pages/TelaPagamento.jsx';
import TelaContratacao from './pages/ContratacaoPage.jsx';
import TelaFinal from './pages/FinishPage.jsx';
import RealTimeAnalysisPage from './pages/RealTimeAnalysisPage.jsx';
import BlockDesktop from './BlockDesktop.jsx';

import './App.css';
import './custom.css';
import './assets/fonts.css';

// ================================
// 1) CHAVE DO SESSION STORAGE
// ================================
const DEVICE_STORAGE_KEY = "app_device_type_session";

// ================================
// 2) DETECÇÃO DO DISPOSITIVO
// ================================
const IS_MOBILE = (() => {
  let storedDevice = null;

  try {
    storedDevice = sessionStorage.getItem(DEVICE_STORAGE_KEY);
  } catch {}

  if (storedDevice === "mobile") return true;
  if (storedDevice === "desktop") return false;

  const ua = navigator.userAgent || navigator.vendor || window.opera;

  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  try {
    sessionStorage.setItem(
      DEVICE_STORAGE_KEY,
      isMobileUA ? "mobile" : "desktop"
    );
  } catch {}

  return isMobileUA;
})();

const IS_DESKTOP = !IS_MOBILE;

// ================================
// 3) APP COM ROTEAMENTO BLOQUEADO
// ================================
function App() {

  // ❌ DESKTOP — bloquear TUDO e mostrar apenas tela fixa
  if (IS_DESKTOP) {
    return (
      <LanguageProvider>
        <ProcessProvider>
          <Router>
            <Routes>
              <Route path="*" element={<BlockDesktop />} />
            </Routes>
          </Router>
        </ProcessProvider>
      </LanguageProvider>
    );
  }

  // ✅ MOBILE — fluxo completo liberado
  return (
    <LanguageProvider>
      <ProcessProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/cadastro" replace />} />

            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/analisePerfil" element={<AnalisePerfilPage />} />
            <Route path="/testeHabilidades" element={<TesteHabilidadesPage />} />
            <Route path="/curriculo" element={<CurriculoPage />} />
            <Route path="/realTimeAnalysis" element={<RealTimeAnalysisPage />} />
            <Route path="/onConfirm" element={<TelaContratacao />} />
            <Route path="/payment" element={<TelaPagamento />} />
            <Route path="/finally" element={<TelaFinal />} />

            <Route path="*" element={<Navigate to="/cadastro" replace />} />
          </Routes>
        </Router>
      </ProcessProvider>
    </LanguageProvider>
  );
}

export default App;