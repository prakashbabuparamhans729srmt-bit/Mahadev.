
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  BarChart2,
  File,
  MessageSquare,
  PanelLeft,
  Settings,
  Wallet,
  HelpCircle,
  Users,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  const isActive = (path: string) => pathname === path;

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return (
       <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-secondary/30">
        <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r-0 shadow-lg fixed">
          <SidebarContent className="p-0">
            <SidebarGroup className="p-2">
              <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user?.photoURL ?? ''}
                    alt={user?.displayName ?? 'User'}
                  />
                  <AvatarFallback>
                    {user?.email?.[0]?.toUpperCase() ?? 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm group-data-[collapsible=icon]:hidden overflow-hidden">
                  <p className="font-semibold truncate">
                    {user?.displayName ?? 'ग्राहक'}
                  </p>
                  <p className="text-muted-foreground text-xs truncate">{user?.email}</p>
                </div>
              </div>
            </SidebarGroup>
            <SidebarMenu className="p-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard')}
                  tooltip="डैशबोर्ड"
                  size="lg"
                >
                  <Link href="/dashboard">
                    <BarChart2 />
                    <span className="group-data-[collapsible=icon]:hidden">प्रोजेक्ट डैशबोर्ड</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/project')}
                  tooltip="प्रोजेक्ट"
                   size="lg"
                >
                  <Link href="/dashboard/project">
                    <Users />
                    <span className="group-data-[collapsible=icon]:hidden">प्रोजेक्ट विवरण</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/files')}
                  tooltip="फाइल्स"
                   size="lg"
                >
                  <Link href="/dashboard/files">
                    <File />
                    <span className="group-data-[collapsible=icon]:hidden">फाइल्स</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="बिलिंग" disabled  size="lg">
                  <Wallet />
                  <span className="group-data-[collapsible=icon]:hidden">बिलिंग और इनवॉइस</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="सपोर्ट" disabled  size="lg">
                  <HelpCircle />
                  <span className="group-data-[collapsible=icon]:hidden">सपोर्ट टिकेट</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarGroup className="mt-auto p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} tooltip="लॉग आउट"  size="lg">
                           <LogOut />
                           <span className="group-data-[collapsible=icon]:hidden">लॉग आउट</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="main-content flex-1">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b bg-card/80 px-4 backdrop-blur-sm md:h-16 md:px-6">
            <SidebarTrigger className="md:hidden">
              <PanelLeft />
            </SidebarTrigger>
            <div className="flex-1">
              <SidebarTrigger className="hidden md:block" />
            </div>
            <Button variant="ghost" size="icon">
              <MessageSquare />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </header>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          </div>
      </div>
    </SidebarProvider>
  );
}
