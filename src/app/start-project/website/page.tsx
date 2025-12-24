'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Search, Wand2 } from 'lucide-react';

const roles = ['छोटा व्यवसाय', 'स्टार्टअप', 'फ्रीलांसर', 'कलाकार', 'शिक्षक', 'डॉक्टर'];
const goals = ['उत्पाद बेचना', 'सेवाएं देना', 'ऑनलाइन पहचान', 'बुकिंग प्राप्त करना'];
const filters = ['सब', 'लोकप्रिय', 'व्यवसाय', 'टेक्नोलॉजी', 'क्रिएटिव', 'स्थानीय'];

export default function WebsiteSelectionPage() {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [activeGoal, setActiveGoal] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('सब');

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <Card className="p-4 bg-card/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="text-xl font-bold font-headline">नया प्रोजेक्ट शुरू करें</h1>
              <p className="text-sm text-muted-foreground">चरण 1/6: वेबसाइट प्रकार चुनें</p>
            </div>
          </div>
          <div className="w-48">
            <Progress value={16.6} />
          </div>
        </div>
      </Card>

      {/* AI Quick Selection */}
      <Card className="p-6 bg-card/80">
        <h2 className="text-lg font-semibold font-headline flex items-center gap-2 mb-4">
          <Wand2 className="text-primary" />
          त्वरित चयन - AI संचालित
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">👤 मैं हूँ:</h3>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Button
                  key={role}
                  variant={activeRole === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveRole(role)}
                  className="rounded-full"
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">🎯 मेरा उद्देश्य:</h3>
            <div className="flex flex-wrap gap-2">
              {goals.map((goal) => (
                <Button
                  key={goal}
                  variant={activeGoal === goal ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveGoal(goal)}
                  className="rounded-full"
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="p-4 bg-card/80">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="वेबसाइट प्रकार खोजें (उदा. ई-कॉमर्स)" className="pl-9" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="rounded-full flex-shrink-0"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Placeholder for project cards */}
      <CardContent className="text-center py-20 bg-card/50 rounded-lg">
        <p className="text-muted-foreground">लोकप्रिय वेबसाइट प्रकार यहाँ दिखाए जाएंगे...</p>
      </CardContent>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.back()}>पीछे जाएं</Button>
        <Button>
          अगला चरण: आवश्यकताएं &gt;
        </Button>
      </div>
    </div>
  );
}
