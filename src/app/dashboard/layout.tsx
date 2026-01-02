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
  LayoutGrid,
  File,
  MessageSquare,
  Settings,
  Briefcase,
  LogOut,
  Cpu,
  Share2,
  Bell,
  Search,
  Plus,
  CheckCircle,
  CreditCard,
  Cookie,
  Shield,
  AreaChart,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { StartProjectDialog } from '@/components/start-project-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { UserNav } from '@/components/layout/user-nav';
import { SearchInput } from '@/components/layout/search-input';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // This layout should not apply to the user-management section, which has its own layout.
  if (pathname.startsWith('/dashboard/user-management')) {
    return <>{children}</>;
  }

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname !== '/dashboard/search') {
      return pathname === path;
    }
    return pathname.startsWith(path) && path !== '/dashboard';
  }
  
  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar>
          <SidebarContent className="flex flex-col p-2">
            <SidebarGroup className="p-3 mb-4">
              <div className="flex items-center gap-3">
                <Icons.logo className="h-8 w-8 text-primary" />
                <div className="text-xl font-bold font-headline group-data-[state=collapsed]:hidden overflow-hidden">
                  HAJARO PORTAL
                </div>
              </div>
            </SidebarGroup>
            
            <SidebarMenu className="flex-1 px-1">
               <SidebarMenuItem>
                <Button variant="secondary" size="lg" className="w-full !justify-start mb-4" onClick={() => setIsProjectModalOpen(true)}>
                    <Plus />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">नया प्रोजेक्ट</span>
                </Button>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard')}
                  tooltip="डैशबोर्ड"
                  size="lg"
                  className="!justify-start"
                >
                  <Link href="/dashboard">
                    <LayoutGrid />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">डैशबोर्ड</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/project-oversight')}
                  tooltip="प्रोजेक्ट्स"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/project-oversight">
                    <Briefcase />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">प्रोजेक्ट्स</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/reports')}
                  tooltip="रिपोर्ट्स"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/reports">
                    <AreaChart />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">रिपोर्ट्स</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/deploy')}
                  tooltip="डिप्लॉय"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/deploy">
                    <Rocket />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">डिप्लॉय</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/ai-scoper')}
                  tooltip="AI स्कोपर"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/ai-scoper">
                    <Cpu />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">AI स्कोपर</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/messages')}
                  tooltip="चैट रूम"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/messages">
                    <MessageSquare />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">चैट रूम</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/files')}
                  tooltip="फाइल्स"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/files">
                    <File />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">फाइल्स</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/collab-space')}
                  tooltip="कोलैब स्पेस"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/collab-space">
                    <Share2 />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">कोलैब स्पेस</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/cookie-status')}
                  tooltip="कुकी स्थिति"
                   size="lg"
                   className="!justify-start"
                >
                  <Link href="/dashboard/cookie-status">
                    <Cookie />
                    <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">कुकी स्थिति</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
                 <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={isActive('/dashboard/settings')}
                    tooltip="सेटिंग्स"
                    size="lg"
                    className="!justify-start"
                >
                    <Link href="/dashboard/settings">
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
                          onClick={() => {
                            const auth = useAuth();
                            if(auth) signOut(auth).then(() => router.push('/'));
                          }}
                          tooltip="लॉगआउट"
                          size="lg"
                          variant="ghost"
                          className="!justify-start text-red-400 hover:!bg-red-400/10 hover:!text-red-400"
                        >
                           <LogOut />
                           <span className="group-data-[state=collapsed]:hidden group-data-[state=collapsed]:group-hover:inline">लॉगआउट</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border/20 bg-background px-6">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="hidden md:flex" />
                  <Link href="/dashboard" className="md:hidden">
                    <Icons.logo className="h-6 w-6 text-primary" />
                    <span className="sr-only">Refresh Dashboard</span>
                  </Link>
                  <SidebarTrigger className="md:hidden" />
                </div>
                <SearchInput />
                 <div className="flex items-center gap-2">
                    <UserNav />
                 </div>
            </header>
            <main className="flex-1 bg-background">
                {children}
            </main>
            <footer className="h-14 px-6 flex items-center justify-between text-xs text-muted-foreground border-t border-border/20">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    सर्वर ऑनलाइन
                    <span className="text-foreground/40">•</span>
                    V2.1.4
                </div>
                <div className="hidden md:block">
                    नई सूचना: प्रोजेक्ट #1042 का डिज़ाइन स्वीकृत
                </div>
            </footer>
        </div>
      </div>
      <StartProjectDialog isOpen={isProjectModalOpen} onOpenChange={setIsProjectModalOpen} />
    </SidebarProvider>
  );
}
