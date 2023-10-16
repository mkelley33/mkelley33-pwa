import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'mkelley33 PWA';
const APP_DEFAULT_TITLE = 'About';
const APP_TITLE_TEMPLATE = '%s - mkelley33';
const APP_DESCRIPTION =
  'The home, blog, and miscellaneous web development musings of @mkelley33';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  themeColor: '#f5f5f5',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: '/images/profile-pic.png',
    url: new URL(
      `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${process
        .env.VERCEL_URL!}`
    ),
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: '/images/profile-pic.webp',
    site: '@mkelley33',
    creator: '@mkelley33',
    creatorId: '@mkelley33',
  },
  icons: {
    shortcut: '/icons/favicon.ico',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="lg:max-w-5xl sm:max-w-sm mx-auto pt-[150px] md:pl-12 md:pr-12 sm:pl-4 sm:pr-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
