
'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Plus,
  ShieldAlert,
  Construction,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, type User } from '@/firebase';

// This is a placeholder. In a real app, this would be determined from a secure source like a custom claim.
const checkIsAdmin = (user: User | null): boolean => {
  if (!user) return false;
  // Using email for identification as requested by the user.
  const ADMIN_EMAIL = 'divyahanssuperpower@gmail.com';
  return user.email === ADMIN_EMAIL;
}

export default function UserManagementPage() {
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We wait until the user object is no longer loading.
    if (!isUserLoading) {
      // Then we check if a user exists and if they are an admin.
      const adminStatus = checkIsAdmin(user);
      setIsAdmin(adminStatus);
      // We are done loading the page's permission checks.
      setIsLoading(false);
    }
  }, [user, isUserLoading]); // This effect re-runs when the user or loading state changes.

  // While checking permissions, show a loading state.
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4">अनुमतियों की जाँच हो रही है...</p>
      </div>
    );
  }

  // If the user is not an admin, show the "Insufficient Permissions" message.
  if (!isAdmin) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center h-96 text-center text-destructive bg-destructive/10 rounded-lg border border-dashed border-destructive/30">
          <ShieldAlert className="h-10 w-10 mb-4 text-destructive" />
          <h3 className="text-xl font-semibold text-foreground">अपर्याप्त अनुमतियाँ</h3>
          <p className="text-sm max-w-sm mt-2 text-muted-foreground">
            यह पेज केवल एडमिनिस्ट्रेटर्स के लिए उपलब्ध है। यदि आपको लगता है कि यह एक गलती है, तो कृपया समर्थन से संपर्क करें।
          </p>
        </div>
      </div>
    );
  }
  
  // If the user IS an admin, show the actual management page.
  return (
    <>
      <div className="p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Users />
                ग्राहक प्रबंधन (एडमिन)
              </CardTitle>
              <CardDescription>
                यहां सभी पंजीकृत ग्राहकों को देखें और प्रबंधित करें।
              </CardDescription>
            </div>
            <Button onClick={() => toast({ description: 'यह सुविधा जल्द ही लागू की जाएगी।' })}>
              <Plus className="mr-2 h-4 w-4" /> नया ग्राहक जोड़ें
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground bg-secondary/30 rounded-lg border border-dashed">
                <Construction className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-semibold text-foreground">ग्राहक सूची जल्द ही आ रही है</h3>
                <p className="text-sm max-w-sm mt-2">
                  हम यहां सभी ग्राहकों की सूची दिखाने पर काम कर रहे हैं।
                </p>
            </div>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">आप यह पेज देख पा रहे हैं क्योंकि आप एक एडमिन हैं।</p>
           </CardFooter>
        </Card>
      </div>
    </>
  );
}

    