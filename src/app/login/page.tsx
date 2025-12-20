'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';
import { Icons } from '@/components/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    if (!auth) {
      setError('प्रमाणीकरण सेवा उपलब्ध नहीं है।');
      setIsPending(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      let message = 'लॉगिन विफल। कृपया पुनः प्रयास करें।';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = 'अमान्य ईमेल या पासवर्ड।';
      }
      setError(message);
      setIsPending(false);
    }
  };


  if (isUserLoading || user) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm w-full shadow-2xl">
        <CardHeader className="text-center">
            <div className="mb-4 inline-block">
                <Icons.logo className="h-10 w-10 text-primary mx-auto" />
            </div>
          <CardTitle className="text-2xl font-headline">ग्राहक पोर्टल लॉगिन</CardTitle>
          <CardDescription>
            जारी रखने के लिए अपना ईमेल दर्ज करें
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ईमेल</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">पासवर्ड</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                name="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              लॉग इन करें
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            खाता नहीं है?{' '}
            <Link href="/signup" className="underline">
              साइन अप करें
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
