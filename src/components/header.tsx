"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#services", label: "सेवाएं" },
  { href: "#pricing", label: "मूल्य" },
  { href: "#portfolio", label: "पोर्टफोलियो" },
  { href: "#process", label: "प्रक्रिया" },
  { href: "#testimonials", label: "हमारे बारे में" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">HG Hub</span>
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
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
             <Phone className="h-4 w-4" />
          </Button>
           <Button className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
              संपर्क करें
            </Button>
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
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              संपर्क करें
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
