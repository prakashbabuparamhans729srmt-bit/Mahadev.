'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categoryIcons, type projectCategories } from '@/lib/project-categories';

type ProjectCategoryListProps = {
  filteredCategories: typeof projectCategories;
};

export default function ProjectCategoryList({ filteredCategories }: ProjectCategoryListProps) {
  const isHot = (name: string) => ['ई-कॉमर्स', 'कॉर्पोरेट', 'ब्लॉग', 'शैक्षिक'].includes(name);

  return (
    <div className="space-y-12">
      {filteredCategories.map((group) => (
        <div key={group.group}>
          <h2 className="text-2xl font-bold font-headline mb-6 text-primary">{group.group}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {group.types.map((type) => (
              <Card key={type.name} className="bg-card/80 border-border/50 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-4 bg-secondary rounded-xl">
                      {categoryIcons[type.name] || categoryIcons['अन्य']}
                    </div>
                    {isHot(type.name) && (
                      <Badge variant="destructive" className="bg-accent text-accent-foreground text-xs">HOT</Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">{type.name}</h3>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    {type.features.slice(0, 3).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 border-t border-border/30 pt-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">बजट</span>
                    <span className="font-bold text-primary">{type.budget}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">समय</span>
                    <span className="font-bold">{type.timeline}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
      {filteredCategories.length === 0 && (
        <div className="text-center py-20 bg-card/50 rounded-lg">
            <p className="text-muted-foreground">कोई परिणाम नहीं मिला। कृपया अपनी खोज बदलें।</p>
        </div>
      )}
    </div>
  );
}
