'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCookieConsent, type CookiePreferences } from '@/hooks/use-cookie-consent';
import {
  Cookie,
  TrendingUp,
  Sparkles,
  Megaphone,
  Check,
  X,
  ShieldCheck,
  Languages,
  Palette,
  Info,
  BarChart,
  Target,
  Share2,
  MapPin,
  Trash2,
  RotateCcw,
  Save,
  Settings,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CookieItem {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  locked: boolean;
  icon: React.ReactNode;
}

interface Category {
  id: keyof Omit<CookiePreferences, 'hasMadeChoice'>;
  title: string;
  icon: React.ReactNode;
  cookies: CookieItem[];
}

const initialCookieData: Category[] = [
  {
    id: 'necessary',
    title: 'आवश्यक कुकीज़ (अनिवार्य)',
    icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
    cookies: [
      { id: 'session_id', name: 'session_id', description: 'सत्र प्रबंधन और सुरक्षा', enabled: true, locked: true, icon: <Info size={16} /> },
      { id: 'csrf_token', name: 'csrf_token', description: 'सुरक्षा संरक्षण', enabled: true, locked: true, icon: <Info size={16} /> },
      { id: 'language_pref', name: 'language_pref', description: 'भाषा पसंद', enabled: true, locked: true, icon: <Languages size={16} /> },
      { id: 'cookie_consent', name: 'cookie_consent', description: 'आपकी कुकी पसंद', enabled: true, locked: true, icon: <Cookie size={16} /> },
    ],
  },
  {
    id: 'performance',
    title: 'प्रदर्शन कुकीज़',
    icon: <BarChart className="h-5 w-5 text-blue-500" />,
    cookies: [
      { id: 'analytics_track', name: 'analytics_track', description: 'पृष्ठ दृश्य और उपयोग ट्रैकिंग', enabled: false, locked: false, icon: <TrendingUp size={16} /> },
      { id: 'performance_log', name: 'performance_log', description: 'साइट गति और त्रुटि लॉगिंग', enabled: false, locked: false, icon: <BarChart size={16} /> },
    ],
  },
  {
    id: 'functional',
    title: 'कार्यात्मक कुकीज़',
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    cookies: [
      { id: 'chat_support', name: 'chat_support', description: 'लाइव चैट समर्थन', enabled: false, locked: false, icon: <Share2 size={16} /> },
      { id: 'location_pref', name: 'location_pref', description: 'स्थान-आधारित सेवाएं', enabled: false, locked: false, icon: <MapPin size={16} /> },
      { id: 'theme_preference', name: 'theme_preference', description: 'रंग थीम और डिस्प्ले सेटिंग्स', enabled: false, locked: false, icon: <Palette size={16} /> },
    ],
  },
  {
    id: 'advertising',
    title: 'विज्ञापन कुकीज़',
    icon: <Target className="h-5 w-5 text-orange-500" />,
    cookies: [
      { id: 'targeted_ads', name: 'targeted_ads', description: 'रुचि-आधारित विज्ञापन', enabled: false, locked: false, icon: <Target size={16} /> },
      { id: 'ad_performance', name: 'ad_performance', description: 'विज्ञापन प्रभावशीलता माप', enabled: false, locked: false, icon: <Megaphone size={16} /> },
    ],
  },
];


export function CookiePreferencesDialog({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const { preferences, setPreferences } = useCookieConsent();
  const [detailedPrefs, setDetailedPrefs] = useState(initialCookieData);
  const { toast } = useToast();

  useEffect(() => {
    setDetailedPrefs(prevData =>
      prevData.map(category => ({
        ...category,
        cookies: category.cookies.map(cookie => ({
          ...cookie,
          enabled: preferences[category.id] || cookie.locked,
        })),
      }))
    );
  }, [preferences, isOpen]);

  const handleToggle = (categoryId: keyof Omit<CookiePreferences, 'hasMadeChoice'>, cookieId: string, checked: boolean) => {
    setDetailedPrefs(prevData =>
      prevData.map(category =>
        category.id === categoryId
          ? {
              ...category,
              cookies: category.cookies.map(cookie =>
                cookie.id === cookieId ? { ...cookie, enabled: checked } : cookie
              ),
            }
          : category
      )
    );
  };
  
  const handleSave = () => {
    const newPreferences: Partial<CookiePreferences> = {};
    detailedPrefs.forEach(category => {
      if (category.id !== 'necessary') {
        newPreferences[category.id] = category.cookies.some(c => c.enabled);
      }
    });
    setPreferences({ ...preferences, ...newPreferences });
    toast({
      title: 'सहेजा गया',
      description: 'आपकी कुकी वरीयताएँ सहेज ली गई हैं।',
    });
    onOpenChange(false);
  }

  const handleAction = (message: string) => {
    toast({
      description: message,
    });
  }

  const handleReset = () => {
     setDetailedPrefs(initialCookieData.map(cat => ({
        ...cat,
        cookies: cat.cookies.map(c => ({...c, enabled: c.locked}))
     })));
     toast({
        title: "रीसेट",
        description: "सेटिंग्स डिफ़ॉल्ट पर रीसेट हो गई हैं। परिवर्तनों को लागू करने के लिए सहेजें।",
     })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-headline flex items-center gap-3">
            <Settings className="h-6 w-6 text-primary" />
            विस्तृत कुकी वरीयताएँ
          </DialogTitle>
          <DialogDescription>
            यहां आप नियंत्रित कर सकते हैं कि कौन सी कुकीज़ सक्षम हैं।
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="p-6 space-y-6">
            {detailedPrefs.map(category => (
              <div key={category.id} className="p-4 border rounded-xl bg-card">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                  {category.icon}
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.cookies.map(cookie => (
                    <div key={cookie.id} className="flex items-center justify-between p-3 rounded-md bg-secondary/40">
                      <div className="flex items-center gap-3">
                         {cookie.icon}
                        <div>
                           <p className="font-semibold text-sm">{cookie.name}</p>
                           <p className="text-xs text-muted-foreground">{cookie.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={cookie.enabled}
                        onCheckedChange={checked => handleToggle(category.id, cookie.id, checked)}
                        disabled={cookie.locked}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 bg-secondary/30 flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => handleAction('यह सुविधा जल्द ही आएगी।')}>
              <Trash2 className="mr-2 h-4 w-4" />
              सभी कुकीज़ साफ़ करें
            </Button>
            <Button variant="ghost" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              डिफ़ॉल्ट पर रीसेट
            </Button>
          </div>
          <div className="flex gap-2">
           <DialogClose asChild>
                <Button variant="outline">
                    रद्द करें
                </Button>
           </DialogClose>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            वरीयताएँ सहेजें
          </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
