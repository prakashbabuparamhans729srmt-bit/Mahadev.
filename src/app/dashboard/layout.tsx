
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BarChart2,
  File,
  Home,
  MessageSquare,
  PanelLeft,
  Settings,
  Wallet,
  HelpCircle,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
   const { user } = useUser();

  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon" side="left" variant="sidebar">
          <SidebarContent>
            <SidebarGroup>
              <div className="flex items-center gap-2 p-2">
                 <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                  <AvatarFallback>{user?.email?.[0]?.toUpperCase() ?? 'A'}</AvatarFallback>
                </Avatar>
                <div className="text-sm group-data-[collapsible=icon]:hidden">
                    <p className="font-semibold">{user?.displayName ?? 'Client'}</p>
                    <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={isActive('/dashboard')}
                    tooltip="डैशबोर्ड"
                  >
                    <BarChart2 />
                    <span>प्रोजेक्ट डैशबोर्ड</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <Link href="/dashboard/files" legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={isActive('/dashboard/files')}
                    tooltip="फाइल्स"
                  >
                    <File />
                    <span>फाइल्स</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton tooltip="सहयोग" disabled>
                  <Users />
                  <span>रियल-टाइम कोलैबोरेशन</span>
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
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-card p-4 md:h-16">
            <SidebarTrigger className="md:hidden">
              <PanelLeft />
            </SidebarTrigger>
            <div className="flex-1">
              {/* You can add breadcrumbs or page titles here */}
            </div>
            <Button variant="ghost" size="icon">
                <MessageSquare />
            </Button>
            <Button variant="ghost" size="icon">
                <Settings />
            </Button>
          </header>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
