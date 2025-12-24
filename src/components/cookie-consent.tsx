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
import { Cookie, Check, X, Settings, TrendingUp, Sparkles as Brush, Megaphone } from 'lucide-react';
import { CookiePreferencesDialog } from './cookie-preferences-dialog';

const consentCategories: {
  id: keyof Omit<CookiePreferences, 'hasMadeChoice'>;
  title: string;
  description: string;
  icon: React.ReactNode;
  readonly?: boolean;
}[] = [
  {
    id: 'necessary',
    title: 'आवश्यक कुकीज़',
    description: 'साइट कार्यक्षमता और सुरक्षा के लिए आवश्यक। इन्हें बंद नहीं किया जा सकता।',
    icon: <Cookie className="h-5 w-5 text-primary" />,
    readonly: true,
  },
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
    icon: <Brush className="h-5 w-5 text-purple-500" />,
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
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [currentPrefs, setCurrentPrefs] = useState<CookiePreferences>(preferences);

  useEffect(() => {
    // Only show the dialog if the user hasn't made a choice yet.
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
    setIsOpen(false);
    setIsPreferencesOpen(false);
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


  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl font-headline flex items-center gap-2">
              <Cookie className="h-6 w-6 text-primary" />
              हम आपकी गोपनीयता का सम्मान करते हैं
            </DialogTitle>
            <DialogDescription>
              सर्वोत्तम अनुभव प्रदान करने के लिए, हम कुकीज़ और समान तकनीकों का उपयोग करते हैं। आप नीचे अपनी पसंद को अनुकूलित कर सकते हैं।
            </DialogDescription>
          </DialogHeader>
          
          <div className="px-6 pb-6">
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
            <Button variant="link" onClick={() => setIsPreferencesOpen(true)} className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              वरीयताएँ अनुकूलित करें
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CookiePreferencesDialog
        isOpen={isPreferencesOpen}
        onOpenChange={setIsPreferencesOpen}
      />
    </>
  );
}
