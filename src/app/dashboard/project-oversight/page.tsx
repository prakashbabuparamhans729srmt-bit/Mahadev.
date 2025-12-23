'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function ProjectOversightPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center gap-2">
            <Briefcase />
            Project Oversight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is where project oversight features will be built.</p>
        </CardContent>
      </Card>
    </div>
  );
}
