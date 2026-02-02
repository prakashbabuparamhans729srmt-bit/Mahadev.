
'use client';

import React from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Users,
  Briefcase,
  Settings,
  ArrowLeft,
  UserCog,
  List,
  LineChart,
  Loader2,
  ShieldAlert,
  Archive,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { UserNav } from '@/components/layout/user-nav';
import { SearchInput } from '@/components/layout/search-input';
import { useUser, useAuth } from '@/firebase';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { checkIsAdmin } from '@/hooks/use-admin';


export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // This effect acts as a strict route guard.
  useEffect(() => {
    // Wait until auth state is determined
    if (isUserLoading) {
      return;
    }

    const isAdmin = checkIsAdmin(user);

    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "अनधिकृत पहुंच",
        description: "आपके पास इस पृष्ठ तक पहुंचने की अनुमति नहीं है।",
      });
      router.replace('/dashboard');
      return; // Early exit
    }
    
    // If admin is verified, they are authorized.
    setIsAuthorized(true);
    setAuthChecked(true);

  }, [user, isUserLoading, router, pathname, toast]);

  // Show a loading screen while all authorization checks are in progress.
  if (!authChecked) {
    return (
       <div className="flex h-screen w-full items-center justify-center bg-background text-center p-4">
        <div className="space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">आपकी अनुमतियों का सत्यापन हो रहा है...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthorized) {
    // This state could be reached if checks complete but authorization fails.
    // The useEffect should redirect, but this is a fallback.
     return (
       <div className="flex h-screen w-full items-center justify-center bg-background text-center p-4">
        <div className="space-y-4">
            <ShieldAlert className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-xl font-bold">पहुंच अस्वीकृत</h1>
            <p className="text-muted-foreground">आपके पास इस अनुभाग को देखने की अनुमति नहीं है।</p>
            <Button onClick={() => router.replace('/dashboard')}>डैशबोर्ड पर वापस जाएं</Button>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => {
    if (path === '/dashboard/user-management') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };
  
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Pass the isAuthorized flag to the child pages.
      return React.cloneElement(child, { isAuthorized } as { isAuthorized: boolean });
    }
    return child;
  });

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar>
          <SidebarContent className="flex flex-col p-2">
            <SidebarGroup className="p-3 mb-4">
              <div className="flex items-center gap-3">
                <UserCog className="h-8 w-8 text-primary" />
                <div className="text-lg font-bold font-headline group-data-[state=collapsed]:hidden overflow-hidden">
                  ADMIN PANEL
                </div>
              </div>
            </SidebarGroup>
            
            <SidebarMenu className="flex-1 px-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/user-management/analytics')}
                  tooltip="एनालिटिक्स"
                  size="lg"
                  className="!justify-start"
                >
                  <Link href="/dashboard/user-management/analytics">
                    <LineChart />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">एनालिटिक्स</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/user-management') && pathname === '/dashboard/user-management'}
                  tooltip="ग्राहक"
                  size="lg"
                  className="!justify-start"
                >
                  <Link href="/dashboard/user-management">
                    <Users />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">ग्राहक</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/user-management/details-list')}
                  tooltip="यूज़र डिटेल्स लिस्ट"
                  size="lg"
                  className="!justify-start"
                >
                  <Link href="/dashboard/user-management/details-list">
                    <List />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">यूज़र डिटेल्स लिस्ट</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/user-management/projects')}
                  tooltip="प्रोजेक्ट्स"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/user-management/projects">
                    <Briefcase />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">प्रोजेक्ट्स</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/user-management/storage')}
                  tooltip="स्टोरेज"
                  size="lg"
                  className="!justify-start"
                >
                  <Link href="/dashboard/user-management/storage">
                    <Archive />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">स्टोरेज</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/user-management/settings')}
                  tooltip="सेटिंग्स"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/user-management/settings">
                    <Settings />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">सेटिंग्स</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarFooter className="p-1 mt-auto">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          tooltip="मुख्य डैशबोर्ड"
                          size="lg"
                          variant="ghost"
                          className="!justify-start text-muted-foreground"
                        >
                           <Link href="/dashboard">
                               <ArrowLeft />
                               <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">मुख्य डैशबोर्ड पर वापस</span>
                           </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border/20 bg-background px-6">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="md:hidden" />
                  <div className="hidden md:block">
                     <h1 className="font-bold text-lg">Admin Panel</h1>
                  </div>
                </div>
                <SearchInput />
                 <div className="flex items-center gap-2">
                    <UserNav />
                 </div>
            </header>
            <main className="flex-1 bg-background/95">
                {childrenWithProps}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
