
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Scale, Globe, FileText, Newspaper, Users, Map, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Newsroom", href: "/newsroom", icon: Newspaper },
  { name: "Themes", href: "/themes", icon: Globe },
  { name: "Research", href: "/research", icon: FileText },
  { name: "Tracker", href: "/tracker", icon: Scale },
  { name: "Conflict Map", href: "/conflict-map", icon: Map },
  { name: "Partnerships", href: "/partnerships", icon: Users },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground p-1.5 rounded">
            <Scale className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xl font-bold tracking-tight text-primary leading-none">CPRA</span>
            <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">Insight</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent flex items-center gap-2",
                pathname === item.href ? "text-primary border-b-2 border-accent pb-1" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="default" className="hidden sm:inline-flex bg-primary hover:bg-primary/90">
            Support Our Mission
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
                  "text-lg font-medium py-2 flex items-center gap-3",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5 text-accent" />
                {item.name}
              </Link>
            ))}
            <Button className="w-full bg-primary mt-4">Support Our Mission</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
