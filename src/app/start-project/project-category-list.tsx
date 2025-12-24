
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { categoryIcons, projectCategories } from '@/lib/project-categories';
import { Check, Search, SlidersHorizontal, Star, Tag, Zap, Clock, Banknote, Users, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const filters = [
    { id: 'popular', label: 'लोकप्रिय', icon: <Star className="h-4 w-4" /> },
    { id: 'cheap', label: 'सस्ती', icon: <Tag className="h-4 w-4" /> },
    { id: 'complex', label: 'जटिल', icon: <Zap className="h-4 w-4" /> },
    { id: 'quick', label: 'त्वरित', icon: <Clock className="h-4 w-4" /> },
];

export function ProjectCategoryList() {
    const { toast } = useToast();
    const isMobile = useIsMobile();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const handleSelect = (categoryName: string) => {
        toast({
            title: "श्रेणी चयनित!",
            description: `${categoryName} को अगले चरण के लिए चुना गया है।`,
        });
        // Here you would navigate to the next step, e.g., router.push('/start-project/requirements')
    };

    const handleFilterChange = (filterId: string) => {
        setActiveFilters(prev => 
            prev.includes(filterId) 
                ? prev.filter(f => f !== filterId)
                : [...prev, filterId]
        );
    };

    const filteredCategories = projectCategories.map(group => {
        const filteredTypes = group.types.filter(type => 
            type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            type.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        return { ...group, types: filteredTypes };
    }).filter(group => group.types.length > 0);

    if (isMobile) {
        return (
            <div className="w-full max-w-md mx-auto">
                 <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="श्रेणी खोजें..." 
                        className="pl-9"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <Accordion type="single" collapsible className="w-full">
                {filteredCategories.map(group => (
                    <AccordionItem value={group.group} key={group.group}>
                        <AccordionTrigger className="font-headline text-lg">{group.group}</AccordionTrigger>
                        <AccordionContent>
                           <div className="flex flex-col gap-4">
                             {group.types.map(type => (
                                <Card key={type.name} className="cursor-pointer" onClick={() => handleSelect(type.name)}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            {categoryIcons[type.name] || categoryIcons['अन्य']}
                                            {type.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm space-y-1">
                                        <p className="flex items-center gap-2"><Banknote size={14} /> {type.budget}</p>
                                        {type.projects && <p className="flex items-center gap-2"><Users size={14} /> {type.projects}+ प्रोजेक्ट्स</p>}
                                    </CardContent>
                                </Card>
                            ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
                 <Button className="w-full mt-6" onClick={() => toast({description: 'अगले चरण पर जाया जा रहा है...'})}>
                    आगे बढ़ें <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-12">
            <Card className="p-4 sticky top-20 z-10 bg-background/80 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="वेबसाइट प्रकार खोजें..." 
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <SlidersHorizontal className="h-4 w-4" />
                        <p className="font-medium">फ़िल्टर:</p>
                        <div className="flex items-center gap-3">
                            {filters.map(filter => (
                                <div key={filter.id} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={filter.id}
                                        checked={activeFilters.includes(filter.id)}
                                        onCheckedChange={() => handleFilterChange(filter.id)}
                                    />
                                    <Label htmlFor={filter.id} className="flex items-center gap-1 cursor-pointer">
                                        {filter.icon} {filter.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {filteredCategories.map(group => (
                <div key={group.group}>
                    <h2 className="font-headline text-2xl font-bold mb-6">{group.group}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {group.types.map(type => (
                            <Card key={type.name} className="flex flex-col hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div className="text-primary">{categoryIcons[type.name] || categoryIcons['अन्य']}</div>
                                        {type.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-3">
                                    <ul className="text-sm text-muted-foreground space-y-1.5">
                                        {type.features.map(feature => (
                                            <li key={feature} className="flex items-start">
                                                <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="flex-col items-start gap-4 pt-4 border-t mt-auto">
                                    <div className="w-full space-y-2 text-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><Banknote size={14}/> बजट:</span>
                                            <span className="font-semibold">{type.budget}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><Clock size={14}/> समय:</span>
                                            <span className="font-semibold">{type.timeline}</span>
                                        </div>
                                        {type.projects && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground flex items-center gap-1"><Users size={14}/> पूर्ण:</span>
                                                <span className="font-semibold">{type.projects}+ प्रोजेक्ट्स</span>
                                            </div>
                                        )}
                                    </div>
                                    <Button className="w-full" onClick={() => handleSelect(type.name)}>
                                        <Check className="mr-2 h-4 w-4" /> चुनें
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
             <div className="flex justify-between items-center mt-12">
                 <Button variant="outline" onClick={() => toast({description: 'आप पहले से ही पहले पेज पर हैं।'})}>⬅️ पीछे जाएं</Button>
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground">1</Button>
                    <Button variant="default" size="icon">2</Button>
                 </div>
                 <Button onClick={() => toast({description: 'अगले चरण पर जाया जा रहा है...'})}>
                    अगला चरण: आवश्यकताएं <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
