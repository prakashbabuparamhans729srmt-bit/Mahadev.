'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { Loader2, User, Shield, Bell, CreditCard, Camera, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { SecuritySettings } from './security-settings';
import { BillingSettings } from './billing-settings';
import { NotificationSettings } from './notification-settings';

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || 'प्रकाश कुमार');
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotoURL(e.target?.result as string);
            toast({
              title: "प्रीव्यू अपडेट किया गया",
              description: "आपकी प्रोफ़ाइल फोटो का प्रीव्यू अपडेट हो गया है। सहेजने के लिए 'बदलाव सेव करें' पर क्लिक करें।",
            });
        };
        reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      // In a real app, you'd upload the photoURL to a storage service
      // and get a public URL before calling updateProfile.
      // For this demo, we'll use the potentially long data URI.
      await updateProfile(user, { 
          displayName: displayName,
          photoURL: photoURL 
        });
      
      toast({
          title: 'प्रोफ़ाइल अपडेट की गई!',
          description: 'आपकी जानकारी सफलतापूर्वक सहेज ली गई है।',
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
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild className="md:hidden">
            <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
            </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">सेटिंग्स</h1>
      </div>
      <Tabs defaultValue="profile" orientation="vertical" className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
        <TabsList className="flex-col h-auto justify-start items-stretch gap-2 bg-transparent p-0 border-none">
          <TabsTrigger value="profile" className="justify-start p-4 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">
            <User className="mr-3"/> प्रोफ़ाइल
          </TabsTrigger>
          <TabsTrigger value="security" className="justify-start p-4 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">
             <Shield className="mr-3"/> सुरक्षा
          </TabsTrigger>
           <TabsTrigger value="billing" className="justify-start p-4 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">
            <CreditCard className="mr-3"/> बिलिंग
          </TabsTrigger>
          <TabsTrigger value="notifications" className="justify-start p-4 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">
            <Bell className="mr-3"/> नोटिफिकेशन्स
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
            <div className="bg-card/50 rounded-2xl p-8">
                 <div className="flex flex-col items-center text-center">
                    <div className="relative group">
                        <Avatar className="h-24 w-24 mb-4 border-4 border-primary/50">
                            <AvatarImage src={photoURL ?? "https://picsum.photos/seed/1/200/200"} alt={displayName} />
                            <AvatarFallback>{displayName?.[0]}</AvatarFallback>
                        </Avatar>
                        <button onClick={handleAvatarClick} className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="text-white h-8 w-8" />
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    </div>
                    <h2 className="text-2xl font-bold font-headline">{displayName}</h2>
                    <p className="text-primary">प्रीमियम सदस्यता - राजेश इंडस्ट्रीज</p>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <Label htmlFor="displayName">पूरा नाम</Label>
                        <div className="relative">
                             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="आपका पूरा नाम"
                                className="pl-10 h-12 bg-background"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">ईमेल एड्रेस</Label>
                         <div className="relative">
                             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="email" value={user?.email || ''} disabled  className="pl-10 h-12 bg-background"/>
                        </div>
                    </div>
                </div>
                 <div className="mt-8 flex justify-end">
                    <Button onClick={handleProfileSave} disabled={isSaving} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        बदलाव सेव करें
                    </Button>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="security" className="mt-0">
            <SecuritySettings />
        </TabsContent>
        <TabsContent value="billing" className="mt-0">
            <BillingSettings />
        </TabsContent>
        <TabsContent value="notifications" className="mt-0">
            <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
