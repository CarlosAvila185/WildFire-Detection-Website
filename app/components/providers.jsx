'use client';

import { ThemeProvider } from 'next-themes';

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      enableColorScheme={false}  // ← disable color-scheme style injection
    >
      {children}
    </ThemeProvider>
  );
}
