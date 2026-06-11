
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Handshake, Landmark, FileCheck, ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const partners = [
  { name: "University of Zambia", type: "Academic MOU", focus: "Restorative Justice" },
  { name: "SADC Peacebuilding Center", type: "Regional Partner", focus: "Conflict Mapping" },
  { name: "Ministry of Justice", type: "Government Agency", focus: "Legal Reform" },
  { name: "UNHCR Zambia", type: "Humanitarian Partner", focus: "Refugee Support" }
];

export default function PartnershipsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
                  <Handshake className="h-4 w-4" /> Collaborative Impact
                </div>
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary leading-tight">
                  Academic & Strategic Partnerships
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  CPRA signs strategic Memorandums of Understanding (MOUs) to enhance collaborative research 
                  and foster sustainable peace through regional cooperation.
                </p>
                <div className="flex gap-4">
                  <Button asChild className="bg-primary px-8">
                    <Link href="/support">Become a Partner</Link>
                  </Button>
                  <Button variant="outline" className="px-8">View Active MOUs</Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/partnership/800/450" 
                  alt="Partnership Signing" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mentorship Section */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <GraduationCap className="h-64 w-64" />
              </div>
              <div className="relative z-10 max-w-3xl space-y-8">
                <h2 className="text-3xl md:text-5xl font-headline font-bold">Mentorship Portal</h2>
                <p className="text-primary-foreground/80 text-xl font-light">
                  Empowering the next generation of peacebuilders. We connect students with mentorship opportunities 
                  in restorative justice, peacebuilding research, and democratic monitoring.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Research Fellowships</CardTitle>
                      <CardDescription className="text-white/60">3-6 month guided programs for postgraduate students.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="link" className="text-accent p-0 hover:underline">Apply Now <ArrowRight className="h-4 w-4 ml-1" /></Button>
                    </CardFooter>
                  </Card>
                  <Card className="bg-white/10 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Peacebuilding Internship</CardTitle>
                      <CardDescription className="text-white/60">Practical field experience in localized conflict mediation.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="link" className="text-accent p-0 hover:underline">View Roles <ArrowRight className="h-4 w-4 ml-1" /></Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>

            {/* Partners List */}
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-headline font-bold text-primary">Strategic Partners</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {partners.map((partner, idx) => (
                  <div key={idx} className="p-8 bg-white rounded-xl shadow-sm border hover:border-accent transition-all group">
                    <Landmark className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-headline font-bold text-primary">{partner.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-accent font-bold mt-2">{partner.type}</p>
                    <p className="text-xs text-muted-foreground mt-4">{partner.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="max-w-4xl mx-auto bg-accent text-white p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-4">
                <h3 className="text-3xl font-headline font-bold">Collaborate with us</h3>
                <p className="opacity-90">Interested in formalizing an MOU or supporting our mentorship initiatives?</p>
              </div>
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 px-10 gap-2">
                <Link href="/support">
                  <Mail className="h-5 w-5" /> Send Proposal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
