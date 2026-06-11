
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Scale, TreePine, Users, ChevronRight, FileText } from "lucide-react";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-peace");
  const execImg = PlaceHolderImages.find(img => img.id === "cliffton-chifuwe");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImg?.imageUrl || ""}
              alt="Peace in Southern Africa"
              fill
              className="object-cover brightness-[0.4]"
              priority
              data-ai-hint="peace landscape"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl space-y-8 animate-fade-in">
              <div className="inline-block bg-accent/20 border border-accent/30 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                Independent NGO • Zambia
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-white leading-[1.1]">
                Fostering Sustainable <span className="text-accent italic">Peace</span> Across Southern Africa
              </h1>
              <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl">
                The Centre for Peace Research and Advocacy (CPRA) is dedicated to promoting democracy, 
                human rights, and social justice through evidence-based research and localized conflict resolution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-8">
                  <Link href="/research">Launch Research Tool</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-8">
                  <Link href="/themes">Explore Core Themes</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We envision a vibrant Southern Africa anchored on peaceful and inclusive societies, 
                  where every individual can thrive in an environment free from violence and inequality.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/5 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Strategic Advocacy</h4>
                      <p className="text-sm text-muted-foreground">Driving evidence-based policy changes at local and regional levels.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/5 p-3 rounded-lg">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Democratic Integrity</h4>
                      <p className="text-sm text-muted-foreground">Monitoring governance and advocating for legislative reforms.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={PlaceHolderImages.find(img => img.id === "peacebuilding")?.imageUrl || ""}
                  alt="Community Dialogue"
                  fill
                  className="object-cover"
                  data-ai-hint="community dialogue"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Thematic Pillars */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Strategic Pillars</h2>
              <p className="text-primary-foreground/70">Our work operates at the critical intersection of governance, human rights, and environmental stability.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Peacebuilding", icon: Globe, desc: "Conflict mapping and local community mediation training." },
                { title: "Governance", icon: Scale, desc: "Monitoring electoral integrity and legislative reforms." },
                { title: "Climate Justice", icon: TreePine, desc: "Assessing how environmental fragility impacts conflict." },
                { title: "Vulnerable Groups", icon: Users, desc: "Supporting refugees and protecting children in conflict." }
              ].map((item, idx) => (
                <Card key={idx} className="bg-primary-foreground/5 border-primary-foreground/10 hover:border-accent/50 transition-all duration-300 group">
                  <CardHeader>
                    <item.icon className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-white text-xl font-headline">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-primary-foreground/60 leading-relaxed">{item.desc}</p>
                    <Link href={`/themes?tab=${item.title.toLowerCase().replace(' ', '-')}`} className="inline-flex items-center text-accent mt-6 text-sm font-semibold hover:underline">
                      Learn More <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Director Section */}
        <section className="py-24 bg-white border-y">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
              <div className="shrink-0 relative w-48 h-48 rounded-full overflow-hidden border-4 border-accent shadow-xl">
                <Image
                  src={execImg?.imageUrl || ""}
                  alt="Cliffton Mayaba Chifuwe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left space-y-4">
                <blockquote className="text-2xl font-headline italic text-primary leading-snug">
                  "At CPRA, we believe that peace is not merely the absence of conflict, but the presence of social justice, democratic accountability, and human dignity."
                </blockquote>
                <div>
                  <h4 className="text-lg font-bold text-primary">Cliffton Mayaba Chifuwe</h4>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest font-semibold">Executive Director, CPRA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsroom Preview */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold text-primary">Latest Advocacy</h2>
                <p className="text-muted-foreground">Recent public statements and policy updates.</p>
              </div>
              <Button asChild variant="ghost" className="text-accent hover:text-accent/80 font-bold">
                <Link href="/newsroom">View All News <ChevronRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  category: "Media Freedoms",
                  title: "Condemning Political Cadre Violence Against Journalists",
                  date: "Oct 12, 2023",
                  desc: "CPRA demands immediate police action to safeguard democratic values and press freedom."
                },
                { 
                  category: "Legislative Reform",
                  title: "Urgent Call for Review of the Public Gatherings Bill",
                  date: "Sep 28, 2023",
                  desc: "The Ministry of Justice must expedite reviews to ensure a level playing field for all citizens."
                },
                { 
                  category: "Partnerships",
                  title: "Strategic MOU Signed with Regional Academic Institutions",
                  date: "Sep 15, 2023",
                  desc: "Enhancing collaborative research in restorative justice and student mentorship."
                }
              ].map((news, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="mb-4 overflow-hidden rounded-lg aspect-video relative">
                    <Image 
                      src={`https://picsum.photos/seed/news${idx}/800/450`} 
                      alt="News thumbnail" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">{news.category}</span>
                  <h3 className="text-xl font-headline font-semibold mt-2 group-hover:text-primary transition-colors leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{news.desc}</p>
                  <p className="text-xs text-muted-foreground/60 mt-4">{news.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Ready to Drive Change?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">Join us in our mission to build a more inclusive and peaceful Southern Africa.</p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <Link href="/partnerships">Become a Partner</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
