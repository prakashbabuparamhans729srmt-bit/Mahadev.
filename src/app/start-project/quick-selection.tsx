
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const roles = [
  'छोटा व्यवसाय', 'स्टार्टअप', 'फ्रीलांसर', 'कलाकार', 'शिक्षक', 'डॉक्टर', 'रेस्तरां मालिक', 'सलाहकार'
];

const goals = [
  'उत्पाद बेचने के लिए', 'सेवाएं प्रदान करने के लिए', 'ऑनलाइन पहचान बनाने के लिए', 'ग्राहकों को आकर्षित करने के लिए', 'सामग्री साझा करने के लिए', 'समुदाय बनाने के लिए', 'बुकिंग प्राप्त करने के लिए', 'दान एकत्र करने के लिए'
];

// Simple recommendation logic
const recommendations: { [key: string]: { [key: string]: string } } = {
  'छोटा व्यवसाय': { 'उत्पाद बेचने के लिए': 'ई-कॉमर्स', 'सेवाएं प्रदान करने के लिए': 'कॉर्पोरेट' },
  'स्टार्टअप': { 'उत्पाद बेचने के लिए': 'SaaS', 'ऑनलाइन पहचान बनाने के लिए': 'कॉर्पोरेट' },
  'फ्रीलांसर': { 'सेवाएं प्रदान करने के लिए': 'ब्लॉग', 'ग्राहकों को आकर्षित करने के लिए': 'फोटोग्राफी' },
  'कलाकार': { 'ऑनलाइन पहचान बनाने के लिए': 'फोटोग्राफी', 'सामग्री साझा करने के लिए': 'ब्लॉग' },
  'शिक्षक': { 'ऑनलाइन पहचान बनाने के लिए': 'शैक्षिक', 'सामग्री साझा करने के लिए': 'ब्लॉग' },
  'डॉक्टर': { 'सेवाएं प्रदान करने के लिए': 'स्वास्थ्य', 'बुकिंग प्राप्त करने के लिए': 'स्वास्थ्य' },
  'रेस्तरां मालिक': { 'उत्पाद बेचने के लिए': 'रेस्तरां', 'बुकिंग प्राप्त करने के लिए': 'रेस्तरां' },
  'सलाहकार': { 'सेवाएं प्रदान करने के लिए': 'कॉर्पोरेट', 'ऑनलाइन पहचान बनाने के लिए': 'ब्लॉग' },
};

export function QuickSelection() {
  const [role, setRole] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const { toast } = useToast();
  const router = useRouter();

  const recommendation = useMemo(() => {
    if (!role || !goal) return null;
    const recommendedType = recommendations[role]?.[goal] || 'कॉर्पोरेट + ब्लॉग';
    const budget = '₹35,000 - ₹1,50,000';
    const timeline = '3-6 सप्ताह';
    return { type: recommendedType, budget, timeline };
  }, [role, goal]);

  const handleSelect = () => {
     if (recommendation) {
        toast({
            title: "विकल्प चुना गया!",
            description: `${recommendation.type} को आपके प्रोजेक्ट के लिए चुना गया है। अगले चरण पर जाया जा रहा है।`,
        });
        // In a real app, you might navigate to a more specific page
        router.push('/contact');
     }
  };

  const handleAnotherSuggestion = () => {
    // This is a mock function. In a real app, you might have more complex logic.
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomGoal = goals[Math.floor(Math.random() * goals.length)];
    setRole(randomRole);
    setGoal(randomGoal);
    toast({
        description: "एक और सुझाव दिखाया जा रहा है...",
    });
  }

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            त्वरित चयन - आपके व्यवसाय के आधार पर
        </CardTitle>
        <CardDescription>
            बस दो आसान सवालों के जवाब दें और हम आपके लिए सही वेबसाइट प्रकार की सिफारिश करेंगे।
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
                <label className="font-medium">👤 मैं हूँ:</label>
                 <Select onValueChange={setRole} value={role}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="एक भूमिका चुनें..." />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <label className="font-medium">🎯 मेरा उद्देश्य:</label>
                 <Select onValueChange={setGoal} value={goal}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="एक लक्ष्य चुनें..." />
                    </SelectTrigger>
                    <SelectContent>
                        {goals.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
        </div>
        
        {recommendation && (
            <div className="pt-4 animate-in fade-in-50">
                 <Card className="bg-primary/10 border-primary/30">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">🎯 हमारी सिफारिश:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-lg">आपके लिए उपयुक्त: <strong className="text-foreground">{recommendation.type}</strong></p>
                        <p>अनुमानित बजट: <strong>{recommendation.budget}</strong></p>
                        <p>अनुमानित समय: <strong>{recommendation.timeline}</strong></p>
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button onClick={handleSelect}>
                           ✅ इस विकल्प को चुनें
                        </Button>
                        <Button variant="outline" onClick={handleAnotherSuggestion}>
                            <RefreshCw className="mr-2 h-4 w-4" /> दूसरा सुझाव
                        </Button>
                    </CardFooter>
                 </Card>
            </div>
        )}

      </CardContent>
    </Card>
  );
}
