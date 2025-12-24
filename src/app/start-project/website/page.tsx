'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Search, Wand2, UserCircle, Target } from 'lucide-react';
import { projectCategories } from '@/lib/project-categories';
import ProjectCategoryList from '../project-category-list';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';


const whoAreYouTags = ["छोटा व्यवसाय", "स्टार्टअप", "फ्रीलांसर", "कलाकार", "शिक्षक", "डॉक्टर"];
const yourGoalTags = ["उत्पाद बेचना", "सेवाएं देना", "ऑनलाइन पहचान", "बुकिंग प्राप्त करना"];

export default function WebsiteSelectionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState('सब');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(projectCategories);

  const allFilters = ['सब', 'लोकप्रिय', 'व्यवसाय', 'टेक्नोलॉजी', 'क्रिएटिव', 'स्थानीय'];

    useEffect(() => {
        let categories = [...projectCategories];

        if (activeFilter !== 'सब' && activeFilter !== 'लोकप्रिय') {
             categories = categories.filter(group => group.group.includes(activeFilter));
        }

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            categories = categories.map(group => {
                const filteredTypes = group.types.filter(type =>
                    type.name.toLowerCase().includes(lowerCaseQuery) ||
                    type.features.some(feature => feature.toLowerCase().includes(lowerCaseQuery))
                );
                return { ...group, types: filteredTypes };
            }).filter(group => group.types.length > 0);
        }

        setFilteredCategories(categories);
    }, [activeFilter, searchQuery]);
    
    const handleTagClick = (tag: string) => {
        toast({
            title: 'AI चयन जल्द ही आ रहा है',
            description: ` आपने "${tag}" को चुना। यह सुविधा जल्द ही आपके लिए वेबसाइट के प्रकारों का सुझाव देगी।`,
        });
    };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-background text-foreground">
      {/* Header */}
      <div className="p-4 bg-card/80 rounded-2xl border border-border/50">
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
          <div className="w-48 flex items-center gap-3">
            <Progress value={16.6} className="h-1.5" />
             <span className="text-xs text-muted-foreground whitespace-nowrap">1 / 6</span>
          </div>
        </div>
      </div>

      {/* AI Quick Select */}
      <Card className="p-6 bg-card/80 border-border/50 rounded-2xl">
         <h2 className="text-lg font-bold font-headline flex items-center mb-4">
            <Wand2 className="mr-2 text-primary h-5 w-5"/>
            त्वरित चयन - AI संचालित
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center"><UserCircle className="mr-2 h-4 w-4"/>मैं हूँ:</h3>
                <div className="flex flex-wrap gap-2">
                    {whoAreYouTags.map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20" onClick={() => handleTagClick(tag)}>{tag}</Badge>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center"><Target className="mr-2 h-4 w-4"/>मेरा उद्देश्य:</h3>
                <div className="flex flex-wrap gap-2">
                    {yourGoalTags.map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20" onClick={() => handleTagClick(tag)}>{tag}</Badge>
                    ))}
                </div>
            </div>
        </div>
      </Card>


      {/* Search and Filters */}
      <div className="sticky top-4 z-10 p-4 bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="वेबसाइट प्रकार खोजें (उदा. ई-कॉमर्स)" 
              className="pl-9 bg-card/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {allFilters.map((filter) => (
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
      </div>

      {/* Project cards */}
      <ProjectCategoryList filteredCategories={filteredCategories} />

      {/* Footer Navigation */}
      <div className="flex justify-between items-center mt-6">
        <Button variant="ghost" onClick={() => router.back()}>पीछे जाएं</Button>
        <Button>
          अगला चरण: आवश्यकताएं &gt;
        </Button>
      </div>
    </div>
  );
}
