import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';
import Search from './components/Search';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import { ThemeProvider } from './components/ThemeProvider';
import { SITE_URL, SITE_NAME } from './lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'one.ai.in — Enterprise AI. Understood.',
    description:
      'AI governance, model risk management, and responsible AI adoption — from practitioners who built it at scale.',
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'one.ai.in',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'one.ai.in — Enterprise AI. Understood.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'one.ai.in — Enterprise AI. Understood.',
    description:
      'AI governance, model risk management, and responsible AI adoption — from practitioners who built it at scale.',
    images: ['/og-default.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            description:
              'A knowledge platform for enterprise AI governance, model risk management, and responsible AI adoption.',
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
          }}
        />
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
