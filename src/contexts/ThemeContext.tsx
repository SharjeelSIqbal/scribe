import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import themes from '@src/libs/themes.json';

type Theme = (typeof themes)[number];
interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme';
const DATA_ATTR = 'data-theme';
const DEFAULT_THEME: Theme = 'light';

export function ThemeContextProvider({ children }: { children: ReactNode }): JSX.Element {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved ?? DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.setAttribute(DATA_ATTR, theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
