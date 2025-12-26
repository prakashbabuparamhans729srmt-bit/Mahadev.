import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { HelpAssistant } from '@/components/help-assistant';
import { CookieConsent } from '@/components/cookie-consent';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import Script from 'next/script';


const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-pt-sans',
});


export const metadata: Metadata = {
  title: 'HG Hub - Hajaro Grahako',
  description: 'पूर्ण विकास समाधान - वेबसाइट, मोबाइल ऐप और कस्टम सॉफ्टवेयर।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="hi" className={`dark ${playfair.variable} ${ptSans.variable}`}>
      <head>
      </head>
      <body>
        <FirebaseClientProvider>{children}</FirebaseClientProvider>
        <Toaster />
        <HelpAssistant />
        <CookieConsent />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
