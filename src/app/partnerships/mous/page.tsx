
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowLeft, Landmark, Users, Scale, Globe } from "lucide-react";
import Link from "next/link";
import siteContent from "@/lib/site-content.json";

const iconMap: Record<string, any> = {
  Landmark,
  Globe,
  Scale,
  Users
};

export default function MOUsPage() {
  const mous = siteContent.mous;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col gap-6">
              <Button asChild variant="ghost" className="w-fit -ml-4 gap-2 text-muted-foreground hover:text-primary">
                <Link href="/partnerships">
                  <ArrowLeft className="h-4 w-4" /> Back to Partnerships
                </Link>
              </Button>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Active MOUs</h1>
                <p className="text-muted-foreground text-lg">
                  Directory of formal Memorandums of Understanding established by the Centre for Peace Research and Advocacy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mous.map((mou: any) => {
                // Map icons based on partner or hardcode if needed
                let Icon = Landmark;
                if (mou.id.includes('sadc')) Icon = Globe;
                if (mou.id.includes('moj')) Icon = Scale;
                if (mou.id.includes('unhcr')) Icon = Users;

                return (
                  <Card key={mou.id} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/5 rounded-lg">
                            <Icon className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-headline text-primary">{mou.partner}</CardTitle>
                            <CardDescription className="font-medium text-accent">{mou.type}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1.5 py-1">
                          <Calendar className="h-3 w-3" /> {mou.date}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-accent">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Primary Focus</h4>
                        <p className="text-sm font-semibold">{mou.focus}</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {mou.description}
                      </p>
                      <div className="flex justify-end">
                        <Button asChild variant="link" className="text-accent gap-2 p-0 font-bold hover:no-underline">
                          <a href={`/documents/${mou.id}-brief.pdf`} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-4 w-4" /> View Agreement Brief
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="p-12 bg-primary text-primary-foreground rounded-3xl text-center space-y-8 shadow-xl">
              <div className="space-y-3">
                <h3 className="text-3xl font-headline font-bold">Interested in establishing an MOU?</h3>
                <p className="opacity-80 max-w-xl mx-auto text-lg font-light leading-relaxed">
                  We welcome collaborations with academic institutions, international NGOs, and government agencies 
                  committed to sustainable peace and development.
                </p>
              </div>
              <Button asChild className="bg-accent hover:bg-accent/90 text-white px-10 h-12 font-bold uppercase tracking-widest text-xs">
                <Link href="/support">Submit Collaboration Proposal</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
