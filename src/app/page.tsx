"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Scale, TreePine, Users, ChevronRight, Facebook, ExternalLink } from "lucide-react";
import siteContent from "@/lib/site-content.json";

export default function Home() {
  const [selectedAdvocacy, setSelectedAdvocacy] = useState<any | null>(null);
  const advocacyItems = siteContent.news;
  
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-refugee");
  const missionImg = PlaceHolderImages.find(img => img.id === "community-need");
  const execImg = PlaceHolderImages.find(img => img.id === "cliffton-chifuwe");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImg?.imageUrl || ""}
              alt={heroImg?.description || "Hero"}
              fill
              className="object-cover brightness-[0.3]"
              priority
              data-ai-hint={heroImg?.imageHint}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl space-y-6 md:space-y-8 animate-fade-in text-center sm:text-left">
              <div className="inline-block bg-primary/20 border border-primary/30 text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-bold backdrop-blur-md">
                Independent NGO • Zambia
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold text-white leading-[1.1]">
                Fostering Sustainable <span className="text-primary italic">Peace</span> Across Southern Africa
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto sm:mx-0">
                The Centre for Peace Research and Advocacy (CPRA) is dedicated to promoting democracy, 
                human rights, and social justice through evidence-based research and localized conflict resolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 h-14 w-full sm:w-auto font-bold uppercase tracking-widest text-xs shadow-xl">
                  <Link href="/research">Launch Research Tool</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/50 px-10 h-14 w-full sm:w-auto font-bold uppercase tracking-widest text-xs backdrop-blur-sm">
                  <Link href="/themes">Explore Core Themes</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 md:py-32 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Commitment</span>
                  <h2 className="text-3xl md:text-5xl font-headline font-bold text-accent">Defining Our Vision</h2>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                  We envision a vibrant Southern Africa anchored on peaceful and inclusive societies, 
                  where every individual can thrive in an environment free from violence and inequality.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border">
                    <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-accent">Strategic Advocacy</h4>
                      <p className="text-xs text-muted-foreground mt-1">Driving evidence-based policy changes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border">
                    <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-accent">Democratic Integrity</h4>
                      <p className="text-xs text-muted-foreground mt-1">Monitoring governance reforms.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src={missionImg?.imageUrl || ""}
                  alt={missionImg?.description || "Mission"}
                  fill
                  className="object-cover"
                  data-ai-hint={missionImg?.imageHint}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Thematic Pillars */}
        <section className="py-24 bg-accent text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Strategic Pillars</h2>
              <p className="text-white/70 text-lg font-light leading-relaxed">Our work operates at the critical intersection of governance, human rights, and environmental stability.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Peacebuilding", icon: Globe, desc: "Conflict mapping and local community mediation training." },
                { title: "Governance", icon: Scale, desc: "Monitoring electoral integrity and legislative reforms." },
                { title: "Climate Justice", icon: TreePine, desc: "Assessing how environmental fragility impacts conflict." },
                { title: "Vulnerable Groups", icon: Users, desc: "Supporting refugees and protecting children in conflict." }
              ].map((item, idx) => (
                <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardHeader>
                    <div className="p-3 bg-primary/20 rounded-xl w-fit mb-4">
                      <item.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <CardTitle className="text-white text-xl font-headline">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/60 leading-relaxed min-h-[3rem]">{item.desc}</p>
                    <Link href={`/themes?tab=${item.title.toLowerCase().replace(' ', '-')}`} className="inline-flex items-center text-primary mt-6 text-sm font-bold hover:underline gap-2">
                      Explore Pillar <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Director Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
              <div className="shrink-0 relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 rotate-3">
                <Image
                  src={execImg?.imageUrl || ""}
                  alt={execImg?.description || "Cliffton Chifuwe"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left space-y-6">
                <blockquote className="text-2xl md:text-3xl font-headline italic text-accent leading-snug">
                  "At CPRA, we believe that peace is not merely the absence of conflict, but the <span className="text-primary not-italic font-bold">presence of social justice</span>, democratic accountability, and human dignity."
                </blockquote>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="h-px w-12 bg-primary"></div>
                  <div>
                    <h4 className="text-xl font-bold text-accent">Cliffton Mayaba Chifuwe</h4>
                    <p className="text-primary text-xs uppercase tracking-widest font-bold">Executive Director, CPRA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsroom Preview */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-2">
                <span className="text-primary font-bold uppercase tracking-widest text-xs">Advocacy Updates</span>
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-accent">Latest Advocacy</h2>
              </div>
              <Button asChild variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/5 font-bold h-12 px-8">
                <Link href="/newsroom" className="flex items-center gap-2">View Newsroom <ChevronRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {advocacyItems.slice(0, 3).map((news: any, idx: number) => {
                const newsImg = PlaceHolderImages.find(img => img.id === news.id);
                return (
                  <div key={idx} className="group cursor-pointer bg-white p-6 rounded-3xl shadow-sm border border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-500" onClick={() => setSelectedAdvocacy(news)}>
                    <div className="mb-6 overflow-hidden rounded-2xl aspect-[16/10] relative">
                      <Image 
                        src={newsImg?.imageUrl || ""} 
                        alt={newsImg?.description || news.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        data-ai-hint={newsImg?.imageHint}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/20 px-3 uppercase tracking-wider">{news.category}</Badge>
                        <span className="text-[10px] text-muted-foreground font-bold">{news.date}</span>
                      </div>
                      <h3 className="text-xl font-headline font-bold text-accent group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{news.excerpt}</p>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-primary flex items-center gap-2">Read Full Statement <ArrowRight className="h-3 w-3" /></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10 space-y-10">
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Ready to drive change?</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto font-light leading-relaxed">
              Join us in our mission to build a more inclusive, peaceful, and democratic Southern Africa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100 px-12 h-14 w-full sm:w-auto font-bold uppercase tracking-widest text-xs shadow-2xl">
                <Link href="/support">Become a Partner</Link>
              </Button>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-12 h-14 w-full sm:w-auto font-bold uppercase tracking-widest text-xs shadow-lg">
                <Link href="/research">Analyze Research</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}