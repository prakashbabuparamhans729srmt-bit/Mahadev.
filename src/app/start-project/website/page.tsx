'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Search } from 'lucide-react';
import { projectCategories } from '@/lib/project-categories';
import ProjectCategoryList from '../project-category-list';

export default function WebsiteSelectionPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('सब');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(projectCategories);

  const allFilters = ['सब', ...new Set(projectCategories.map(cat => cat.group))];

  useEffect(() => {
    let categories = [...projectCategories];

    if (activeFilter !== 'सब') {
      categories = categories.filter(group => group.group === activeFilter);
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


  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-background text-foreground">
      {/* Header */}
      <div className="p-4 bg-card/80 rounded-2xl">
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
      </div>

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
