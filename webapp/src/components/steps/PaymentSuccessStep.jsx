import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const PaymentSuccessStep = ({ onContinuar, dadosUsuario, userName }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onContinuar) {
      onContinuar();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl p-6">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="flex items-center gap-3 font-hendrix-semibold text-xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="w-8 h-8 text-green-500" />
              </motion.div>
              Conta Criada com Sucesso!
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 font-hendrix-regular text-base leading-relaxed pt-2">
            {userName && (
              <span className="font-hendrix-medium text-gray-800">
                Parabéns, {userName}!
              </span>
            )}{' '}
            Sua conta foi criada com sucesso e você está autenticado(a). Agora você pode prosseguir com o processo seletivo.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Button
            onClick={handleClose}
            className="w-full font-hendrix-semibold text-base py-6 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #1655ff 0%, #4285f4 100%)',
            }}
          >
            Continuar
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessStep;
