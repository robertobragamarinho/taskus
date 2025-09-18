import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcess } from '../hooks/useProcess.js';

const ProtectedRoute = ({ children, processName, redirectTo = '/' }) => {
  const navigate = useNavigate();
  
  // Usar contexto normalmente - se falhar, é responsabilidade do Provider
  const { canAccessProcess } = useProcess() || {};

  useEffect(() => {
    // Se não temos acesso às funções do contexto, consideramos como não autorizado
    if (!canAccessProcess || !canAccessProcess(processName)) {
      console.log(`Acesso negado ao processo: ${processName}`);
      navigate(redirectTo, { replace: true });
    }
  }, [canAccessProcess, processName, redirectTo, navigate]);

  // Se não pode acessar, não renderiza nada (enquanto redireciona)
  if (!canAccessProcess || !canAccessProcess(processName)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
