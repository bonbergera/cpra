"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Landmark, Sparkles, ArrowLeft, Calendar, UserCheck, Mail } from "lucide-react";
import Link from "next/link";

/**
 * EDITABLE FELLOWSHIP DATA
 * You can add, remove, or modify fellowships in this array.
 */
const fellowships = [
  {
    id: "f-1",
    title: "Post-Conflict Reconstruction Fellow",
    partner: "University of Zambia (UNZA)",
    duration: "6 Months",
    type: "Sponsored / Full",
    focus: "Restorative Justice Systems",
    description: "In-depth academic research into indigenous mediation frameworks within rural Zambia. Candidates will work with UNZA faculty and CPRA field researchers."
  },
  {
    id: "f-2",
    title: "Regional Security Analyst",
    partner: "SADC Peacebuilding Center",
    duration: "4 Months",
    type: "Sponsored / Hybrid",
    focus: "Conflict Mapping & GIS",
    description: "Using data science and geospatial tools to map localized structural conflicts across the Southern African region."
  },
  {
    id: "f-3",
    title: "Human Rights & Policy Advocate",
    partner: "Ministry of Justice",
    duration: "3 Months",
    type: "Sponsored / Partial",
    focus: "Legislative Reform Monitoring",
    description: "Focus on monitoring current bills and providing evidence-based advocacy briefs for stakeholders in the Zambian government."
  }
];

const FB_LINK = "https://www.facebook.com/p/Centre-for-Peace-Research-and-Advocacy-CPRA-100087220065870/";
const CPRA_EMAIL = "cpra4peace@gmail.com";

export default function FellowshipsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex flex-col gap-6">
              <Button asChild variant="ghost" className="w-fit -ml-4 gap-2 text-muted-foreground hover:text-primary">
                <Link href="/partnerships">
                  <ArrowLeft className="h-4 w-4" /> Back to Partnerships
                </Link>
              </Button>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
                  <Sparkles className="h-4 w-4" /> Sponsored Programs
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Research Fellowships</h1>
                <p className="text-muted-foreground text-lg max-w-3xl">
                  Explore fully-funded and sponsored fellowship programs offered by CPRA in collaboration with our strategic academic and regional partners.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fellowships.map((f) => (
                <Card key={f.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-white">
                  <CardHeader className="space-y-4">
                    <Badge className="w-fit bg-primary/10 text-primary border-none">{f.type}</Badge>
                    <CardTitle className="text-xl font-headline font-bold text-primary leading-tight">
                      {f.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-accent font-bold uppercase">
                      <Landmark className="h-3 w-3" /> {f.partner}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Focus Area</p>
                      <p className="text-sm font-medium text-primary">{f.focus}</p>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {f.description}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t text-[10px] font-bold text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {f.duration}</span>
                      <span className="flex items-center gap-1"><UserCheck className="h-3 w-3" /> Open for Q4 2023</span>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                      <a href={FB_LINK} target="_blank" rel="noopener noreferrer">
                        Apply for Fellowship
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA Section - Fixed visibility */}
            <div className="p-10 bg-primary text-white rounded-[2rem] text-center space-y-8 shadow-xl">
              <div className="space-y-3">
                <h3 className="text-3xl font-headline font-bold">No Program Matches Your Research?</h3>
                <p className="opacity-80 max-w-xl mx-auto text-lg font-light leading-relaxed">
                  We are always looking for innovative research proposals that align with our core themes. You can submit an independent research fellowship proposal directly to our team.
                </p>
              </div>
              <div className="flex justify-center pt-2">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white px-10 py-6 text-sm font-bold uppercase tracking-widest shadow-lg transition-all hover:scale-105"
                >
                  <a href={`mailto:${CPRA_EMAIL}?subject=Research Fellowship Proposal`}>
                    <Mail className="h-4 w-4 mr-2" /> Submit Proposal
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
