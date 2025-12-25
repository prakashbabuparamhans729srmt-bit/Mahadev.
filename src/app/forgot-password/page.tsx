
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, type FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Loader2, Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaAnswer('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const expectedAnswer = captchaNum1 + captchaNum2;
    if (parseInt(captchaAnswer, 10) !== expectedAnswer) {
      setError('कैप्चा का उत्तर गलत है। कृपया पुनः प्रयास करें।');
      generateCaptcha();
      return;
    }
    
    setIsPending(true);

    if (!auth) {
      setError('प्रमाणीकरण सेवा उपलब्ध नहीं है।');
      setIsPending(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setIsEmailSent(true);
    } catch (error: any) {
      let message = 'पासवर्ड रीसेट करने में विफल। कृपया पुनः प्रयास करें।';
      if (error.code === 'auth/user-not-found') {
        message = 'इस ईमेल से कोई उपयोगकर्ता नहीं मिला।';
      }
      setError(message);
    } finally {
        setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
       <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
                <Icons.logo className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline">Hajaro Grahako</span>
            </Link>
        </div>
        
        {isEmailSent ? (
             <div className="text-center bg-card p-8 rounded-2xl shadow-lg">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold font-headline">ईमेल भेजा गया!</h2>
                <p className="text-muted-foreground mt-2 mb-6">
                    हमने आपके पासवर्ड को रीसेट करने के लिए एक लिंक <strong>{email}</strong> पर भेज दिया है। कृपया अपना इनबॉक्स जांचें।
                </p>
                <Button onClick={() => router.push('/login')} className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    लॉगिन पर वापस जाएं
                </Button>
            </div>
        ) : (
            <>
                <h2 className="text-3xl font-bold font-headline text-center">पासवर्ड रीसेट करें</h2>
                <p className="text-muted-foreground text-center mt-2 mb-8">
                    अपना ईमेल दर्ज करें और हम आपको अपना पासवर्ड रीसेट करने के लिए एक लिंक भेजेंगे।
                </p>

                <form onSubmit={handleResetPassword} className="grid gap-4">
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
                      className="bg-secondary/50 border-border h-11"
                      />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="captcha">सुरक्षा प्रश्न</Label>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg p-2 bg-secondary/50 rounded-md">
                        {captchaNum1} + {captchaNum2} = ?
                      </span>
                      <Input
                        id="captcha"
                        type="number"
                        placeholder="उत्तर"
                        required
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        className="bg-secondary/50 border-border h-11"
                      />
                       <Button type="button" variant="ghost" size="icon" onClick={generateCaptcha}>
                          <RefreshCw className="h-4 w-4"/>
                       </Button>
                    </div>
                  </div>

                  {error && (
                      <p className="text-sm font-medium text-destructive">{error}</p>
                  )}
                  <Button className="w-full mt-4 h-12 text-base" type="submit" disabled={isPending}>
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      रीसेट लिंक भेजें
                  </Button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        <ArrowLeft className="inline-block mr-1 h-4 w-4" />
                        लॉगिन पर वापस जाएं
                    </Link>
                </div>
            </>
        )}
      </div>
    </div>
  );
}
