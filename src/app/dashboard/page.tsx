'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">ग्राहक डैशबोर्ड</CardTitle>
              <CardDescription>
                आपका स्वागत है, {user.email}!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                यह आपका व्यक्तिगत डैशबोर्ड है। यहां आप अपने प्रोजेक्ट्स, संदेशों और बहुत कुछ का प्रबंधन कर सकते हैं।
              </p>
              <Button onClick={handleLogout} variant="destructive" className="mt-6">
                लॉग आउट
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
