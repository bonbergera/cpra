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
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
          <Image 
            src={logo?.imageUrl || "https://picsum.photos/seed/peace-advocacy-logo/400/120"} 
            alt="CPRA Logo" 
            width={180} 
            height={50} 
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[12px] xl:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap uppercase tracking-tight",
                  pathname === item.href 
                    ? "text-primary bg-primary/5" 
                    : "text-accent hover:text-primary hover:bg-slate-50"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", pathname === item.href ? "text-primary" : "text-muted-foreground")} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button asChild className="hidden min-[1200px]:inline-flex bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider h-10 px-6 text-xs">
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
        <div className="lg:hidden bg-white border-b animate-in slide-in-from-top-4 duration-200 overflow-y-auto max-h-[calc(100vh-80px)]">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-bold py-4 px-4 rounded-xl flex items-center gap-4 transition-all hover:bg-slate-50",
                  pathname === item.href ? "bg-primary/5 text-primary" : "text-accent"
                )}
              >
                <item.icon className="h-5 w-5 text-primary/70" />
                {item.name}
              </Link>
            ))}
            <div className="pt-6 px-4">
              <Button asChild className="w-full bg-primary h-14 text-sm font-bold uppercase tracking-widest shadow-lg">
                <Link href="/support" onClick={() => setIsOpen(false)}>Support Our Mission</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}