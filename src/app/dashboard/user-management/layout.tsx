'use client';

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
  LayoutDashboard,
  List,
  LineChart,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { UserNav } from '@/components/layout/user-nav';
import { SearchInput } from '@/components/layout/search-input';
import { useUser } from '@/firebase';
import { useEffect, useState } from 'react';


// This is a placeholder. In a real app, this should be determined from a secure source like a custom claim.
const checkIsAdmin = (user: import('firebase/auth').User | null): boolean => {
  if (!user) return false;
  // Using email for identification as requested by the user.
  const ADMIN_EMAIL = 'divyahanssuperpower@gmail.com';
  return user.email === ADMIN_EMAIL;
}


export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // This effect acts as a route guard.
  useEffect(() => {
    // Wait until auth state is determined
    if (isUserLoading) {
      return;
    }

    const isAdmin = checkIsAdmin(user);

    // If user is not admin, redirect them immediately.
    if (!isAdmin) {
      router.replace('/dashboard');
      return;
    }

    // If the path is not the auth page, check for re-authentication flag
    if (pathname !== '/dashboard/user-management/auth') {
      const isReauthenticated = sessionStorage.getItem('isAdminReauthenticated') === 'true';
      if (!isReauthenticated) {
        router.replace('/dashboard/user-management/auth');
      } else {
        setIsAuthorized(true);
      }
    } else {
      // If on the auth page, they are considered "authorized" to see that page.
      setIsAuthorized(true);
    }
  }, [user, isUserLoading, router, pathname]);

  if (!isAuthorized) {
    // Show a loading screen while authorization checks are in progress.
    // This prevents rendering content before redirection/authorization is complete.
    return (
       <div className="flex h-screen w-full items-center justify-center bg-background text-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If on the auth page, render it without the main layout
  if (pathname === '/dashboard/user-management/auth') {
    return <>{children}</>;
  }


  const isActive = (path: string) => {
    // Exact match for the main page, startsWith for sub-pages
    if (path === '/dashboard/user-management') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

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
                  tooltip="एडमिन डैशबोर्ड"
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
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
