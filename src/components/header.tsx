
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Rocket, X, LogOut, LayoutDashboard, User } from "lucide-react";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from 'next/navigation';

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase/provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "/#services", label: "सेवाएं" },
  { href: "/#pricing", label: "मूल्य" },
  { href: "/#portfolio", label: "पोर्टफोलियो" },
  { href: "/#process", label: "प्रक्रिया" },
  { href: "/#testimonials", label: "हमारे बारे में" },
  { href: "/contact", label: "संपर्क करें" },
];

function UserNav() {
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
        router.push('/');
    }
  };

  if (isUserLoading) {
    return null; // Or a loading spinner
  }

  if (!user) {
    return null; // This case should not be hit if logic is correct
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
             <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
            <AvatarFallback>
              {user.email?.[0]?.toUpperCase() ?? <User />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName ?? 'Admin'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>डैशबोर्ड</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>लॉग आउट</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  const AuthButton = () => {
    if (user) {
      return <UserNav />;
    }
    
    return (
      <Button asChild variant="default" className="animate-fast-blinking-glow">
        <Link href={pathname === '/login' ? "/signup" : "/login"}>
            {pathname === '/login' ? 'साइन अप करें' : 'लॉग इन / साइन अप'}
        </Link>
      </Button>
    );
  };
  
  const MobileAuthButton = () => {
    if (user) {
      return <UserNav />;
    }

    return (
      <Button asChild className="w-full justify-center">
        <Link href={pathname === '/login' ? "/signup" : "/login"} onClick={() => setIsMenuOpen(false)}>
           {pathname === '/login' ? 'साइन अप करें' : 'लॉग इन / साइन अप'}
        </Link>
      </Button>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Hajaro Grahako</span>
          </Link>
          <nav className="hidden space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="hidden md:flex items-center space-x-4">
                <AuthButton />
           </div>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container pb-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-medium text-foreground/80 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
             <div className="pt-4 border-t border-border/40">
              <MobileAuthButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
