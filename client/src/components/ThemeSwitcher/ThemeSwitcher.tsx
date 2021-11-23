import React, { useContext, ChangeEvent, MouseEvent } from 'react';
import styles from './ThemeSwitcher.module.scss';
import { ThemeMode } from '@/theme';
import { Themes } from '@/enums';

export const ThemeSwitcher: React.FC = () => {
  const { theme, themeSwitch } = useContext(ThemeMode);
  const onSwitcherClick = (e: MouseEvent) => {
    e.preventDefault();
    themeSwitch && themeSwitch();
  };

  return (
    <button onClick={onSwitcherClick} className={styles.switch}>
      {theme === Themes.LIGHT
        ? <img src="https://i.ibb.co/7JfqXxB/sunny.png" alt="Light Mode" />
        : <img src="https://i.ibb.co/FxzBYR9/night.png" alt="Dark Mode" />}
    </button>
  );
};
