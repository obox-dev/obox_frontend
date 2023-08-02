import { useContext } from 'react';
import { DialogContext } from './DialogContext';

export const useDialog = () => useContext(DialogContext);
