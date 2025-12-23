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
  SidebarFooter,
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
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserNav() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
        router.push('/');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-left !px-2">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                    <AvatarFallback>
                      {user?.email?.[0]?.toUpperCase() ?? <Users />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium group-data-[state=collapsed]:hidden">
                    {user?.displayName ?? 'Admin User'}
                  </div>
              </div>
              <ChevronDown className="h-4 w-4 group-data-[state=collapsed]:hidden" />
            </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.displayName ?? 'Admin'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>लॉग आउट</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarContent className="flex flex-col p-0">
            <SidebarGroup className="p-3 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <Icons.logo className="h-8 w-8 text-primary" />
                <div className="text-xl font-bold font-headline group-data-[state=collapsed]:hidden overflow-hidden">
                  HG Hub
                </div>
              </div>
            </SidebarGroup>
            <SidebarMenu className="p-3 flex-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard')}
                  tooltip="Dashboard"
                  size="lg"
                >
                  <Link href="/dashboard">
                    <BarChart2 />
                    <span className="group-data-[state=collapsed]:hidden">Dashboard</span>
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
                    <span className="group-data-[state=collapsed]:hidden">Projects</span>
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
                    <span className="group-data-[state=collapsed]:hidden">Files</span>
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
                    <span className="group-data-[state=collapsed]:hidden">Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarFooter className="p-3">
                <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive('/dashboard/settings')}
                          tooltip="Settings"
                          size="lg"
                          variant="ghost"
                        >
                           <Link href="/dashboard/settings">
                            <Settings />
                            <span className="group-data-[state=collapsed]:hidden">Settings</span>
                           </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                          tooltip="Support"
                          size="lg"
                          variant="ghost"
                        >
                          <LifeBuoy />
                          <span className="group-data-[state=collapsed]:hidden">Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <UserNav />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-card/80 px-4 backdrop-blur-sm md:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="flex-1">
                <SidebarTrigger className="hidden md:block" />
                </div>
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
