'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useUser, useAuth } from '@/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691L12.125 19.45c1.643-4.113 5.518-7.012 9.875-7.012c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657c-1.889 1.412-4.246 2.26-6.752 2.26c-4.444 0-8.3-2.921-9.849-7.012l-5.833 4.762C9.656 40.663 16.318 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.035 12.035 0 0 1-4.223 5.337l5.657 5.657C41.345 35.137 44 29.873 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
      </svg>
    )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.5 2.3.94 2.87.72c.09-.56.34-.94.62-1.15c-2.22-.25-4.55-1.11-4.55-4.92c0-.94.4-1.86.94-2.52c-.1-.25-.42-1.2.09-2.48c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.51 1.28.19 2.23.09 2.48c.54.66.94 1.58.94 2.52c0 3.83-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path></svg>
    )
}

const StepperItem = ({ number, title, active }: { number: number, title: string, active: boolean }) => (
    <div className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${active ? 'bg-white text-black' : 'bg-white/10'}`}>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${active ? 'bg-black text-white' : 'bg-white/20'}`}>
            {number}
        </div>
        <span className="font-semibold">{title}</span>
    </div>
)

export default function SignupPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);


  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
        setError("पासवर्ड कम से कम 8 अक्षर का होना चाहिए।");
        return;
    }
    setIsPending(true);
    setError(null);

    if (!auth) {
      setError('प्रमाणीकरण सेवा उपलब्ध नहीं है।');
      setIsPending(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`.trim(),
      });
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

  const handleSocialLogin = async (providerName: string) => {
    if (!auth) {
      setError('प्रमाणीकरण सेवा उपलब्ध नहीं है।');
      return;
    }

    let provider;
    if (providerName === 'Google') {
      provider = new GoogleAuthProvider();
    } else if (providerName === 'GitHub') {
      provider = new GithubAuthProvider();
    } else {
      return;
    }

    setIsPending(true);
    try {
      await signInWithPopup(auth, provider);
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error("Social login error:", error);
      let message = 'सोशल साइन-अप विफल।';
      if (error.code === 'auth/popup-blocked') {
        message = 'पॉप-अप ब्लॉक कर दिया गया था। कृपया इस साइट के लिए पॉप-अप की अनुमति दें।';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        message = 'इस ईमेल से पहले से ही एक खाता मौजूद है, लेकिन एक अलग प्रदाता के साथ।';
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
     <div className="min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col items-center justify-center bg-black p-12 text-white text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-700 to-black opacity-60"></div>
            <div className="relative z-10 max-w-sm mx-auto">
                <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
                    <Icons.logo className="h-10 w-10 text-white" />
                    <span className="text-3xl font-bold font-headline">Hajaro Grahako</span>
                </Link>
                <h1 className="text-4xl font-bold font-headline mb-4">Get Started with Us</h1>
                <p className="text-white/80 mb-12">
                  Complete these easy steps to register your account.
                </p>
                <div className="space-y-4 text-left">
                    <StepperItem number={1} title="Sign up your account" active={true} />
                    <StepperItem number={2} title="Set up your workspace" active={false} />
                    <StepperItem number={3} title="Set up your profile" active={false} />
                </div>
            </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
             <div className="text-center mb-8 lg:hidden">
              <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
                  <Icons.logo className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold font-headline">Hajaro Grahako</span>
              </Link>
            </div>
            <h2 className="text-3xl font-bold font-headline text-center">एक खाता बनाएं</h2>
            <p className="text-muted-foreground text-center mt-2 mb-8">शुरू करने के लिए नीचे अपना विवरण दर्ज करें</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('Google')}><GoogleIcon className="mr-2 h-5 w-5"/> Google</Button>
                <Button variant="outline" className="w-full" onClick={() => handleSocialLogin('GitHub')}><GithubIcon className="mr-2 h-5 w-5"/> GitHub</Button>
            </div>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-muted-foreground/20"></div>
                <span className="mx-4 text-xs text-muted-foreground">या</span>
                <div className="flex-grow border-t border-muted-foreground/20"></div>
            </div>

            <form onSubmit={handleSignup} className="grid gap-4">
               <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">पहला नाम</Label>
                        <Input id="first-name" placeholder="उदा. राहुल" required onChange={(e) => setFirstName(e.target.value)} value={firstName} className="bg-secondary/50 border-border" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">अंतिम नाम</Label>
                        <Input id="last-name" placeholder="उदा. कुमार" required onChange={(e) => setLastName(e.target.value)} value={lastName} className="bg-secondary/50 border-border" />
                    </div>
                </div>

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
                  className="bg-secondary/50 border-border"
                />
              </div>

               <div className="grid gap-2">
                <Label htmlFor="phone">फ़ोन नंबर (वैकल्पिक)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91-XXXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-secondary/50 border-border"
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
                  className="bg-secondary/50 border-border"
                />
                <p className="text-xs text-muted-foreground">कम से कम 8 अक्षर का होना चाहिए।</p>
              </div>
             {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <Button className="w-full mt-4" type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              खाता बनाएं
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            पहले से ही एक खाता है?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              लॉग इन करें
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
