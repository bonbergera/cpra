
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target, Eye, Scale, Globe, Heart } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-refugee");
  const execImg = PlaceHolderImages.find(img => img.id === "cliffton-chifuwe");
  const missionImg = PlaceHolderImages.find(img => img.id === "community-need");

  const coreValues = [
    { 
      icon: Target,
      text: "Non Partisan •CPRA will remain apolitical, neutral and objective" 
    },
    { 
      icon: Eye,
      text: "Transpa rent & Account able •CPRA will be transparent and accountable in its dealings" 
    },
    { 
      icon: Heart,
      text: "Ethical •CPRA will continue to adhere to professional and acceptable ethos" 
    },
    { 
      icon: Shield,
      text: "Honesty & Intergrit y •CPRA will be guided by principles that uphold integrity" 
    },
    { 
      icon: Scale,
      text: "Democra tic Values •CPRA's institutional arrangements will be anchored on respect for democratic values" 
    },
    { 
      icon: Globe,
      text: "Regional cooperati on •CPRA will be anchored on recognition of the value of regional efforts" 
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={heroImg?.imageUrl || "https://picsum.photos/seed/cpra-hero/1200/600"}
              alt={heroImg?.description || "Peacebuilding context"}
              fill
              className="object-cover"
              data-ai-hint="refugee children"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6">About CPRA Insight</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90 font-light leading-relaxed">
              We are a dedicated non-governmental organization committed to fostering sustainable peace, 
              democracy, and social justice across Southern Africa through evidence-based research and advocacy.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-headline font-bold text-primary">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A vibrant Southern Africa anchored on peaceful and inclusive societies where 
                    every individual can thrive in an environment free from violence, 
                    inequality, and injustice.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-headline font-bold text-primary">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To build strong institutions, catalyse positive change and support partnerships to foster sustainable peace and development through research, advocacy and evidence-based approaches.
                  </p>
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={missionImg?.imageUrl || "https://picsum.photos/seed/cpra-comm/600/400"}
                  alt={missionImg?.description || "Community interaction"}
                  fill
                  className="object-cover"
                  data-ai-hint="community support"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-slate-50 border-y">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-headline font-bold text-primary text-center mb-16">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreValues.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card key={idx} className="border-none shadow-md hover:shadow-xl transition-all duration-300">
                    <CardContent className="pt-8 text-center space-y-4">
                      <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                        {value.text}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
              <div className="shrink-0 relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={execImg?.imageUrl || "https://picsum.photos/seed/cpra-exec/300/300"}
                  alt={execImg?.description || "Cliffton Mayaba Chifuwe"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-headline font-bold text-primary">Our Leadership</h2>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-primary">Cliffton Mayaba Chifuwe</h4>
                  <p className="text-accent font-bold uppercase tracking-widest text-sm">Executive Director</p>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Under the leadership of Cliffton Mayaba Chifuwe, CPRA has grown into a leading regional 
                  voice for peace research. His dedication to restorative justice and policy reform 
                  guides our mission to protect the most vulnerable and strengthen democratic integrity 
                  in Southern Africa.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
