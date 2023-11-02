import { useContext } from 'react';
import { MainContext } from './mainContext';

export const useMainProvider = () => useContext(MainContext);
