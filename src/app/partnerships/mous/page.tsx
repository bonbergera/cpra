
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, ArrowLeft, Landmark, Users, Scale, Globe } from "lucide-react";
import Link from "next/link";

const mouList = [
  {
    id: "mou-unza",
    partner: "University of Zambia",
    type: "Academic Collaboration",
    date: "September 15, 2023",
    focus: "Restorative Justice & Student Mentorship",
    description: "A strategic milestone focused on advancing research in policy, peace studies, and student mentorship initiatives.",
    icon: Landmark,
  },
  {
    id: "mou-sadc",
    partner: "SADC Peacebuilding Center",
    type: "Regional Strategic Partner",
    date: "July 2023",
    focus: "Conflict Mapping & Early Warning Systems",
    description: "Collaborative framework for regional fragility assessments and localized conflict resolution across Southern Africa.",
    icon: Globe,
  },
  {
    id: "mou-moj",
    partner: "Ministry of Justice",
    type: "Government Liaison",
    date: "October 2023",
    focus: "Legislative Reform & Human Rights",
    description: "Joint initiative to expedite the review of the Public Gatherings Bill and promote democratic accountability.",
    icon: Scale,
  },
  {
    id: "mou-unhcr",
    partner: "UNHCR Zambia",
    type: "Humanitarian Network",
    date: "June 2023",
    focus: "Protection of Vulnerable Groups",
    description: "Focus on child protection in conflict zones and integrated support for refugee communities in the region.",
    icon: Users,
  }
];

export default function MOUsPage() {
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
              {mouList.map((mou) => (
                <Card key={mou.id} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/5 rounded-lg">
                          <mou.icon className="h-6 w-6 text-accent" />
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
                      <Button variant="link" className="text-accent gap-2 p-0 font-bold">
                        <FileText className="h-4 w-4" /> View Agreement Brief
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="p-8 bg-primary text-primary-foreground rounded-2xl text-center space-y-6">
              <h3 className="text-2xl font-headline font-bold">Interested in establishing an MOU?</h3>
              <p className="opacity-80 max-w-xl mx-auto">
                We welcome collaborations with academic institutions, international NGOs, and government agencies 
                committed to sustainable peace and development.
              </p>
              <Button asChild className="bg-accent hover:bg-accent/90 text-white px-10">
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
