'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Smartphone, LogOut, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '@/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useState } from 'react';

export function SecuritySettings() {
  const { toast } = useToast();
  const auth = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handlePasswordSave = async () => {
    if (!auth || !auth.currentUser) {
      toast({ variant: 'destructive', title: 'त्रुटि', description: 'उपयोगकर्ता लॉग इन नहीं है।' });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ variant: 'destructive', title: 'त्रुटि', description: 'नए पासवर्ड मेल नहीं खाते।' });
      return;
    }
    if (newPassword.length < 6) {
      toast({ variant: 'destructive', title: 'त्रुटि', description: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए।' });
      return;
    }

    setIsSavingPassword(true);
    try {
      const user = auth.currentUser;
      if (user.email) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        toast({
          title: 'सफलता',
          description: 'आपका पासवर्ड सफलतापूर्वक बदल दिया गया है।',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
         toast({ variant: 'destructive', title: 'त्रुटि', description: 'पासवर्ड बदलने के लिए कोई ईमेल संबद्ध नहीं है।' });
      }
    } catch (error: any) {
      let message = 'पासवर्ड बदलने में विफल।';
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = 'वर्तमान पासवर्ड गलत है।';
      }
       else if (error.code === 'auth/too-many-requests') {
        message = 'बहुत सारे प्रयास। कृपया बाद में पुनः प्रयास करें।';
      }
      toast({
        variant: 'destructive',
        title: 'त्रुटि',
        description: message,
      });
    } finally {
      setIsSavingPassword(false);
    }
  };


  const handleAction = (message: string) => {
    toast({
      title: "सुविधा उपलब्ध नहीं है",
      description: message,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>पासवर्ड बदलें</CardTitle>
          <CardDescription>
            एक मजबूत पासवर्ड का उपयोग करने की सलाह दी जाती है जिसे आप कहीं और उपयोग नहीं कर रहे हैं।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">वर्तमान पासवर्ड</Label>
            <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">नया पासवर्ड</Label>
            <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">पासवर्ड की पुष्टि करें</Label>
            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handlePasswordSave} disabled={isSavingPassword}>
            {isSavingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            पासवर्ड सहेजें
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>टू-फैक्टर ऑथेंटिकेशन (2FA)</CardTitle>
          <CardDescription>
            अपने खाते में सुरक्षा की एक अतिरिक्त परत जोड़ें।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
            <Smartphone className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">प्रमाणीकरण ऐप</h3>
              <p className="text-sm text-muted-foreground">Google Authenticator या Authy जैसे ऐप का उपयोग करें।</p>
            </div>
            <Switch onCheckedChange={() => handleAction('2FA सेटअप को सर्वर-साइड समर्थन की आवश्यकता है और यह अभी लागू नहीं किया गया है।')} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>सक्रिय सत्र</CardTitle>
          <CardDescription>ये वे डिवाइस हैं जो वर्तमान में आपके खाते में लॉग इन हैं।</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Chrome on Windows</p>
              <p className="text-sm text-muted-foreground">वर्तमान सत्र</p>
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary">सक्रिय</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Safari on iPhone 15</p>
              <p className="text-sm text-muted-foreground">गुरुग्राम, भारत</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleAction('यह एक व्यवस्थापक-स्तरीय कार्य है और वर्तमान में क्लाइंट-साइड से उपलब्ध नहीं है।')}>
              <LogOut className="mr-2 h-4 w-4" />
              लॉग आउट
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => handleAction('सभी अन्य सत्रों से लॉग आउट करना एक व्यवस्थापक-स्तरीय कार्य है।')}>
            अन्य सभी सत्रों से लॉग आउट करें
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
            <CardTitle className="text-destructive">खाता हटाएं</CardTitle>
            <CardDescription>
                एक बार जब आप अपना खाता हटा देते हैं, तो इसे वापस नहीं लाया जा सकता। कृपया निश्चित रहें।
            </CardDescription>
        </CardHeader>
        <CardFooter className="border-t border-destructive/20 px-6 py-4">
          <Button variant="destructive" onClick={() => handleAction('खाता हटाने की सुविधा जल्द ही लागू की जाएगी। कृपया समर्थन से संपर्क करें।')}>
            <Trash2 className="mr-2 h-4 w-4" />
            मैं अपना खाता हटाना चाहता हूँ
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
