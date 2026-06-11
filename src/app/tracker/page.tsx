
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button, buttonVariants } from "@/components/ui/button";
import { Scale, Clock, CheckCircle2, AlertCircle, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const bills = [
  {
    id: "bill-1",
    name: "Draft Public Gatherings Bill",
    status: "In Review",
    lastUpdate: "Oct 2, 2023",
    description: "Proposed amendments to secure a level playing field for political assemblies and freedom of expression.",
    milestones: [
      { label: "Cabinet Approval", completed: true },
      { label: "Ministry of Justice Review", completed: true },
      { label: "Public Consultation", completed: false },
      { label: "Parliamentary Presentation", completed: false }
    ]
  },
  {
    id: "bill-2",
    name: "Access to Information (ATI) Act",
    status: "Implemented",
    lastUpdate: "Sep 15, 2023",
    description: "Enabling transparency and public access to government documents for enhanced accountability.",
    milestones: [
      { label: "Drafting", completed: true },
      { label: "Parliamentary Reading", completed: true },
      { label: "Presidential Assent", completed: true }
    ]
  },
  {
    id: "bill-3",
    name: "Restorative Justice Reform Bill",
    status: "Research Phase",
    lastUpdate: "Aug 30, 2023",
    description: "Focusing on community-based mediation and reconciliation in juvenile criminal cases.",
    milestones: [
      { label: "Stakeholder Mapping", completed: true },
      { label: "Policy Whitepaper", completed: false },
      { label: "Legislative Drafting", completed: false }
    ]
  }
];

export default function TrackerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/10">
                <Scale className="h-4 w-4" /> Legislative Watch
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Reform Tracker</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Monitoring the progress of critical bills and legal reforms essential for democracy and human rights in Zambia.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {bills.map((bill) => {
                // Calculate progress based on milestones
                const totalMilestones = bill.milestones.length;
                const completedMilestones = bill.milestones.filter(m => m.completed).length;
                const progressPercentage = totalMilestones > 0 
                  ? Math.round((completedMilestones / totalMilestones) * 100) 
                  : 0;

                return (
                  <Card key={bill.id} className="border-none shadow-lg overflow-hidden bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      <div className="lg:col-span-2 p-8 lg:p-10 space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                          <Badge 
                            className={cn(
                              "px-3 py-1 text-[10px] uppercase font-bold tracking-wider",
                              bill.status === "Implemented" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                              bill.status === "In Review" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                              "bg-orange-100 text-orange-700 hover:bg-orange-100"
                            )}
                          >
                            {bill.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Last updated: {bill.lastUpdate}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-2xl font-headline font-bold text-primary">{bill.name}</h3>
                          <p className="text-muted-foreground leading-relaxed">{bill.description}</p>
                        </div>

                        <div className="space-y-4 pt-4">
                          <div className="flex justify-between items-center text-sm font-bold">
                            <span className="text-primary">Legislation Progress</span>
                            <span className="text-accent">{progressPercentage}%</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2 bg-muted rounded-full overflow-hidden" />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                          <Button asChild variant="outline" size="sm" className="gap-2 border-muted-foreground/20 text-xs uppercase font-bold tracking-widest">
                            <a href={`/documents/${bill.id}-brief.pdf`} target="_blank" rel="noopener noreferrer">
                              <FileText className="h-4 w-4" /> View Brief
                            </a>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="gap-2 border-muted-foreground/20 text-xs uppercase font-bold tracking-widest">
                            <a href="https://www.facebook.com/p/Centre-for-Peace-Research-and-Advocacy-CPRA-100087220065870/" target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" /> Official Gazette
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-8 lg:p-10 border-l border-muted">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Milestones</h4>
                        <ul className="space-y-4">
                          {bill.milestones.map((ms, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              {ms.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0" />
                              )}
                              <span className={cn(
                                "text-sm",
                                ms.completed ? "text-primary font-medium" : "text-muted-foreground"
                              )}>
                                {ms.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm border border-muted text-center max-w-2xl mx-auto">
              <h4 className="font-headline font-bold text-lg text-primary mb-2">Want to contribute to our legal research?</h4>
              <p className="text-sm text-muted-foreground mb-6">We welcome legal experts and students to help us draft evidence-based advocacy briefs for upcoming legislation.</p>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=cpra4peace@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default" }), "bg-accent hover:bg-accent/90 px-8 font-bold uppercase text-xs tracking-widest h-10 inline-flex items-center")}
              >
                Connect with our Legal Team
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
