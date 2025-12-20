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
import { useFormState, useFormStatus } from 'react-dom';
import { handleLogin } from './actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';
import { Icons } from '@/components/icons';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      लॉग इन करें
    </Button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [state, formAction] = useFormState(handleLogin, { message: '', success: false });

  useEffect(() => {
    if (state.success) {
      router.push('/dashboard');
    }
  }, [state.success, router]);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

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
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ईमेल</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">पासवर्ड</Label>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            {state.message && (
              <p className="text-sm font-medium text-destructive">{state.message}</p>
            )}
            <SubmitButton />
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
