
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
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
        <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r-0 shadow-lg">
          <SidebarContent className="p-0">
            <SidebarGroup className="p-2">
              <div className="flex items-center gap-3 p-2">
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
                    <span>प्रोजेक्ट डैशबोर्ड</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/project')}
                  tooltip="प्रोजेक्ट"
                >
                  <Link href="/dashboard/project">
                    <Users />
                    <span>प्रोजेक्ट विवरण</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/files')}
                  tooltip="फाइल्स"
                >
                  <Link href="/dashboard/files">
                    <File />
                    <span>फाइल्स</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="बिलिंग" disabled>
                  <Wallet />
                  <span>बिलिंग और इनवॉइस</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="सपोर्ट" disabled>
                  <HelpCircle />
                  <span>सपोर्ट टिकेट</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarGroup className="mt-auto p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} tooltip="लॉग आउट">
                           <LogOut />
                           <span>लॉग आउट</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="max-h-screen overflow-y-auto">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b bg-card/80 p-4 backdrop-blur-sm md:h-16">
            <SidebarTrigger className="md:hidden">
              <PanelLeft />
            </SidebarTrigger>
            <div className="flex-1">
              {/* Breadcrumbs or Page Title can go here */}
            </div>
            <Button variant="ghost" size="icon">
              <MessageSquare />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </header>
          <div className="flex-1">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
