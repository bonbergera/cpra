
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target, Heart, Scale, Globe, Users, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function SupportPage() {
  const missionImg = PlaceHolderImages.find(img => img.id === "peacebuilding");

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                Support Our Mission for <span className="text-accent">Sustainable Peace</span>
              </h1>
              <p className="text-xl opacity-90 font-light leading-relaxed">
                Join the Centre for Peace Research and Advocacy (CPRA) in our commitment to fostering 
                democracy, protecting human rights, and building resilient societies across Southern Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Insights */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-headline font-bold text-primary mb-4">Why Support CPRA?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At CPRA, we don't just advocate for change; we drive it through evidence-based research and localized 
                    interventions. Your partnership enables us to bridge the gap between high-level policy and grassroots 
                    stability.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: Target, title: "Evidence-Based", desc: "Our research informs local and regional policy frameworks." },
                    { icon: Users, title: "Community Focused", desc: "Direct engagement with traditional leaders and youth groups." },
                    { icon: Shield, title: "Rights Protection", desc: "Active monitoring of democratic and human rights integrity." },
                    { icon: Globe, title: "Regional Impact", desc: "Collaborative networks spanning across Southern Africa." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="bg-accent/10 p-2 rounded-lg h-fit">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={missionImg?.imageUrl || ""}
                  alt="Our Mission in Action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pillars of Partnership */}
        <section className="py-24 bg-slate-50 border-y">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-headline font-bold text-primary">Strategic Partnership Pillars</h2>
              <p className="text-muted-foreground">We collaborate with academic, governmental, and international partners to scale our impact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-8 space-y-4">
                  <Scale className="h-10 w-10 text-accent" />
                  <h3 className="text-xl font-headline font-bold text-primary">Legislative Monitoring</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Helping us track and influence bills like the Public Gatherings Bill to ensure fair democratic processes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="pt-8 space-y-4">
                  <Heart className="h-10 w-10 text-accent" />
                  <h3 className="text-xl font-headline font-bold text-primary">Restorative Justice</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Partnering on mediation training and localized conflict resolution frameworks in vulnerable communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="pt-8 space-y-4">
                  <Users className="h-10 w-10 text-accent" />
                  <h3 className="text-xl font-headline font-bold text-primary">Student Mentorship</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Empowering the next generation of African researchers through our academic MOUs and internship programs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-8 bg-primary p-12 rounded-[2rem] text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to make a difference?</h2>
              <p className="text-lg opacity-80">
                Whether you are an academic institution, a donor, or a volunteer, your contribution 
                helps us build a more just and peaceful society.
              </p>
              <div className="pt-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white px-10 py-8 text-lg font-bold flex flex-col items-center gap-1 group"
                >
                  <a href="https://docs.google.com/forms/d/1Z4evQll6NfnWT9fSOmiYpB2Nb19fXdCS_FNVILCngQQ/edit?pli=1" target="_blank" rel="noopener noreferrer">
                    <span className="text-xs font-normal opacity-80">Interested in becoming a partner?</span>
                    <span className="flex items-center gap-2">
                      GET IN TOUCH <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
