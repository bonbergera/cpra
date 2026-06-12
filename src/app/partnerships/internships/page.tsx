
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Search, ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import siteContent from "@/lib/site-content.json";

export default function InternshipsPage() {
  const roles = siteContent.internships;
  const FB_LINK = "https://www.facebook.com/p/Centre-for-Peace-Research-and-Advocacy-CPRA-100087220065870/";

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
                  <Search className="h-4 w-4" /> Opportunity Hub
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Peacebuilding Internships</h1>
                <p className="text-muted-foreground text-lg max-w-3xl">
                  Join CPRA and our partners on the frontlines of social justice. Gain practical field experience and mentorship in regional peacebuilding.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {roles.map((role: any) => (
                <Card key={role.id} className="border-none shadow-md overflow-hidden bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="md:col-span-3 p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5">{role.stipend}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {role.location}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {role.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl font-headline font-bold text-primary mb-2">{role.title}</h3>
                      <p className="text-sm text-accent font-bold mb-6">Partner: {role.partner}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {role.tasks.map((task: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium bg-slate-50 p-2 rounded-lg">
                            <ShieldCheck className="h-3 w-3 text-green-600" /> {task}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-primary/5 p-6 md:p-4 lg:p-8 flex items-center justify-center border-l border-muted">
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 uppercase tracking-tight text-[10px] sm:text-xs px-2 sm:px-4">
                        <a href={FB_LINK} target="_blank" rel="noopener noreferrer">
                          Express Interest
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="p-10 border-2 border-dashed border-muted rounded-[2rem] text-center space-y-6">
              <h4 className="text-xl font-headline font-bold text-primary">Student Credit Programs</h4>
              <p className="text-muted-foreground max-w-2xl mx-auto italic">
                "Our internship programs are specifically designed to align with University credit requirements, focusing on student wellbeing and practical mentorship."
              </p>
              <div className="flex justify-center gap-4">
                 <Link href="/partnerships/mous" className="text-sm font-bold text-accent hover:underline">Academic MOU Directory</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
