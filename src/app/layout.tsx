import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { HelpAssistant } from '@/components/help-assistant';
import { CookieConsent } from '@/components/cookie-consent';
import { Playfair_Display, PT_Sans } from 'next/font/google';

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
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
          <Toaster />
          <HelpAssistant />
          <CookieConsent />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
