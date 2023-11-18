import { useState, useMemo } from 'react';
import { MainContext } from './mainContext';

export const MainProvider = ({ children }: { children: JSX.Element }) => {
  const HARDCODED_LANGUAGE = 'uk-UA';

  const [menuId, setMenuId] = useState('');

  const value = useMemo(() => {
    return {
      menuLanguage: HARDCODED_LANGUAGE,
      menuId,
      setMenuId,
    };
  }, [menuId]);

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
