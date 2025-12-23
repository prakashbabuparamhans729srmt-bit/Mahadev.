'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function UserManagementPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-lg flex items-center gap-2">
            <Users />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is where user management features will be built.</p>
        </CardContent>
      </Card>
    </div>
  );
}
