import type { ReactNode } from 'react';
import './globals.css';

export const runtime = 'nodejs';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
