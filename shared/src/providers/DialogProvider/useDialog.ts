import { useContext } from 'react';
import { DialogContext } from './dialogContext';

export const useDialog = () => useContext(DialogContext);
