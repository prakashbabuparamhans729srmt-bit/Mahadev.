'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent, type CookiePreferences } from '@/hooks/use-cookie-consent';
import { Cookie, Check, X, Settings, TrendingUp, Sparkles, Megaphone, ShieldCheck, Save, RotateCcw, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';

const consentCategories: {
  id: keyof Omit<CookiePreferences, 'hasMadeChoice' | 'necessary'>;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'performance',
    title: 'प्रदर्शन कुकीज़',
    description: 'हमें साइट उपयोग का विश्लेषण करके अनुभव को बेहतर बनाने में मदद करती हैं।',
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 'functional',
    title: 'कार्यात्मक कुकीज़',
    description: 'आपकी पसंदों (जैसे थीम) को याद रखती हैं और अतिरिक्त सुविधाएँ प्रदान करती हैं।',
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
  },
  {
    id: 'advertising',
    title: 'विज्ञापन कुकीज़',
    description: 'आपको आपकी रुचि के अनुसार व्यक्तिगत विज्ञापन दिखाने में मदद करती हैं।',
    icon: <Megaphone className="h-5 w-5 text-orange-500" />,
  },
];

export function CookieConsent() {
  const { preferences, hasMadeChoice, setPreferences } = useCookieConsent();
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [currentPrefs, setCurrentPrefs] = useState<CookiePreferences>(preferences);
  const { toast } = useToast();

  useEffect(() => {
    if (!hasMadeChoice) {
      setIsOpen(true);
    }
  }, [hasMadeChoice]);

  useEffect(() => {
    setCurrentPrefs(preferences);
  }, [preferences]);

  const handleToggle = (category: keyof Omit<CookiePreferences, 'hasMadeChoice'>, checked: boolean) => {
    setCurrentPrefs((prev) => ({ ...prev, [category]: checked }));
  };

  const handleSaveSelection = () => {
    setPreferences({ ...currentPrefs, hasMadeChoice: true });
    toast({
      title: 'सहेजा गया',
      description: 'आपकी कुकी वरीयताएँ सहेज ली गई हैं।',
    });
    setIsOpen(false);
    setIsCustomizing(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      hasMadeChoice: true,
      necessary: true,
      performance: true,
      functional: true,
      advertising: true,
    };
    setPreferences(allAccepted);
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      hasMadeChoice: true,
      necessary: true,
      performance: false,
      functional: false,
      advertising: false,
    };
    setPreferences(onlyNecessary);
    setIsOpen(false);
  };
  
  const handleResetToDefault = () => {
    const defaults = {
        ...preferences, // keep hasMadeChoice and necessary
        performance: false,
        functional: false,
        advertising: false,
    }
    setCurrentPrefs(defaults);
    toast({ description: "सेटिंग्स डिफ़ॉल्ट पर रीसेट हो गई हैं। सहेजने के लिए क्लिक करें।" });
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xl p-0">
        <DialogHeader className="p-6 pb-4 border-b">
           <DialogTitle className="text-2xl font-headline flex items-center gap-3">
              {isCustomizing ? <Settings className="h-6 w-6 text-primary" /> : <Cookie className="h-6 w-6 text-primary" />}
              {isCustomizing ? 'विस्तृत कुकी वरीयताएँ' : 'हम आपकी गोपनीयता का सम्मान करते हैं'}
            </DialogTitle>
            <DialogDescription>
              {isCustomizing 
                ? 'यहां आप नियंत्रित कर सकते हैं कि कौन सी कुकीज़ सक्षम हैं।'
                : 'सर्वोत्तम अनुभव प्रदान करने के लिए, हम कुकीज़ और समान तकनीकों का उपयोग करते हैं।'
              }
            </DialogDescription>
        </DialogHeader>
        
        {!isCustomizing ? (
          <>
            <div className="p-6">
              <Button onClick={handleAcceptAll} className="w-full mb-2">
                <Check className="mr-2 h-4 w-4" />
                सभी स्वीकार करें
              </Button>
              <Button variant="outline" onClick={handleRejectAll} className="w-full">
                <X className="mr-2 h-4 w-4" />
                केवल आवश्यक
              </Button>
            </div>
            <DialogFooter className="p-4 bg-secondary/30">
              <Button variant="link" onClick={() => setIsCustomizing(true)} className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                वरीयताएँ अनुकूलित करें
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <ScrollArea className="max-h-[50vh]">
              <div className="p-6 space-y-6">
                 <div className="p-4 border rounded-xl bg-card">
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      आवश्यक कुकीज़ (हमेशा चालू)
                    </h3>
                    <p className="text-sm text-muted-foreground">साइट कार्यक्षमता और सुरक्षा के लिए आवश्यक। इन्हें बंद नहीं किया जा सकता।</p>
                </div>
                {consentCategories.map((category) => (
                   <div key={category.id} className="p-4 border rounded-xl bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                              {category.icon}
                              {category.title}
                            </h3>
                             <Switch
                                checked={currentPrefs[category.id]}
                                onCheckedChange={(checked) => handleToggle(category.id, checked)}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground pr-12">{category.description}</p>
                    </div>
                ))}
              </div>
            </ScrollArea>
             <DialogFooter className="p-4 bg-secondary/30 flex-wrap gap-2 justify-between">
                <Button variant="ghost" onClick={handleResetToDefault}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    डिफ़ॉल्ट
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => setIsCustomizing(false)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> वापस
                  </Button>
                  <Button onClick={handleSaveSelection}>
                    <Save className="mr-2 h-4 w-4" />
                    मेरी पसंद सहेजें
                  </Button>
                </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
