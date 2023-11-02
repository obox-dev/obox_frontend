import { createContext } from 'react';
import { MainProviderInterface } from './types';

export const MainContext = createContext<MainProviderInterface>(
  {} as MainProviderInterface
);
