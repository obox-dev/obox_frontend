import { Switcher } from '@shared/components/atoms/Switcher';
import "./ThemeSwither.scss"
// import { useState } from 'react';

// enum ThemeOptions {
//   LIGHT = 'light',
//   DARK = 'dark',
// }

// const themeNames = {
//   [ThemeOptions.LIGHT]: 'light',
//   [ThemeOptions.DARK]: 'dark',
// };

// const defaulTheme = ThemeOptions.LIGHT;

export const ThemeSwitcher = () => {
//   const [currentTheme, setCurrentTheme] = useState(defaulTheme);
  const onThemeChange = (e: any) => {
      console.log(e)
    if (true) {
    }
  };
  return <Switcher isDisabled onChange={onThemeChange} name="theme" textForChecked='dark mode' textForUnchecked='light mode' />;
};
