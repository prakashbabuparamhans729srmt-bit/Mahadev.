'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldCheck } from 'lucide-react';

const ADMIN_EMAIL = 'divyahanssuperpower@gmail.com';

export default function AdminAuthPage() {
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsVerifying(true);

    if (!auth || !auth.currentUser) {
      setError("आप लॉग इन नहीं हैं। कृपया पहले लॉग इन करें।");
      setIsVerifying(false);
      return;
    }

    if (auth.currentUser.email !== ADMIN_EMAIL) {
        setError("यह खाता एक एडमिन खाता नहीं है।");
        setIsVerifying(false);
        return;
    }

    try {
      const credential = EmailAuthProvider.credential(ADMIN_EMAIL, password);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Set a flag in session storage to indicate successful re-authentication
      sessionStorage.setItem('isAdminReauthenticated', 'true');
      
      toast({
        title: 'सत्यापन सफल!',
        description: 'आपको एडमिन पैनल पर रीडायरेक्ट किया जा रहा है...',
      });
      router.replace('/dashboard/user-management'); // Use replace to prevent going back to auth page

    } catch (err: any) {
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            setError('गलत पासवर्ड। कृपया पुनः प्रयास करें।');
        } else {
            setError('एक अप्रत्याशित त्रुटि हुई। कृपया बाद में प्रयास करें।');
            console.error(err);
        }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline flex items-center justify-center gap-2">
            <ShieldCheck className="text-primary h-7 w-7" />
            मास्टर एडमिन पैनल - सत्यापन
          </CardTitle>
          <CardDescription>
            जारी रखने के लिए कृपया अपने एडमिन खाते का पासवर्ड दोबारा दर्ज करें।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">एडमिन ईमेल</Label>
              <Input id="email" type="email" value={ADMIN_EMAIL} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">पासवर्ड</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="पासवर्ड"
              />
            </div>
            {error && (
                <p className="text-sm font-medium text-destructive text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isVerifying}>
              {isVerifying ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isVerifying ? 'सत्यापित हो रहा है...' : 'सत्यापित करें और प्रवेश करें'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
