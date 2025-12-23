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
  Users,
  Briefcase,
  TrendingUp,
  CreditCard,
  LogOut,
  LifeBuoy,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r-0 shadow-lg group-hover:w-[--sidebar-width] data-[state=expanded]:w-[--sidebar-width] data-[state=collapsed]:w-[--sidebar-width-icon]">
          <SidebarContent className="flex flex-col p-0">
            <SidebarGroup className="p-2 border-b">
              <div className="flex items-center gap-3 p-2 group-data-[state=collapsed]:group-hover:justify-start group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:p-0">
                <Icons.logo className="h-8 w-8 text-primary" />
                <div className="text-lg font-bold font-headline group-data-[state=collapsed]:group-hover:flex group-data-[state=collapsed]:hidden overflow-hidden">
                  Hajaro Grahako
                </div>
              </div>
            </SidebarGroup>
            <SidebarMenu className="p-2 flex-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/dashboard'}
                  tooltip="Dashboard"
                  size="lg"
                >
                  <Link href="/dashboard">
                    <BarChart2 />
                    <span className="group-data-[state=collapsed]:group-hover:inline-flex group-data-[state=collapsed]:hidden">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/project-oversight')}
                  tooltip="Projects"
                   size="lg"
                >
                  <Link href="/dashboard/project-oversight">
                    <Briefcase />
                    <span className="group-data-[state=collapsed]:group-hover:inline-flex group-data-[state=collapsed]:hidden">Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/messages')}
                  tooltip="Messages"
                   size="lg"
                >
                  <Link href="/dashboard/messages">
                    <MessageSquare />
                    <span className="group-data-[state=collapsed]:group-hover:inline-flex group-data-[state=collapsed]:hidden">Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/files')}
                  tooltip="Files"
                   size="lg"
                >
                  <Link href="/dashboard/files">
                    <File />
                    <span className="group-data-[state=collapsed]:group-hover:inline-flex group-data-[state=collapsed]:hidden">Files</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard/settings')}
                  tooltip="Settings"
                   size="lg"
                >
                   <Link href="/dashboard/settings">
                    <Settings />
                    <span className="group-data-[state=collapsed]:group-hover:inline-flex group-data-[state=collapsed]:hidden">Settings</span>
                   </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarGroup className="p-2 border-t">
                <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip="Support"
                          size="lg"
                          variant="ghost"
                        >
                          <LifeBuoy />
                          <span className="group-data-[state=collapsed]:group-hover:inline-flex group-data-[state=collapsed]:hidden">Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-card/80 px-4 backdrop-blur-sm md:h-16 md:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="flex-1">
                <SidebarTrigger className="hidden md:block" />
                </div>
                 <Button variant="ghost" size="icon">
                    <LogOut />
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/dashboard/settings">
                    <Settings />
                  </Link>
                </Button>
            </header>
            <main className="flex-1 bg-secondary/30">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
