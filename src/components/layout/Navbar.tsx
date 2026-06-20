
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Newspaper, Globe, FileText, Scale, Map, Users, Info, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const navItems = [
  { name: "Themes", href: "/themes", icon: Globe },
  { name: "Newsroom", href: "/newsroom", icon: Newspaper },
  { name: "Research", href: "/research", icon: FileText },
  { name: "Tracker", href: "/tracker", icon: Scale },
  { name: "Conflict Map", href: "/conflict-map", icon: Map },
  { name: "Partnerships", href: "/partnerships", icon: Users },
  { name: "About Us", href: "/about", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const logo = PlaceHolderImages.find(img => img.id === "cpra-logo");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 flex h-20 items-center justify-between gap-2 lg:gap-4">
        {/* Logo - ensured to be shrink-resistant but responsive */}
        <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300 shrink-0">
          <Image 
          src="/cpra-logo.jpg"
            alt="CPRA Logo" 
            width={200} 
            height={60} 
            className="h-10 md:h-12 w-auto object-contain"
            priority
            data-ai-hint="peace advocacy logo"
          />
        </Link>

        {/* Desktop Nav - Flexible centered container */}
        <nav className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-0.5 xl:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[12px] xl:text-sm font-medium transition-all duration-300 hover:text-accent flex items-center gap-1 px-1.5 xl:px-3 py-1 hover:scale-110 active:scale-95 whitespace-nowrap",
                  pathname === item.href 
                    ? "text-primary font-bold border-b-2 border-accent" 
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Actions - Responsive visibility for the CTA button to maximize nav space */}
        <div className="flex items-center gap-2 shrink-0">
          <Button asChild variant="default" className="hidden min-[1200px]:inline-flex bg-primary hover:bg-primary/90 hover:scale-105 transition-transform text-[10px] xl:text-xs font-bold uppercase tracking-wider h-9 xl:h-10">
            <Link href="/support">Support Mission</Link>
          </Button>
          <button
            className="lg:hidden p-2 text-primary hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b animate-in slide-in-from-top-4 duration-200 overflow-y-auto max-h-[calc(100vh-80px)]">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium py-3 px-4 rounded-xl flex items-center gap-4 transition-all hover:bg-accent/5 hover:translate-x-2",
                  pathname === item.href ? "bg-accent/10 text-primary font-bold" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5 text-accent" />
                {item.name}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Button asChild className="w-full bg-primary h-12 text-sm font-bold uppercase tracking-widest">
                <Link href="/support" onClick={() => setIsOpen(false)}>Support Our Mission</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

