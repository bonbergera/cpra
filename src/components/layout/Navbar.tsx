
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
      <div className="container mx-auto px-4 sm:px-6 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300">
          <Image 
            src={logo?.imageUrl || "https://picsum.photos/seed/peace-advocacy-logo/400/120"} 
            alt="CPRA Logo" 
            width={240} 
            height={80} 
            className="h-14 w-auto object-contain"
            priority
            data-ai-hint="peace advocacy logo"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-accent flex items-center gap-2 hover:scale-110 active:scale-95",
                pathname === item.href ? "text-primary font-bold border-b-2 border-accent pb-1" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild variant="default" className="hidden xl:inline-flex bg-primary hover:bg-primary/90 hover:scale-105 transition-transform">
            <Link href="/support">Support Our Mission</Link>
          </Button>
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b animate-in slide-in-from-top-4 duration-200">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium py-2 flex items-center gap-3 transition-transform hover:translate-x-2",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5 text-accent" />
                {item.name}
              </Link>
            ))}
            <Button asChild className="w-full bg-primary mt-4">
              <Link href="/support">Support Our Mission</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
