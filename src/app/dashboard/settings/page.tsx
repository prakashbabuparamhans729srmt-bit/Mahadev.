
'use client';

import { useState, useEffect } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { Loader2, User, Palette, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const [displayName, setDisplayName] = useState('');
  const [theme, setTheme] = useState('light');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
    }
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, [user]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleProfileSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await updateProfile(user, { displayName });
      toast({
        title: 'प्रोफ़ाइल अपडेट की गई',
        description: 'आपका नाम सफलतापूर्वक सहेज लिया गया है।',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'त्रुटि',
        description: 'प्रोफ़ाइल को सहेजते समय एक त्रुटि हुई।',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-2xl font-bold font-headline">सेटिंग्स</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2" />
            प्रोफ़ाइल
          </CardTitle>
          <CardDescription>
            अपनी व्यक्तिगत जानकारी को प्रबंधित करें।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">नाम</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="आपका पूरा नाम"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">ईमेल</Label>
            <Input id="email" value={user?.email || ''} disabled />
          </div>
          <Button onClick={handleProfileSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            बदलाव सहेजें
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2" />
            दिखावट
          </CardTitle>
          <CardDescription>
            ऐप की दिखावट को अपनी पसंद के अनुसार बदलें।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={handleThemeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">लाइट मोड</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">डार्क मोड</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2" />
            सुरक्षा
          </CardTitle>
          <CardDescription>
            अपना पासवर्ड बदलें और खाता सुरक्षा प्रबंधित करें।
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button variant="outline">पासवर्ड बदलें</Button>
            <Button variant="destructive">
                <LogOut className="mr-2 h-4 w-4"/>
                सभी डिवाइस से लॉग आउट करें
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
