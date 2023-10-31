import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { DialogContext } from './dialogContext';
import { IDialog, DialogComponent } from './types';

export const DialogProvider = ({ children }: { children: JSX.Element }) => {
  const [openDialogs, setOpenDialogs] = useState<Array<IDialog>>([]);

  const openDialog = useCallback((Dialog: DialogComponent) => {
    const newDialog = {
      Dialog,
      key: Date.now(),
      closeDialog: () => {
        setOpenDialogs((prevDialogs) => prevDialogs.filter((item) => item !== newDialog));
      },
    };

    setOpenDialogs([...openDialogs, newDialog]);
  }, [openDialogs, setOpenDialogs]);

  const value = useMemo(() => {
    return {
      openDialog,
      closeAll: () => {
        setOpenDialogs([]);
      },
    };
  }, [openDialog, setOpenDialogs]);

  return (
    <DialogContext.Provider value={value}>
      {openDialogs.map(({ Dialog, closeDialog, key }) => (
        <Dialog
          key={key}
          closeDialog={closeDialog}
        />
      ))}
      {children}
    </DialogContext.Provider>
  );
};
