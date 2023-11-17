import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { MainContext } from './mainContext';

export const MainProvider = ({ children }: { children: JSX.Element }) => {
  const HARDCODED_LANGUAGE = 'uk-UA';

  const [menuId, setMenuId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    setCategoryId('');
  }, [menuId]);

  const value = useMemo(() => {
    return {
      menuLanguage: HARDCODED_LANGUAGE,
      menuId,
      categoryId,
      setMenuId,
      setCategoryId,
    };
  }, [menuId, categoryId]);

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
