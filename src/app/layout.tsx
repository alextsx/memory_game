import type { Metadata } from 'next';
import { AlertProvider } from '@/hocs/AlertProvider';
import { ReduxProvider } from '@/hocs/ReduxProvider';

import '@/styles/globals.css';
import '@/styles/card.css';
import '@/styles/game-board.css';
import '@/styles/header.css';
import '@/styles/modal.css';
import '@/styles/alert.css';

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
        <ReduxProvider>
          <div id="modal-root" />
          <div id="alert-box-root" />
          <AlertProvider>{children}</AlertProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
