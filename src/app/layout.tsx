import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Button } from '@/components/ui/button';
import { HelpCircle, LifeBuoy } from 'lucide-react';
import Link from 'next/link';

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
    <html lang="hi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <Button asChild className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-2xl" size="icon">
          <Link href="/contact">
            <HelpCircle className="h-9 w-9" />
            <span className="sr-only">Help Assistant</span>
          </Link>
        </Button>
      </body>
    </html>
  );
}
