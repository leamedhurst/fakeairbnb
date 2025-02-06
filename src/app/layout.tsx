// src/app/layout.tsx
import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Messaging App',
  description: 'A demo messaging app built with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
