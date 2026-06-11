
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Scale, TreePine, Users, ChevronRight, ShieldCheck, Heart, Landmark, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const themes = [
  {
    id: "peacebuilding",
    label: "Peacebuilding",
    icon: Globe,
    title: "Mediation & Conflict Resolution",
    description: "Our peacebuilding initiatives involve mapping out structural conflicts and training local communities in restorative justice. We focus on creating sustainable environments for peaceful coexistence.",
    image: "https://picsum.photos/seed/theme1/800/500",
    features: ["Conflict Mapping", "Mediator Training", "Youth Peace Camps", "Regional Security Monitoring"]
  },
  {
    id: "accountability",
    label: "Accountability",
    icon: Scale,
    title: "Democratic Governance",
    description: "Monitoring political governance and electoral integrity is at our core. We advocate for legislative reforms that protect human rights and ensure a transparent democratic process in Zambia.",
    image: "https://picsum.photos/seed/theme2/800/500",
    features: ["Electoral Observation", "Legal Reform Advocacy", "Anti-Corruption Monitoring", "Civic Education"]
  },
  {
    id: "climate-justice",
    label: "Climate Justice",
    icon: TreePine,
    title: "Environmental Fragility",
    description: "Environmental issues often drive regional conflicts. We conduct fragility assessments to map out how climate change impacts migration and localized resource disputes.",
    image: "https://picsum.photos/seed/theme3/800/500",
    features: ["Resource Mapping", "Climate Fragility Reports", "Sustainable Land Rights", "Rural Conflict Mitigation"]
  },
  {
    id: "vulnerable-groups",
    label: "Vulnerable Groups",
    icon: Users,
    title: "Humanitarian Protection",
    description: "We provide dedicated support for refugees, protect children affected by armed conflicts, and work tirelessly to prevent gender-based violence and child sexual abuse.",
    image: "https://picsum.photos/seed/theme4/800/500",
    features: ["Refugee Support", "Child Protection", "GBV Prevention", "Humanitarian Advocacy"]
  }
];

export default function ThemesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Strategic Theme Directory</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                CPRA operates at the critical intersection of several thematic areas to address the root causes of conflict and promote resilience.
              </p>
            </div>

            <Tabs defaultValue="peacebuilding" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-muted p-1 rounded-xl h-auto flex-wrap justify-center sm:flex-nowrap">
                  {themes.map((theme) => (
                    <TabsTrigger 
                      key={theme.id} 
                      value={theme.id}
                      className="rounded-lg py-3 px-6 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all flex items-center gap-2"
                    >
                      <theme.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{theme.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {themes.map((theme) => (
                <TabsContent key={theme.id} value={theme.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      <Image 
                        src={theme.image} 
                        alt={theme.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary leading-tight">
                          {theme.title}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {theme.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {theme.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-accent transition-colors">
                            <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
                            <span className="text-sm font-semibold text-primary">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t flex flex-wrap gap-4">
                        <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8">
                          <Link href="/research">View Related Research</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-muted-foreground/30 px-8">
                          <Link href="/partnerships">Partner with Us</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
