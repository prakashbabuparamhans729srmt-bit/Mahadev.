

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
  Plus,
  CheckCircle,
  CreditCard,
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
  DropdownMenuHeader,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';

const notifications = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'डिज़ाइन स्वीकृत',
      description: 'प्रोजेक्ट #1042 का डिज़ाइन राहुल द्वारा अपलोड किया गया और क्लाइंट द्वारा अप्रूव हो गया है।',
      time: '10 मिनट पहले',
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      title: 'नया मैसेज',
      description: 'राहुल (TL) ने आपको एक संदेश भेजा है: "कल की मीटिंग के लिए डेमो तैयार है।',
      time: '1 घंटा पहले',
    },
    {
      icon: <CreditCard className="h-6 w-6 text-orange-500" />,
      title: 'पेमेंट प्राप्त',
      description: 'स्मार्ट ERP सिस्टम प्रोजेक्ट के लिए ₹1.2L का भुगतान सफल रहा।',
      time: '5 घंटे पहले',
    },
]

function NotificationsNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button variant="ghost" size="icon">
                    <Bell />
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 mr-4" align="end">
                <DropdownMenuHeader className="flex justify-between items-center">
                    <DropdownMenuLabel className="text-lg font-headline p-0">सूचनाएं</DropdownMenuLabel>
                    <Button variant="link" size="sm" className="p-0 h-auto">सभी पढ़ें</Button>
                </DropdownMenuHeader>
                <DropdownMenuSeparator />
                {notifications.map((n, i) => (
                    <DropdownMenuItem key={i} className="flex items-start gap-4 p-4 cursor-pointer">
                        <div className="bg-secondary p-3 rounded-full">
                           {n.icon}
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="font-semibold">{n.title}</p>
                            <p className="text-xs text-muted-foreground">{n.description}</p>
                            <p className="text-xs text-muted-foreground/70 pt-1">{n.time}</p>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

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
        <Button variant="ghost" className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
                <AvatarImage src={user?.photoURL ?? "https://picsum.photos/seed/1/100/100"} alt={user?.displayName ?? 'अमित कुमार'} />
                <AvatarFallback>
                {user?.email?.[0]?.toUpperCase() ?? 'A'}
                </AvatarFallback>
            </Avatar>
            <div className="text-right hidden sm:block">
                <p className="font-semibold text-sm">{user?.displayName ?? 'अमित कुमार'}</p>
                <p className="text-xs text-primary">प्रीमियम क्लाइंट</p>
            </div>
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
                          onClick={handleLogout}
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
                  <SidebarTrigger className="max-md:hidden" />
                  <Link href="/dashboard">
                    <Icons.logo className="h-6 w-6 text-primary" />
                    <span className="sr-only">Refresh Dashboard</span>
                  </Link>
                </div>
                 <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <div className="relative flex-1 max-w-xl">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="खोजें..."
                        className="pl-10 h-11 bg-card/50 border-border/30"
                    />
                </div>
                 <div className="flex items-center gap-2">
                    <NotificationsNav />
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
    </SidebarProvider>
  );
}
