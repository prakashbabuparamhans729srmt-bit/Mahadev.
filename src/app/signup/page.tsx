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
import { Loader2 } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useUser, useAuth } from '@/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';


export default function SignupPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);


  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    if (!auth) {
      setError('प्रमाणीकरण सेवा उपलब्ध नहीं है।');
      setIsPending(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      toast({
        title: 'वेरिफिकेशन ईमेल भेजा गया',
        description: 'कृपया अपना इनबॉक्स जांचें और अपना खाता वेरिफ़ाई करें।',
      });
      router.push('/login');
    } catch (error: any) {
      let message = 'साइनअप विफल। कृपया पुनः प्रयास करें।';
      if (error.code === 'auth/email-already-in-use') {
        message = 'यह ईमेल पहले से ही उपयोग में है।';
      }
      setError(message);
    } finally {
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
          <CardTitle className="text-2xl font-headline">एक खाता बनाएं</CardTitle>
          <CardDescription>
            शुरू करने के लिए नीचे अपना विवरण दर्ज करें
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ईमेल</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">पासवर्ड</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
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
              खाता बनाएं
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            पहले से ही एक खाता है?{' '}
            <Link href="/login" className="underline">
              लॉग इन करें
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
