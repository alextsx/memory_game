import type { Metadata } from 'next';
import { ReduxProvider } from '@/hocs/ReduxProvider';

import '@/styles/globals.css';
import '@/styles/card.css';
import '@/styles/game-board.css';
import '@/styles/header.css';
import '@/styles/modal.css';

export const metadata: Metadata = {
  title: 'Memo mission',
  description: 'Game to test your memory'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex justify-center align-center">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
