// ConfirmDialogContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { DialogConfirm } from '../../components/dialog/dialog-confirmacao';


type TConfirmDialog = {
  confirmDialog: (message: string, icon?: ReactNode) => Promise<boolean>;
};


// eslint-disable-next-line react-refresh/only-export-components
export const ConfirmDialogContext = createContext<TConfirmDialog>({} as TConfirmDialog);

export const ConfirmDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [resolver, setResolver] = useState<(value: boolean) => void>();
  const [itemIcon, setItemIcon] = useState<ReactNode>();

  const confirmDialog = (msg: string, icon: ReactNode) => {
    setMessage(msg);
    setIsOpen(true);    
    setItemIcon(icon);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    resolver?.(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolver?.(false);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirmDialog }}>
      {children}
      <DialogConfirm
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        descricao={message}
        icon={itemIcon}
      />
    </ConfirmDialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  return context;
};
