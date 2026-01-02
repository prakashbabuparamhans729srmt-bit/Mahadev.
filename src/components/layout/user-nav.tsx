'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuHeader,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Shield } from "lucide-react";

export function UserNav() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
        await signOut(auth);
        router.push('/login');
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="hidden sm:block space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Button onClick={() => router.push('/login')}>लॉग इन</Button>;
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? 'User'} />
                <AvatarFallback>
                  {user.displayName?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? 'U'}
                </AvatarFallback>
            </Avatar>
            <div className="text-right hidden sm:block">
                <p className="font-semibold text-sm">{user.displayName ?? 'उपयोगकर्ता'}</p>
                <p className="text-xs text-primary">प्रीमियम क्लाइंट</p>
            </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName ?? 'उपयोगकर्ता'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="https://idx.google.com/studio-9341424071" target="_blank" rel="noopener noreferrer">
            <Shield className="mr-2 h-4 w-4" />
            <span>एडमिन पैनल</span>
          </a>
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
