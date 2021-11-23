import { createContext } from 'react';
import { Themes } from './enums/themes.enum';

interface ITheme {
  theme: string,
  themeSwitch?: () => void,
};

export const defaultContext = {
  theme: Themes.LIGHT,
};

export const ThemeMode = createContext<ITheme>(defaultContext);
