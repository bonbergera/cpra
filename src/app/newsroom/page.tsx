
"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Search, Filter, Newspaper, Calendar, ArrowRight, Facebook, ExternalLink } from "lucide-react";
import Image from "next/image";

const newsItems = [
  {
    id: 1,
    title: "CPRA CONDEMNS ALLEGED UPND CADRE VIOLENCE ON JOURNALIST",
    date: "October 12, 2023",
    category: "Media Freedoms",
    excerpt: "The Centre for Peace Research and Advocacy (CPRA) has condemned alleged violence by UPND cadres during a recent community engagement...",
    fullStory: `The Centre for Peace Research and Advocacy (CPRA) has condemned alleged violence by UPND cadres during a recent community engagement, in which a Power FM journalist, Mr. Alfonso, was reportedly assaulted while on duty.

Executive Director Cliffton Mayaba Chifuwe described the attack as unjustifiable and a threat to press freedom and democratic values, noting that it contradicts assurances by President Hakainde Hichilema on media protection.

He warned that the re-emergence of cadre violence ahead of the August 13 elections could escalate if not addressed, and called on the UPND to cooperate with police in identifying and prosecuting those responsible. He also raised concern over reports that some suspects were armed with tasers.

Mr. Chifuwe further cautioned that such incidents could undermine public confidence in the electoral process and urged political players to promote tolerance, respect the rule of law, and safeguard media freedoms.

By Zambia Today Staff Reporter
Mafken FM`,
    image: "https://picsum.photos/seed/news1/800/400",
    socialMediaLink: "https://www.facebook.com/zambiatodayz/posts/cpra-condemns-alleged-upnd-cadre-violence-on-journalistthe-centre-for-peace-rese/1441667144640741/"
  },
  {
    id: 2,
    title: "Centre Urges Ministry of Justice to Expedite Draft Public Gatherings Bill",
    date: "September 28, 2023",
    category: "Legal Reform",
    excerpt: "The Centre for Peace, Research and Advocacy has urged the Ministry of Justice to fast-track the review of the draft Public Gatherings Bill...",
    fullStory: "The Centre for Peace, Research and Advocacy has urged the Ministry of Justice to fast-track the review of the draft Public Gatherings Bill so it can be presented when the Fifth Session of the Thirteenth National Assembly resumes on Tuesday, February 3, 2026.",
    image: "https://picsum.photos/seed/news2/800/400",
    socialMediaLink: "https://www.facebook.com/HotFmZambia/posts/the-centre-for-peace-research-and-advocacy-has-urged-the-ministry-of-justice-to-/1330322699137825/"
  },
  {
    id: 3,
    title: "Strategic Academic Partnership with University of Zambia Formalized",
    date: "September 15, 2023",
    category: "Partnerships",
    excerpt: "We are pleased to announce that, following our weekly partnership negotiations, we have successfully signed an MOU with CPRA...",
    fullStory: `We are pleased to announce that, following our weekly partnership negotiations, we have successfully signed a Memorandum of Understanding (MOU) with the Centre for Peace Research and Advocacy-CPRA.

This MOU marks a significant milestone in our joint efforts to advance research and initiatives in policy, peace studies, restorative justice, peacebuilding, wellbeing, and student mentorship.

We are excited about this collaboration and the positive impact it will have on our shared goals. This partnership underscores our commitment to addressing critical issues through rigorous research and dedicated advocacy. We look forward to the positive outcomes this partnership will bring.`,
    image: "https://picsum.photos/seed/news3/800/400",
    socialMediaLink: "https://www.facebook.com/100070134764200/posts/we-are-pleased-to-announce-that-following-our-weekly-partnership-negotiations-we/743484734666012/"
  }
];

export default function NewsroomPage() {
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F6F8F9] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm">
                  <Newspaper className="h-4 w-4" />
                  Public Advocacy
                </div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Newsroom</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  High-profile statements, legal updates, and strategic reports on Zambian governance and regional security.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search statements..." 
                    className="pl-10 pr-4 py-2 bg-white border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
              </div>
            </div>

            {/* Featured Post */}
            <div className="mb-16">
              <Card className="overflow-hidden border-none shadow-xl flex flex-col lg:flex-row cursor-pointer group" onClick={() => setSelectedNews(newsItems[0])}>
                <div className="relative lg:w-1/2 aspect-video lg:aspect-auto">
                  <Image 
                    src={newsItems[0].image} 
                    alt="Featured Statement" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-accent text-white hover:bg-accent">{newsItems[0].category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {newsItems[0].date}
                    </span>
                  </div>
                  <h2 className="text-3xl font-headline font-bold text-primary leading-tight group-hover:text-accent transition-colors">
                    {newsItems[0].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {newsItems[0].excerpt}
                  </p>
                  <Button className="w-fit bg-primary gap-2">
                    Read Full Statement <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.slice(1).map((news) => (
                <Card key={news.id} className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow flex flex-col cursor-pointer" onClick={() => setSelectedNews(news)}>
                  <div className="relative aspect-video">
                    <Image 
                      src={news.image} 
                      alt={news.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                    <CardTitle className="font-headline text-xl leading-tight text-primary group-hover:text-accent transition-colors">
                      {news.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {news.excerpt}
                    </p>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="text-accent p-0 font-bold hover:underline">
                      Read Statement <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center">
              <Button variant="outline" className="px-12 border-muted-foreground/30 text-primary font-semibold">
                Load More Advocacy
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent">{selectedNews.category}</Badge>
                  <span className="text-xs text-muted-foreground">{selectedNews.date}</span>
                </div>
                <DialogTitle className="text-2xl font-headline text-primary">{selectedNews.title}</DialogTitle>
                <DialogDescription className="sr-only">Full story details for {selectedNews.title}</DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-6">
                <Image src={selectedNews.image} alt={selectedNews.title} fill className="object-cover" />
              </div>
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {selectedNews.fullStory}
                </div>
              </div>
              <DialogFooter className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  Follow CPRA advocacy on social media
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="gap-2 border-primary/20">
                    <a href={selectedNews.socialMediaLink} target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-4 w-4 text-blue-600" /> View on Facebook
                    </a>
                  </Button>
                  <Button asChild className="gap-2 bg-primary">
                    <a href={selectedNews.socialMediaLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" /> Full Story
                    </a>
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
}
