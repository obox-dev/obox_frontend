import {
  createContext,
} from 'react';

import { DialogProviderInterface } from './types';

export const DialogContext = createContext<DialogProviderInterface>(
  {} as DialogProviderInterface,
);
