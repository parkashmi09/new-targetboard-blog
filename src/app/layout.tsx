import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PWAInstaller from "@/components/PWAInstaller";

export const metadata = {
  title: "Target Board - India's #1 Free Education Platform",
  description: "Access NCERT books, solutions, and exam updates for free. Your trusted companion for board exams and competitive entrance tests like JEE, NEET, CUET, and more.",
  keywords: "NCERT books, CBSE study materials, JEE preparation, NEET study material, CUET exam, free education, board exam preparation",
  authors: [{ name: "Target Board" }],
  creator: "Target Board",
  publisher: "Target Board",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://targetboard.com'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Target Board',
  },
  applicationName: 'Target Board',
  openGraph: {
    title: "Target Board - India's #1 Free Education Platform",
    description: "Access NCERT books, solutions, and exam updates for free. Your trusted companion for board exams and competitive entrance tests.",
    url: 'https://targetboard.com',
    siteName: 'Target Board',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Target Board - Free Education Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Target Board - India's #1 Free Education Platform",
    description: "Access NCERT books, solutions, and exam updates for free. Your trusted companion for board exams and competitive entrance tests.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#003400',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Target Board" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#003400" />
        <meta name="msapplication-TileColor" content="#003400" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-jakarta antialiased">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <PWAInstaller />
        </div>
      </body>
    </html>
  );
}
