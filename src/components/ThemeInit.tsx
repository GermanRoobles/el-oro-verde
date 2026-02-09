'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeInit() {
  const setTheme = useThemeStore((s) => s.setTheme);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const unsub = useThemeStore.persist.onFinishHydration(() => {
      setTheme(useThemeStore.getState().theme);
    });
    setTheme(theme);
    return unsub;
  }, []);
  return null;
}
