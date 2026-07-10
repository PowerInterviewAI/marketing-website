import { useEffect, useState } from 'react';

import type { Theme } from '@/types';

/**
 * Custom hook for managing theme
 */
export const useTheme = () => {
  // Defaults to 'dark' to match the anti-FOUC inline script in the root
  // layout, which already sets the correct class before hydration; the
  // effect below just syncs this hook's state to what's in localStorage
  // (can't read localStorage during render - no window on the server).
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
