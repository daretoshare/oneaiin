import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';
import Search from './components/Search';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';

export const metadata: Metadata = {
  title: 'one.ai.in — Enterprise AI. Understood.',
  description:
    'A knowledge platform for AI governance, model risk management, and responsible AI adoption across BFSI and Healthcare.',
  keywords: [
    'AI governance',
    'model risk management',
    'SR 11-7',
    'enterprise AI',
    'responsible AI',
    'GenAI governance',
  ],
  authors: [{ name: 'Dipanjan Deb' }, { name: 'Jayashree Mishra Deb' }],
  openGraph: {
    title: 'one.ai.in — Enterprise AI. Understood.',
    description:
      'AI governance, model risk management, and responsible AI adoption — from practitioners who built it at scale.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://one.ai.in',
    siteName: 'one.ai.in',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <Navigation />
          <Search />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
