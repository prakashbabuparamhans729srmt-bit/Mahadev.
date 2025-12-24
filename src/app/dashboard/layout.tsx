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
  Plus
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
import { Input } from '@/components/ui/input';

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
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
                <AvatarImage src={user?.photoURL ?? "https://picsum.photos/seed/1/100/100"} alt={user?.displayName ?? 'अमित कुमार'} />
                <AvatarFallback>
                {user?.email?.[0]?.toUpperCase() ?? 'A'}
                </AvatarFallback>
            </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.displayName ?? 'अमित कुमार'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? 'प्रीमियम क्लाइंट'}
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
  const auth = useAuth();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
        router.push('/');
    }
  };


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
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/dashboard')}
                  tooltip="डैशबोर्ड"
                  size="lg"
                  className="!justify-start"
                >
                  <Link href="/dashboard">
                    <LayoutGrid />
                    <span className="group-data-[state=collapsed]:hidden">डैशबोर्ड</span>
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
                    <span className="group-data-[state=collapsed]:hidden">प्रोजेक्ट्स</span>
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
                    <span className="group-data-[state=collapsed]:hidden">AI स्कोपर</span>
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
                    <span className="group-data-[state=collapsed]:hidden">चैट रूम</span>
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
                    <span className="group-data-[state=collapsed]:hidden">फाइल्स</span>
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
                    <span className="group-data-[state=collapsed]:hidden">कोलैब स्पेस</span>
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
                    <span className="group-data-[state=collapsed]:hidden">सेटिंग्स</span>
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarFooter className="p-1 mt-auto">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={handleLogout}
                          tooltip="लॉगआउट"
                          size="lg"
                          variant="ghost"
                          className="!justify-start text-red-400 hover:!bg-red-400/10 hover:!text-red-400"
                        >
                           <LogOut />
                           <span className="group-data-[state=collapsed]:hidden">लॉगआउट</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border/20 bg-background px-6">
                <SidebarTrigger className="md:hidden" />
                 <div className="relative flex-1 max-w-xl">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="खोजें..."
                        className="pl-10 h-11 bg-card/50 border-border/30"
                    />
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Bell />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <div className="flex items-center gap-3">
                        <UserNav />
                         <div className="text-right hidden sm:block">
                            <p className="font-semibold text-sm">अमित कुमार</p>
                            <p className="text-xs text-primary">प्रीमियम क्लाइंट</p>
                        </div>
                    </div>
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
    </SidebarProvider>
  );
}
